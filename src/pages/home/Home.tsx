import { createRef, useEffect, useRef, useState } from "react";
import {
  Action,
  BorderNode,
  IJsonModel,
  ITabSetRenderValues,
  Layout,
  Model,
  TabSetNode,
} from "flexlayout-react";
import {
  getLastSavedHomeLayout,
  homeLayoutKey,
  saveHomeLayout,
} from "../../api/Layouts";
import { useAppDispatch, useAppSelector } from "../../state/Store";
import { onSelectTab } from "../../state/TabManagementSlice";
import { clearPopOutProperties } from "../../state/PopupSlice";
import usePopout from "../../components/popout/hooks/UsePopout";
import { setCurrentModel } from "../../state/LayoutSlice";
import AppLayout, {
  AddNodeAction,
  DeleteTabAction,
  LayoutAction,
  MoveNodeAction,
  SelectTabAction,
} from "../../components/layout/AppLayout";
import Box from "@mui/material/Box";
import homeLayoutModel from "./layoutModels/HomeLayoutModel";

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
    getLastSavedHomeLayout()
      .then((model) => {
        if (model) {
          setLayoutModel(model);

          dispatch(
            onSelectTab({
              tabId: model.getActiveTabset()?.getSelectedNode()?.getId(),
            })
          );
        }
      })
      .catch((e) => console.error(e));
  }, [dispatch]);

  // actions to run when the layout is reset
  useEffect(() => {
    if (lastReset?.layoutKey !== homeLayoutKey) return;

    // reopen price sheets that were already open before the layout was reset
    const baseModel = Model.fromJson(homeLayoutModel);

    setLayoutModel(baseModel);
    saveHomeLayout(baseModel)
      .then()
      .catch((e) => console.error(e));
    dispatch(clearPopOutProperties());
  }, [dispatch, lastReset]);

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
    <Box
      sx={{
        position: "relative",
        // height: `calc(100vh - ${NAVIGATION_BAR_HEIGHT}px)`,
        height: 1500,
      }}
    >
      <AppLayout
        ref={layoutRef}
        model={layoutModel}
        onRenderTabSet={handleRenderTabSet}
        onAction={handleLayoutAction}
        onModelChange={handleModelChange}
      />
    </Box>
  );
}

export default Home;
