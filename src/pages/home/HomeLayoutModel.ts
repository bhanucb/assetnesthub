import { IJsonModel } from "flexlayout-react";
import { LayoutComponentKeys } from "../../components/AppLayout";

const model: IJsonModel = {
  global: {},
  layout: {
    type: "row",
    children: [
      {
        type: "row",
        children: [
          {
            type: "row",
            weight: 30,
            children: [
              {
                type: "tabset",
                enableMaximize: true,
                children: [
                  {
                    id: "summaryBox",
                    type: "tab",
                    name: "Summary",
                    component: LayoutComponentKeys.summaryBox,
                    enableClose: false,
                  },
                ],
              },
              {
                type: "tabset",
                enableMaximize: true,
                children: [
                  {
                    id: "watchBox",
                    type: "tab",
                    name: "Watch",
                    component: LayoutComponentKeys.watchBox,
                    enableClose: false,
                  },
                ],
              },
            ],
          },
          {
            id: "parent-tabset",
            type: "tabset",
            children: [
              {
                id: "pricingLayout",
                type: "tab",
                name: "New Tab",
                component: LayoutComponentKeys.pricingLayout,
              },
            ],
          },
        ],
      },
    ],
  },
};

export default model;
