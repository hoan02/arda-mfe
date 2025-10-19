import { useQueryClient } from '@tanstack/react-query';

/**
 * Hook to check if menu data is currently being restored from persistence
 * Useful for showing loading states during cache restoration
 * Note: useIsRestoring is not available in the current version, 
 * so we'll use a simple approach for now
 */
export function useMenuRestoring() {
  // For now, return false since useIsRestoring is not available
  // In a real implementation, you might want to track this state manually
  return false;
}

/**
 * Hook to manually invalidate and refetch menu data
 * Useful for forcing a refresh of cached menu data
 */
export function useMenuRefresh() {
  const queryClient = useQueryClient();

  const invalidateMenus = (role?: string) => {
    return queryClient.invalidateQueries({
      queryKey: ['menus', role],
    });
  };

  const refetchMenus = (role?: string) => {
    return queryClient.refetchQueries({
      queryKey: ['menus', role],
    });
  };

  const clearMenuCache = () => {
    return queryClient.removeQueries({
      queryKey: ['menus'],
    });
  };

  return {
    invalidateMenus,
    refetchMenus,
    clearMenuCache,
  };
}
