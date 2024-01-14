import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LayoutKey } from "../api/Layouts";

export type LayoutLastReset = { layoutKey: LayoutKey } | undefined;
export interface CurrentModels {
  mobile: string | undefined;
  desktop: string | undefined;
}

export interface LayoutState {
  currentModel: CurrentModels;
  lastReset: LayoutLastReset;
}

const initialState: LayoutState = {
  currentModel: { mobile: undefined, desktop: undefined },
  lastReset: undefined,
};

export const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    setCurrentModel: (
      state,
      action: PayloadAction<{ model: string; isMobile: boolean }>
    ) => {
      const { isMobile, model } = action.payload;
      if (isMobile) {
        state.currentModel.mobile = model;
      } else {
        state.currentModel.desktop = model;
      }
    },
    resetLayout: (state, action: PayloadAction<LayoutKey>) => {
      const layoutKey = action.payload;
      state.lastReset = { layoutKey };
    },
  },
});

export const { setCurrentModel, resetLayout } = layoutSlice.actions;

export default layoutSlice.reducer;
