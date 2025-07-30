import { create } from "zustand";

import type { IUser } from "./types";

interface IUserStore {
  user: IUser | null;
}

export const useUserStores = create<IUserStore>(() => ({
  user: null,
}));
