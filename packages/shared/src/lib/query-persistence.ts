import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { QueryClient } from '@tanstack/react-query';

/**
 * Creates a localStorage persister for React Query
 * This will persist the query cache to localStorage
 */
export function createMenuPersister() {
  return createAsyncStoragePersister({
    storage: window.localStorage,
    key: 'arda-menu-cache',
    throttleTime: 1000, // Throttle saves to at most once per second
  });
}

/**
 * Creates a QueryClient configured for menu persistence
 * with appropriate gcTime settings
 */
export function createPersistentQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        gcTime: 1000 * 60 * 60 * 24, // 24 hours - same as maxAge
        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: 3,
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      },
    },
  });
}

/**
 * Menu-specific persistence configuration
 */
export const menuPersistenceConfig = {
  maxAge: 1000 * 60 * 60 * 24, // 24 hours
  buster: 'v1.0.0', // Cache buster for version control
};
