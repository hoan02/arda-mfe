import { useMutation, useQueryClient, UseMutationOptions } from '@tanstack/react-query';

// Generic mutation hooks factory
export function createMutationHooks<TData, TCreate, TUpdate>(
  entityName: string,
  queryKeys: any,
  apiClient: {
    create: (data: TCreate) => Promise<TData>;
    update: (id: number | string, data: TUpdate) => Promise<TData>;
    delete: (id: number | string) => Promise<void>;
    [key: string]: any; // For additional methods like activate, deactivate, etc.
  }
) {
  const useCreate = (options?: Partial<UseMutationOptions<TData, Error, TCreate>>) => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: (data: TCreate) => apiClient.create(data),
      onSuccess: (newData: TData) => {
        // Invalidate and refetch lists
        queryClient.invalidateQueries({ queryKey: queryKeys.lists() });
        queryClient.invalidateQueries({ queryKey: queryKeys.stats() });

        // Add the new item to the cache if it has an id
        if (typeof newData === 'object' && newData !== null && 'id' in newData) {
          queryClient.setQueryData(queryKeys.detail((newData as any).id), newData);
        }
      },
      onError: (error) => {
        console.error(`Failed to create ${entityName}:`, error);
      },
      ...options,
    });
  };

  const useUpdate = (options?: Partial<UseMutationOptions<TData, Error, { id: number | string; data: TUpdate }>>) => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({ id, data }: { id: number | string; data: TUpdate }) =>
        apiClient.update(id, data),
      onSuccess: (updatedData: TData, variables) => {
        // Update the item in cache
        queryClient.setQueryData(queryKeys.detail(variables.id), updatedData);

        // Invalidate lists and stats
        queryClient.invalidateQueries({ queryKey: queryKeys.lists() });
        queryClient.invalidateQueries({ queryKey: queryKeys.stats() });
      },
      onError: (error) => {
        console.error(`Failed to update ${entityName}:`, error);
      },
      ...options,
    });
  };

  const useDelete = (options?: Partial<UseMutationOptions<void, Error, number | string>>) => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: (id: number | string) => apiClient.delete(id),
      onSuccess: (_, itemId) => {
        // Remove item from cache
        queryClient.removeQueries({ queryKey: queryKeys.detail(itemId) });

        // Invalidate lists and stats
        queryClient.invalidateQueries({ queryKey: queryKeys.lists() });
        queryClient.invalidateQueries({ queryKey: queryKeys.stats() });
      },
      onError: (error) => {
        console.error(`Failed to delete ${entityName}:`, error);
      },
      ...options,
    });
  };

  // Generic action mutation (for activate, deactivate, etc.)
  const useAction = (
    actionName: string,
    actionFn: (id: number | string) => Promise<void>,
    options?: Partial<UseMutationOptions<void, Error, number | string>>
  ) => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: actionFn,
      onSuccess: (_, itemId) => {
        // Invalidate item data to refetch with updated status
        queryClient.invalidateQueries({ queryKey: queryKeys.detail(itemId) });
        queryClient.invalidateQueries({ queryKey: queryKeys.lists() });
        queryClient.invalidateQueries({ queryKey: queryKeys.stats() });
      },
      onError: (error) => {
        console.error(`Failed to ${actionName} ${entityName}:`, error);
      },
      ...options,
    });
  };

  return {
    useCreate,
    useUpdate,
    useDelete,
    useAction,
  };
}
