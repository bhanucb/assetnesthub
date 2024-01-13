import { ComponentProps, ForwardedRef, forwardRef, useMemo } from "react";
import { Layout } from "flexlayout-react";
import lightThemeCssRaw from "flexlayout-react/style/light.css?raw";
import darkThemeCssRaw from "flexlayout-react/style/dark.css?raw";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useAppSelector } from "../../state/Store";
import LayoutPopout from "../popout/LayoutPopout";
import { layoutFactory } from "./AppLayoutUtils";

export const MoveNodeAction = "FlexLayout_MoveNode";
export const SelectTabAction = "FlexLayout_SelectTab";
export const DeleteTabAction = "FlexLayout_DeleteTab";
export const AddNodeAction = "FlexLayout_AddNode";
export const MaximizeToggleAction = "FlexLayout_MaximizeToggle";

export type LayoutAction =
  | typeof MoveNodeAction
  | typeof SelectTabAction
  | typeof DeleteTabAction
  | typeof AddNodeAction
  | typeof MaximizeToggleAction;

type AppLayoutProps = Omit<ComponentProps<typeof Layout>, "factory">;

const AppLayout = forwardRef(
  (props: AppLayoutProps, layoutRef: ForwardedRef<Layout>) => {
    const { currentTheme } = useAppSelector((state) => state.theme);
    const lightThemeCss = useMemo(
      () => lightThemeCssRaw.replace(/\/\*#\ssourceMappingURL=.*/gm, ""),
      []
    );
    const darkThemeCss = useMemo(
      () => darkThemeCssRaw.replace(/\/\*#\ssourceMappingURL=.*/gm, ""),
      []
    );

    return (
      <HelmetProvider>
        <Helmet>
          <style>
            {currentTheme === "light" ? lightThemeCss : darkThemeCss}
          </style>
        </Helmet>
        <LayoutPopout layoutModel={props.model} />
        <Layout ref={layoutRef} {...props} factory={layoutFactory} />
      </HelmetProvider>
    );
  }
);

AppLayout.displayName = "AppLayout";

export default AppLayout;
