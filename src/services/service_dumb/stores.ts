import { create } from "zustand";

interface IDumbStore {
  count: number;
  increment: () => void;
}

export const useDumbStore = create<IDumbStore>(() => ({
  count: 0,
  increment: () => {},
}));
