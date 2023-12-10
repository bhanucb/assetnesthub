import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TabEvent = {
  tabName: string;
  portfolios: Array<string>;
};

export interface TabManagementState {
  tabIdOnEdit: string | undefined;
  selectedTabId: string | undefined;
  lastOpenedTab: TabEvent | undefined;
}

const initialState: TabManagementState = {
  tabIdOnEdit: undefined,
  selectedTabId: undefined,
  lastOpenedTab: undefined,
};

export const tabManagementSlice = createSlice({
  name: "tabManager",
  initialState,
  reducers: {
    onSelectTab: (
      state,
      action: PayloadAction<{ tabId: string | undefined }>
    ) => {
      state.selectedTabId = action.payload.tabId;
    },
  },
});

export const { onSelectTab } = tabManagementSlice.actions;

export default tabManagementSlice.reducer;
