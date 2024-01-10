import { styled } from "@mui/material/styles";
import {
  Action,
  BorderNode,
  IJsonModel,
  ITabSetRenderValues,
  Layout,
  Model,
  TabSetNode,
} from "flexlayout-react";
import { createRef, useEffect, useRef, useState } from "react";
import {
  getLastSavedHomeLayout,
  homeLayoutKey,
  saveHomeLayout,
} from "../../api/Layouts";
import AppLayout, {
  AddNodeAction,
  DeleteTabAction,
  LayoutAction,
  MoveNodeAction,
  SelectTabAction,
} from "../../components/AppLayout";
import usePopout from "../../components/popout/hooks/UsePopout";
import { NAVIGATION_BAR_HEIGHT } from "../../navigation/Constants";
import { setCurrentModel } from "../../state/LayoutSlice";
import { clearPopOutProperties } from "../../state/PopupSlice";
import { useAppDispatch, useAppSelector } from "../../state/Store";
import { onSelectTab } from "../../state/TabManagementSlice";
import homeLayoutModel from "./HomeLayoutModel";

const LayoutContainer = styled("div")`
  position: relative;
  height: calc(100vh - ${NAVIGATION_BAR_HEIGHT}px);
`;

function Home() {
  const layoutRef = createRef<Layout>();
  const [layoutModel, setLayoutModel] = useState<Model>(
    Model.fromJson(homeLayoutModel)
  );
  const layoutAction = useRef<LayoutAction>();
  const { currentModel, lastReset } = useAppSelector((state) => state.layout);
  const { handleRenderTabSet: parentHandleRenderTabSet } = usePopout();
  const dispatch = useAppDispatch();

  // update model in component when the layout model change in the global state
  useEffect(() => {
    if (currentModel === undefined) return;
    const json = JSON.parse(currentModel) as IJsonModel;
    const model = Model.fromJson(json);
    setLayoutModel(model);
  }, [currentModel]);

  // load last saved layout on page load
  useEffect(() => {
    getLastSavedHomeLayout().then(async (model) => {
      if (model) {
        setLayoutModel(model);

        dispatch(
          onSelectTab({
            tabId: model.getActiveTabset()?.getSelectedNode()?.getId(),
          })
        );
      }
    });
  }, []);

  // actions to run when the layout is reset
  useEffect(() => {
    if (lastReset?.layoutKey !== homeLayoutKey) return;

    // reopen price sheets that were already open before the layout was reset
    const baseModel = Model.fromJson(homeLayoutModel);

    setLayoutModel(baseModel);
    saveHomeLayout(baseModel).then();
    dispatch(clearPopOutProperties());
  }, [lastReset]);

  function handleLayoutAction(action: Action) {
    layoutAction.current = action.type as LayoutAction;
    return action;
  }

  function handleRenderTabSet(
    node: TabSetNode | BorderNode,
    renderValues: ITabSetRenderValues
  ) {
    parentHandleRenderTabSet(node, renderValues);
  }

  async function handleModelChange(model: Model) {
    if (layoutAction.current === SelectTabAction) {
      await saveHomeLayout(model);
    }

    if (
      layoutAction.current === MoveNodeAction ||
      layoutAction.current === DeleteTabAction ||
      layoutAction.current === AddNodeAction ||
      layoutAction.current === SelectTabAction
    ) {
      dispatch(setCurrentModel(model.toString()));
    }
  }

  return (
    <>
      <LayoutContainer>
        <AppLayout
          ref={layoutRef}
          model={layoutModel}
          onRenderTabSet={handleRenderTabSet}
          onAction={handleLayoutAction}
          onModelChange={handleModelChange}
        />
      </LayoutContainer>
    </>
  );
}

export default Home;
