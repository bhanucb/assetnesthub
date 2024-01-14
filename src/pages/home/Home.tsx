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
  saveDesktopLayout,
  saveMobileLayout,
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
import mobileHomeLayout from "./layoutModels/MobileHomeLayoutModel";
import useResponsiveBreakpoints from "../../hooks/UseResponsiveBreakpoints";
import { NAVIGATION_BAR_HEIGHT } from "../../navigation/Constants";

function Home() {
  const layoutRef = createRef<Layout>();
  const { isMobile } = useResponsiveBreakpoints();
  const [layoutModel, setLayoutModel] = useState<Model>(
    Model.fromJson(homeLayoutModel)
  );
  const layoutAction = useRef<LayoutAction>();
  const { currentModel, lastReset } = useAppSelector((state) => state.layout);
  const { handleRenderTabSet: parentHandleRenderTabSet } = usePopout();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isMobile) {
      setLayoutModel(Model.fromJson(mobileHomeLayout));
    } else {
      setLayoutModel(Model.fromJson(homeLayoutModel));
    }
  }, [isMobile]);

  // update model in component when the layout model change in the global state
  useEffect(() => {
    if (isMobile) {
      if (currentModel.mobile === undefined) return;
      const json = JSON.parse(currentModel.mobile) as IJsonModel;
      const model = Model.fromJson(json);
      setLayoutModel(model);
    } else {
      if (currentModel.desktop === undefined) return;
      const json = JSON.parse(currentModel.desktop) as IJsonModel;
      const model = Model.fromJson(json);
      setLayoutModel(model);
    }
  }, [currentModel, isMobile]);

  // load last saved layout on page load
  useEffect(() => {
    getLastSavedHomeLayout()
      .then((model) => {
        const modelInUse = isMobile ? model.mobile : model.desktop;

        if (modelInUse) {
          setLayoutModel(modelInUse);

          dispatch(
            onSelectTab({
              tabId: modelInUse.getActiveTabset()?.getSelectedNode()?.getId(),
            })
          );
        }
      })
      .catch((e) => console.error(e));
  }, [dispatch, isMobile]);

  // actions to run when the layout is reset
  useEffect(() => {
    if (lastReset?.layoutKey !== homeLayoutKey) return;

    // reopen price sheets that were already open before the layout was reset
    const baseModel = isMobile
      ? Model.fromJson(mobileHomeLayout)
      : Model.fromJson(homeLayoutModel);

    setLayoutModel(baseModel);

    if (isMobile) {
      saveMobileLayout(baseModel)
        .then()
        .catch((e) => console.error(e));
    } else {
      saveDesktopLayout(baseModel)
        .then()
        .catch((e) => console.error(e));
    }

    dispatch(clearPopOutProperties());
  }, [dispatch, isMobile, lastReset]);

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
      isMobile ? await saveMobileLayout(model) : await saveDesktopLayout(model);
    }

    if (
      layoutAction.current === MoveNodeAction ||
      layoutAction.current === DeleteTabAction ||
      layoutAction.current === AddNodeAction ||
      layoutAction.current === SelectTabAction
    ) {
      dispatch(setCurrentModel({ model: model.toString(), isMobile }));
    }
  }

  return (
    <Box
      sx={{
        position: "relative",
        height: { xs: 2000, md: `calc(100vh - ${NAVIGATION_BAR_HEIGHT}px)` },
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
