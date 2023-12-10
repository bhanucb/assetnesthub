import { createRef, useEffect, useRef, useState } from "react";
import { styled } from "@mui/material/styles";
import { Action, IJsonModel, Layout, Model } from "flexlayout-react";
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
import homeLayoutModel from "./HomeLayoutModel";
import { useAppDispatch, useAppSelector } from "../../state/Store";
import { onSelectTab } from "../../state/TabManagementSlice";
import { NAVIGATION_BAR_HEIGHT } from "../../navigation/Constants";
import { clearPopOutProperties } from "../../state/PopupSlice";
import { setCurrentModel } from "../../state/LayoutSlice";

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

    const baseModel = Model.fromJson(homeLayoutModel);
    setLayoutModel(baseModel);
    saveHomeLayout(baseModel).then();
    dispatch(clearPopOutProperties());
  }, [lastReset]);

  // useEffect(() => {
  //   if (lastOpenedTab === undefined) return;
  //
  //   const { tabName } = lastOpenedTab;
  //
  //   const tabManagerTabParent = layoutModel
  //     .getNodeById("tab-manager-tab")
  //     ?.getParent();
  //
  //   if (tabManagerTabParent === undefined) return;
  //
  //   const layoutNodeIds: Array<string> = [];
  //   getAllLayoutNodeIds(tabManagerTabParent, layoutNodeIds);
  //   const priceSheetTabs = layoutNodeIds.filter((node) =>
  //     node.includes(priceSheetIdPrefix)
  //   );
  //
  //   const addPriceSheetTabToTabSet = (tabSetId: string, tabName: string) => {
  //     layoutRef.current?.addTabToTabSet(tabSetId, getPriceSheetNode(tabName));
  //     layoutModel.doAction(Actions.deleteTab("tab-manager-tab"));
  //   };
  //
  //   if (priceSheetTabs.length === 0) {
  //     addPriceSheetTabToTabSet(tabManagerTabParent.getId(), tabName);
  //   } else {
  //     const lastPriceSheetTab = priceSheetTabs[priceSheetTabs.length - 1];
  //     const parentOfLastPriceSheetTab = layoutModel
  //       .getNodeById(lastPriceSheetTab)
  //       ?.getParent()
  //       ?.getId();
  //
  //     if (parentOfLastPriceSheetTab === undefined) return;
  //
  //     addPriceSheetTabToTabSet(parentOfLastPriceSheetTab, tabName);
  //   }
  // }, [lastOpenedTab]);

  function handleLayoutAction(action: Action) {
    layoutAction.current = action.type as LayoutAction;

    if (action.type === SelectTabAction) {
      const { tabNode = undefined } = action.data;
      if (tabNode !== undefined) {
        dispatch(onSelectTab({ tabId: tabNode }));
      }
    }

    return action;
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
    <LayoutContainer>
      <AppLayout
        ref={layoutRef}
        model={layoutModel}
        onAction={handleLayoutAction}
        onModelChange={handleModelChange}
      />
    </LayoutContainer>
  );
}

export default Home;
