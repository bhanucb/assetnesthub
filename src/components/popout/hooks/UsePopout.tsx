import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { styled } from "@mui/material/styles";
import {
  Actions,
  BorderNode,
  ITabSetRenderValues,
  Model,
  TabSetNode,
} from "flexlayout-react";
import { useContext } from "react";
import { enqueuePopOuts } from "../../../state/PopupSlice";
import { useAppDispatch, useAppSelector } from "../../../state/Store";
import { PopoutContext } from "../context/PopoutContext";
import { LayoutComponentKeys } from "../../../Constants";

const ThemedOpenInNewIcon = styled(OpenInNewIcon)`
  color: #808080;
  font-size: 14px;
  cursor: pointer;
`;

export const UsePopout = () => {
  const { popoutProperties, popOuts } = useAppSelector(
    (state) => state.popouts
  );
  const { storeWindowRef } = useContext(PopoutContext);
  const dispatch = useAppDispatch();

  async function getPermissionAndScreenDetails() {
    if ("getScreenDetails" in window) {
      try {
        const permission = await navigator.permissions.query({
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          name: "window-placement",
        });
        if (permission.state !== "denied") {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return
          return window.getScreenDetails();
        } else {
          return null;
        }
      } catch {
        return null;
      }
    } else {
      return null;
    }
  }

  async function openPopup(tabId: string, component: LayoutComponentKeys) {
    dispatch(enqueuePopOuts({ tabId: tabId, component }));

    await getPermissionAndScreenDetails();

    let features = "popout";
    const storedPositionForTab = popoutProperties.find(
      (p) => p.tabId === tabId
    );

    if (storedPositionForTab !== undefined) {
      const { screenX, screenY, innerHeight, innerWidth } =
        storedPositionForTab;
      features = `popout,innerHeight=${innerHeight},innerWidth=${innerWidth},screenX=${screenX},screenY=${screenY}`;
    }

    const link = `/layout/${tabId}`;
    const windowRef = window.open(link, tabId, features);
    if (windowRef !== null) storeWindowRef(tabId, windowRef);
  }

  async function handleOpenPopup(tab: TabSetNode | BorderNode) {
    const selectedNode = tab.getSelectedNode();
    let component: LayoutComponentKeys;
    if (selectedNode === undefined) {
      component = LayoutComponentKeys.error;
    } else {
      const json = selectedNode.toJson() as { component: string };
      component = json.component as LayoutComponentKeys;
      if (component === undefined) {
        component = LayoutComponentKeys.error;
      }
    }

    const tabSetId = tab.getSelectedNode()?.getId() ?? "";
    await openPopup(tabSetId, component);
  }

  function unmountComponents(model: Model) {
    for (const { tabId } of popOuts) {
      if (model.getNodeById(tabId)) {
        model.doAction(
          Actions.updateNodeAttributes(tabId, { component: "unmount" })
        );
      }
    }
  }

  // add popout button
  function handleRenderTabSet(
    node: TabSetNode | BorderNode,
    renderValues: ITabSetRenderValues
  ) {
    renderValues.buttons.push(
      <ThemedOpenInNewIcon key="newtab" onClick={() => handleOpenPopup(node)} />
    );
  }

  return { handleRenderTabSet, openPopup, unmountComponents };
};

export default UsePopout;
