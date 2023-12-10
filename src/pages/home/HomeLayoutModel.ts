import { IJsonModel } from "flexlayout-react";
import { LayoutComponentKeys } from "../../components/AppLayout";

const model: IJsonModel = {
  global: {},
  borders: [],
  layout: {
    type: "row",
    id: "1",
    children: [
      {
        type: "row",
        id: "#c23c5335-7bfb-4c93-8f30-e90ced7236c8",
        children: [
          {
            type: "row",
            id: "#ae59cc3d-01ac-45a5-bbc1-c08d2e1dd5a6",
            weight: 50,
            children: [
              {
                type: "tabset",
                id: "#36bb2d22-31b3-4a40-851e-60064ef748a2",
                weight: 30.817253121452893,
                children: [
                  {
                    type: "tab",
                    id: "#48c40520-408c-484f-a391-dad8bb5f7b76",
                    name: "Summary",
                    component: LayoutComponentKeys.summary,
                  },
                ],
              },
              {
                type: "tabset",
                id: "#0b6fe9fd-fd83-4d87-b621-f027bd0781d4",
                weight: 69.1827468785471,
                children: [
                  {
                    type: "tab",
                    id: "#7757b616-2e0e-4eec-be45-73067ec1f2c6",
                    name: "Investment Amount by Property Type",
                    component: LayoutComponentKeys.invAmountByPropType,
                  },
                ],
              },
            ],
          },
          {
            type: "row",
            id: "#e838137a-9da1-4f77-a678-0214381f3291",
            weight: 50,
            children: [
              {
                type: "tabset",
                id: "#6ddb88cc-be93-45aa-9278-ec46275fc3a2",
                weight: 30.950692098699292,
                children: [
                  {
                    type: "tab",
                    id: "#6867dea6-f2ae-44f5-a4e8-556988f3927e",
                    name: "Property Type Breakdown",
                    component: LayoutComponentKeys.propTypeBreakdown,
                  },
                ],
              },
              {
                type: "tabset",
                id: "#d4aae3bc-fd18-4407-b91c-ce877a7c6cbe",
                weight: 31.349688129437585,
                children: [
                  {
                    type: "tab",
                    id: "#44df6472-c02a-437c-802f-e76cff264c8e",
                    name: 'Trend of "Total Allocated Amount"',
                    component: LayoutComponentKeys.trendOfTotalAllocationAmount,
                  },
                ],
              },
              {
                type: "tabset",
                id: "#1ef76657-d550-4993-9a7f-59e1f9a5fe61",
                weight: 37.69961977186312,
                children: [
                  {
                    type: "tab",
                    id: "#39253790-0777-495d-a5e5-4aa8db2cb3a5",
                    name: "Declined Deals Breakdown",
                    component: LayoutComponentKeys.declinedDealsBreakdown,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
};

export default model;
