import { useQuery, useInfiniteQuery, UseQueryOptions, UseInfiniteQueryOptions } from '@tanstack/react-query';

// Generic query key factory
export function createQueryKeys<T extends string>(entityName: T) {
  return {
    all: [entityName] as const,
    lists: () => [...entityName, 'list'] as const,
    list: (filters: any) => [...entityName, 'list', filters] as const,
    details: () => [...entityName, 'detail'] as const,
    detail: (id: number | string) => [...entityName, 'detail', id] as const,
    stats: () => [...entityName, 'stats'] as const,
  };
}

// Generic query hooks factory
export function createQueryHooks<TData, TFilter = any>(
  entityName: string,
  apiClient: {
    getAll: (filters?: TFilter) => Promise<{ content: TData[]; totalElements: number; totalPages: number; number: number; last: boolean }>;
    getById: (id: number | string) => Promise<TData>;
    getStats?: () => Promise<any>;
  }
) {
  const queryKeys = createQueryKeys(entityName);

  const useList = (filters: TFilter = {} as TFilter, options?: Partial<UseQueryOptions>) => {
    return useQuery({
      queryKey: queryKeys.list(filters),
      queryFn: () => apiClient.getAll(filters),
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      ...options,
    });
  };

  const useInfiniteList = (filters: Omit<TFilter, 'page'> = {} as Omit<TFilter, 'page'>, options?: Partial<UseInfiniteQueryOptions>) => {
    return useInfiniteQuery({
      queryKey: queryKeys.list(filters),
      queryFn: ({ pageParam = 0 }) =>
        apiClient.getAll({ ...filters, page: pageParam } as TFilter),
      getNextPageParam: (lastPage: any) =>
        lastPage.last ? undefined : lastPage.number + 1,
      initialPageParam: 0,
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      ...options,
    });
  };

  const useDetail = (id: number | string, options?: Partial<UseQueryOptions>) => {
    return useQuery({
      queryKey: queryKeys.detail(id),
      queryFn: () => apiClient.getById(id),
      enabled: !!id,
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      ...options,
    });
  };

  const useStats = (options?: Partial<UseQueryOptions>) => {
    if (!apiClient.getStats) {
      throw new Error(`getStats method not implemented for ${entityName}`);
    }

    return useQuery({
      queryKey: queryKeys.stats(),
      queryFn: () => apiClient.getStats!(),
      staleTime: 2 * 60 * 1000, // 2 minutes
      gcTime: 5 * 60 * 1000, // 5 minutes
      ...options,
    });
  };

  return {
    queryKeys,
    useList,
    useInfiniteList,
    useDetail,
    useStats,
  };
}
