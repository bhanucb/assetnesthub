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
import Summary from "../pages/home/Summary";
import InvAmountByPropType from "../pages/home/InvAmountByPropType";
import PricingLayout from "../pages/home/PricingLayout";
import Unmount from "./popout/Unmount";
import { useAppSelector } from "../state/Store";
import LayoutPopout from "./popout/LayoutPopout";
import PropTypeBreakdown from "../pages/home/PropTypeBreakdown";
import TrendOfTotalAllocatedAmount from "../pages/home/TrendOfTotalAllocatedAmount";
import DeclinedDealsBreakdown from "../pages/home/DeclinedDealsBreakdown";

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
  summary = "summary",
  invAmountByPropType = "invAmountByPropType",
  propTypeBreakdown = "propTypeBreakdown",
  trendOfTotalAllocationAmount = "trendOfTotalAllocationAmount",
  declinedDealsBreakdown = "declinedDealsBreakdown",
  pricingLayout = "pricingLayout",
  unmount = "unmount",
  error = "error",
}

const layoutComponents: Map<LayoutComponentKeys, ReactElement> = new Map([
  [LayoutComponentKeys.summary, <Summary />],
  [LayoutComponentKeys.invAmountByPropType, <InvAmountByPropType />],
  [LayoutComponentKeys.propTypeBreakdown, <PropTypeBreakdown />],
  [
    LayoutComponentKeys.trendOfTotalAllocationAmount,
    <TrendOfTotalAllocatedAmount />,
  ],
  [LayoutComponentKeys.declinedDealsBreakdown, <DeclinedDealsBreakdown />],
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
