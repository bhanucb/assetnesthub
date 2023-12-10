import {
  ComponentProps,
  ForwardedRef,
  forwardRef,
  ReactElement,
  useMemo,
} from "react";
import { Layout, TabNode } from "flexlayout-react";
import lightThemeCssRaw from "flexlayout-react/style/light.css?raw";
import darkThemeCssRaw from "flexlayout-react/style/dark.css?raw";
import { Helmet, HelmetProvider } from "react-helmet-async";
import SummaryBox from "../pages/home/SummaryBox";
import WatchBox from "../pages/home/WatchBox";
import PricingLayout from "../pages/home/PricingLayout";
import Unmount from "./popout/Unmount";
import { useAppSelector } from "../state/Store";
import LayoutPopout from "./popout/LayoutPopout";

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

export enum LayoutComponentKeys {
  summaryBox = "summaryBox",
  watchBox = "watchBox",
  pricingLayout = "pricingLayout",
  unmount = "unmount",
  error = "error",
}

const layoutComponents: Map<LayoutComponentKeys, ReactElement> = new Map([
  [LayoutComponentKeys.summaryBox, <SummaryBox />],
  [LayoutComponentKeys.watchBox, <WatchBox />],
  [LayoutComponentKeys.pricingLayout, <PricingLayout />],
  [LayoutComponentKeys.error, <div>Error Loading Component</div>],
]);

export function getLayoutComponent(key: LayoutComponentKeys): ReactElement {
  return layoutComponents.get(key) ?? <></>;
}

const factory = (node: TabNode) => {
  const component = node.getComponent();
  if (component === undefined) return <></>;

  if (component === LayoutComponentKeys.unmount) {
    return <Unmount node={node} />;
  }

  return getLayoutComponent(component as LayoutComponentKeys);
};

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
        <Layout ref={layoutRef} {...props} factory={factory} />
      </HelmetProvider>
    );
  }
);

export default AppLayout;
