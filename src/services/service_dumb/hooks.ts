import { createMutationHook, createQueryHook } from "@/hooks/use-service";

import { DumbActions } from "./actions";

export const useDumbDetails = createQueryHook({
  queryKey: ["dumb-details"],
  queryFn: DumbActions.GetDetails,
});

export const useDumbHistory = createQueryHook({
  queryKey: ["dumb-history"],
  queryFn: DumbActions.GetHistory,
});

export const useCreateDumb = createMutationHook({
  mutationFn: DumbActions.CreateDumb,
  invalidateQueryKey: ["dumb-history"],
});
