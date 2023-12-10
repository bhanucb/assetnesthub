import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TabManagementState {
  selectedTabId: string | undefined;
}

const initialState: TabManagementState = {
  selectedTabId: undefined,
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
