import { create } from "zustand";

import { AppStatus } from "./constants";

export const useAppStore = create(() => ({
  status: AppStatus.IDLE,
}));
