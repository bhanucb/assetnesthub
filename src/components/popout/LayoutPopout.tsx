import { PropsWithChildren, useContext, useEffect } from "react";
import { Actions, Model } from "flexlayout-react";
import { useAppDispatch, useAppSelector } from "../../state/Store";
import usePopout from "./hooks/UsePopout";
import { PopoutContext } from "./context/PopoutContext";
import { dequeuePopOuts } from "../../state/PopupSlice";
import useMobile from "../../hooks/UseMobile";
import { saveDesktopLayout, saveMobileLayout } from "../../api/Layouts";

type LayoutPopoutProps = PropsWithChildren & { layoutModel: Model };

// layout specific common popout logic
const LayoutPopout = (props: LayoutPopoutProps) => {
  const { layoutModel, children } = props;
  const { windowRefs } = useContext(PopoutContext);
  const { lastPopout, popOuts } = useAppSelector((state) => state.popouts);
  const { unmountComponents } = usePopout();
  const { isMobile } = useMobile();
  const dispatch = useAppDispatch();

  // action to run when a pop out is docked in
  useEffect(() => {
    if (lastPopout === undefined) return;

    const { tabId, component, closedByUser } = lastPopout;

    if (layoutModel?.getNodeById(tabId)) {
      layoutModel.doAction(Actions.updateNodeAttributes(tabId, { component }));

      // if the user manually saves the layout while a window is popped out the layout will have that window unmounted
      // saving the layout on unmount will prevent the layout showing "unmount" on page load
      isMobile
        ? saveMobileLayout(layoutModel)
            .then()
            .catch((e) => console.error(e))
        : saveDesktopLayout(layoutModel)
            .then()
            .catch((e) => console.error(e));

      dispatch(dequeuePopOuts(lastPopout.tabId));
      if (closedByUser) {
        windowRefs.get(lastPopout.tabId)?.window.close();
      }
    }
  }, [dispatch, isMobile, lastPopout, layoutModel, windowRefs]);

  // action to run when a pop out is docked out
  useEffect(() => {
    if (layoutModel === undefined) return;

    unmountComponents(layoutModel);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [popOuts.length, layoutModel]);

  return <>{children}</>;
};

export default LayoutPopout;
