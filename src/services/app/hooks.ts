import { AppStatus } from "./constants";
import { useAppStore } from "./stores";

export const useAppStatus = () => {
  const { status } = useAppStore();
  const isInitialized = status === AppStatus.INITIALIZED;
  return { isInitialized };
};
