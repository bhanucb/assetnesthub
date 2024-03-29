import { FC } from "react";
import { RightDrawerItem } from "./RightDrawerItem";
import Button from "@mui/material/Button";
import RestoreIcon from "@mui/icons-material/Restore";
import SaveIcon from "@mui/icons-material/Save";
import InstallDesktopIcon from "@mui/icons-material/InstallDesktop";
import {
  getLastSavedHomeLayout,
  homeLayoutKey,
  saveDesktopLayout,
  saveMobileLayout,
} from "../../api/Layouts";
import { useAppDispatch, useAppSelector } from "../../state/Store";
import { resetLayout, setCurrentModel } from "../../state/LayoutSlice";
import Stack from "@mui/material/Stack";
import { updatePopOutProperties } from "../../state/PopupSlice";
import { PopoutProperties } from "../../pages/popout/Popout";
import usePopout from "../../components/popout/hooks/UsePopout";
import { Model } from "flexlayout-react";
import { onSelectTab } from "../../state/TabManagementSlice";
import { LayoutComponentKeys } from "../../Constants";
import homeLayoutModel from "../../pages/home/layoutModels/HomeLayoutModel";
import mobileHomeLayoutModel from "../../pages/home/layoutModels/MobileHomeLayoutModel";
import useResponsiveBreakpoints from "../../hooks/UseResponsiveBreakpoints";

interface LayoutResetProps {
  toggleDrawer: () => void;
}

const confirmMessage = "Are you sure you want to reset the layout?";

const LayoutSection: FC<LayoutResetProps> = (props) => {
  const dispatch = useAppDispatch();
  const { isMobile } = useResponsiveBreakpoints();
  const { popOuts, popoutProperties } = useAppSelector(
    (state) => state.popouts
  );
  const { currentModel } = useAppSelector((state) => state.layout);
  const { openPopup, unmountComponents } = usePopout();
  const { toggleDrawer } = props;

  function handleResetLayout() {
    if (confirm(confirmMessage)) {
      dispatch(resetLayout(homeLayoutKey));
      toggleDrawer();
    }
  }

  async function handleSaveLayout() {
    const properties: PopoutProperties[] = [];
    for (const popout of popOuts) {
      const ref = window.open("", popout.tabId);
      if (ref === null) continue;

      const screenX = ref.screenX;
      const screenY = ref.screenY;
      const innerHeight = ref.innerHeight;
      const innerWidth = ref.innerWidth;

      properties.push({
        tabId: popout.tabId,
        screenX,
        screenY,
        innerHeight,
        innerWidth,
      });
    }
    dispatch(updatePopOutProperties(properties));

    if (currentModel.mobile !== undefined) {
      await saveMobileLayout(currentModel.mobile);
    }

    if (currentModel.desktop !== undefined) {
      await saveDesktopLayout(currentModel.desktop);
    }

    toggleDrawer();
  }

  async function loadLayout() {
    const storedModel = await getLastSavedHomeLayout();

    if (storedModel.mobile === null) {
      storedModel.mobile = Model.fromJson(mobileHomeLayoutModel);
    }
    if (storedModel.desktop === null) {
      storedModel.desktop = Model.fromJson(homeLayoutModel);
    }

    const model = isMobile ? storedModel.mobile : storedModel.desktop;

    unmountComponents(model);
    dispatch(setCurrentModel({ model: model.toString(), isMobile }));
    dispatch(
      onSelectTab({
        tabId: model.getActiveTabset()?.getSelectedNode()?.getId(),
      })
    );

    for (const props of popoutProperties) {
      const { tabId } = props;
      let component: LayoutComponentKeys;

      if (tabId in LayoutComponentKeys) {
        component = tabId as LayoutComponentKeys;
      } else {
        const node = model.getNodeById(tabId);
        if (node === undefined) return;

        const json = node.toJson() as { component: string };
        component = json.component as LayoutComponentKeys;
        if (component === undefined) {
          component = LayoutComponentKeys.error;
        }
      }

      await openPopup(tabId, component);
    }
    toggleDrawer();
  }

  return (
    <RightDrawerItem title={"Layout"}>
      <Stack spacing={2} direction="row" justifyContent="space-between">
        <Button
          fullWidth
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={handleSaveLayout}
        >
          Save
        </Button>
        <Button
          fullWidth
          variant="contained"
          startIcon={<InstallDesktopIcon />}
          onClick={loadLayout}
        >
          Load
        </Button>
        <Button
          fullWidth
          variant="contained"
          color="error"
          startIcon={<RestoreIcon />}
          onClick={handleResetLayout}
        >
          Reset
        </Button>
      </Stack>
    </RightDrawerItem>
  );
};

export default LayoutSection;
