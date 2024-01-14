import { IJsonModel, Model } from "flexlayout-react";

export const homeLayoutKey = "homeLayout";
export type LayoutKey = typeof homeLayoutKey;

interface LayoutStorageModel {
  mobile: string | null;
  desktop: string | null;
}

interface StoredLayouts {
  mobile: Model | null;
  desktop: Model | null;
}

export function getLastSavedHomeLayout(): Promise<StoredLayouts> {
  const storedLayoutStr = localStorage.getItem(homeLayoutKey);
  const storedLayouts: StoredLayouts = {
    mobile: null,
    desktop: null,
  };

  if (storedLayoutStr !== null) {
    const layoutStorageJson = JSON.parse(storedLayoutStr) as LayoutStorageModel;

    if (layoutStorageJson.mobile !== null) {
      const json = JSON.parse(layoutStorageJson.mobile) as IJsonModel;
      storedLayouts.mobile = Model.fromJson(json);
    }

    if (layoutStorageJson.desktop !== null) {
      const json = JSON.parse(layoutStorageJson.desktop) as IJsonModel;
      storedLayouts.desktop = Model.fromJson(json);
    }

    return Promise.resolve(storedLayouts);
  }

  return Promise.resolve(storedLayouts);
}

function saveHomeLayout(
  mobile: Model | string | null,
  desktop: Model | string | null
): Promise<void> {
  const layoutStore: LayoutStorageModel = {
    mobile:
      mobile === null
        ? null
        : typeof mobile === "string"
        ? mobile
        : mobile.toString(),
    desktop:
      desktop === null
        ? null
        : typeof desktop === "string"
        ? desktop
        : desktop.toString(),
  };

  localStorage.setItem(homeLayoutKey, JSON.stringify(layoutStore));
  return Promise.resolve();
}

export function saveDesktopLayout(layout: Model | string) {
  return saveHomeLayout(null, layout);
}

export function saveMobileLayout(layout: Model | string) {
  return saveHomeLayout(layout, null);
}
