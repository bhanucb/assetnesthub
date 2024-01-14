import { LayoutComponentKeys } from "../../Constants";
import { ReactElement } from "react";
import Summary from "../../pages/home/Summary";
import InvAmountByPropType from "../../pages/home/InvAmountByPropType";
import PropTypeBreakdown from "../../pages/home/PropTypeBreakdown";
import TrendOfTotalAllocatedAmount from "../../pages/home/TrendOfTotalAllocatedAmount";
import DeclinedDealsBreakdown from "../../pages/home/DeclinedDealsBreakdown";
import { TabNode } from "flexlayout-react";
import Unmount from "../popout/Unmount";

export function getLayoutComponent(key: LayoutComponentKeys): ReactElement {
  return layoutComponents.get(key) ?? <></>;
}

/* eslint-disable react/jsx-key */
export const layoutComponents = new Map<LayoutComponentKeys, ReactElement>([
  [LayoutComponentKeys.summary, <Summary />],
  [LayoutComponentKeys.invAmountByPropType, <InvAmountByPropType />],
  [LayoutComponentKeys.propTypeBreakdown, <PropTypeBreakdown />],
  [
    LayoutComponentKeys.trendOfTotalAllocationAmount,
    <TrendOfTotalAllocatedAmount />,
  ],
  [LayoutComponentKeys.declinedDealsBreakdown, <DeclinedDealsBreakdown />],
  [LayoutComponentKeys.error, <div>Error Loading Component</div>],
]);
/* eslint-enable react/jsx-key */

export const layoutFactory = (node: TabNode) => {
  const component = node.getComponent() as LayoutComponentKeys;
  if (component === undefined) return <></>;

  if (component === LayoutComponentKeys.unmount) {
    return <Unmount node={node} />;
  }

  return getLayoutComponent(component as LayoutComponentKeys);
};
