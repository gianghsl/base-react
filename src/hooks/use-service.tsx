import {
  QueryKey,
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

export function createQueryHook<TQueryFnData = unknown>(options: {
  queryKey: QueryKey | ((...args: any[]) => QueryKey);
  queryFn: (...args: any[]) => Promise<TQueryFnData>;
}) {
  return (...args: any[]) => {
    const queryKey =
      typeof options.queryKey === "function"
        ? options.queryKey(...args)
        : options.queryKey;

    return useQuery({
      queryKey,
      queryFn: () => options.queryFn(...args),
      ...args[args.length - 1],
    });
  };
}

export function createMutationHook<
  TData = unknown,
  TVariables = void,
  TContext = unknown,
>(options: {
  mutationFn: (variables: TVariables) => Promise<TData>;
  invalidateQueryKey?: QueryKey;
  mutationOptions?: Omit<
    UseMutationOptions<TData, Error, TVariables, TContext>,
    "mutationFn"
  >;
}) {
  return () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: options.mutationFn,
      onSuccess: (data, variables, context) => {
        if (options.invalidateQueryKey) {
          queryClient.invalidateQueries({
            queryKey: options.invalidateQueryKey,
          });
        }
        if (options.mutationOptions?.onSuccess) {
          options.mutationOptions.onSuccess(data, variables, context);
        }
      },
      ...options.mutationOptions,
    });
  };
}
