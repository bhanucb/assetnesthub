import { IJsonModel, Model } from "flexlayout-react";

export const homeLayoutKey = "homeLayout";
export const pricingLayoutKey = "pricingLayout";
export type LayoutKey = typeof homeLayoutKey | typeof pricingLayoutKey;

export function getLastSavedHomeLayout(): Promise<Model | null> {
  const tabLayout = localStorage.getItem(homeLayoutKey);
  if (tabLayout) {
    const jsonModel: IJsonModel = JSON.parse(tabLayout);
    const layoutModel = Model.fromJson(jsonModel);
    return Promise.resolve(layoutModel);
  }

  return Promise.resolve(null);
}

export function saveHomeLayout(model: Model | string): Promise<void> {
  localStorage.setItem(
    homeLayoutKey,
    typeof model === "string" ? model : model.toString()
  );
  return Promise.resolve();
}
