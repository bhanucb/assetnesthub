import { LayoutComponentKeys } from "../../../Constants";
import { IJsonModel } from "flexlayout-react";

const model: IJsonModel = {
  global: {},
  borders: [],
  layout: {
    type: "row",
    id: "1",
    children: [
      {
        type: "row",
        id: "#12c3bae1-ba28-429d-8f0d-d56bd187de81",
        weight: 50,
        children: [
          {
            type: "tabset",
            id: "2",
            children: [
              {
                type: "tab",
                id: LayoutComponentKeys.summary,
                name: "Summary",
                component: LayoutComponentKeys.summary,
              },
            ],
            active: true,
          },
          {
            type: "tabset",
            id: "#a84fa9a8-bd18-4619-bb5b-14cfae8d111b",
            children: [
              {
                type: "tab",
                id: LayoutComponentKeys.invAmountByPropType,
                name: "Investment Amount by Property Type",
                component: LayoutComponentKeys.invAmountByPropType,
              },
            ],
          },
          {
            type: "tabset",
            id: "#0fe1e523-458b-4e91-8077-a2b09e3e0195",
            children: [
              {
                type: "tab",
                id: LayoutComponentKeys.propTypeBreakdown,
                name: "Property Type Breakdown",
                component: LayoutComponentKeys.propTypeBreakdown,
              },
            ],
          },
          {
            type: "tabset",
            id: "#4efe82a5-47f8-43f0-9266-0556ab3c130f",
            children: [
              {
                type: "tab",
                id: LayoutComponentKeys.trendOfTotalAllocationAmount,
                name: 'Trend of "Total Allocated Amount"',
                component: LayoutComponentKeys.trendOfTotalAllocationAmount,
              },
            ],
          },
          {
            type: "tabset",
            id: "#ce6892cf-0b52-4d5a-a8f2-30a9c165d000",
            children: [
              {
                type: "tab",
                id: LayoutComponentKeys.declinedDealsBreakdown,
                name: "Declined Deals Breakdown",
                component: LayoutComponentKeys.declinedDealsBreakdown,
              },
            ],
          },
        ],
      },
    ],
  },
};

export default model;
