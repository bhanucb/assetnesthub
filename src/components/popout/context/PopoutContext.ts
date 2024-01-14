import { createContext } from "react";

interface PopoutModel {
  windowRefs: Map<string, Window>;
  storeWindowRef: (tabId: string, ref: Window) => void;
}

const defaultPopoutModel: PopoutModel = {
  windowRefs: new Map<string, Window>(),
  storeWindowRef: () => {
    return;
  },
};

export const PopoutContext = createContext(defaultPopoutModel);
