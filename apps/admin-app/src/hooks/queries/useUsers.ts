import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { apiClient } from '../../lib/api-client';
import { UserDto, UserFilterRequest, PagedResponse } from '../../types/api';

// Query keys
export const userKeys = {
  all: ['users'] as const,
  lists: () => [...userKeys.all, 'list'] as const,
  list: (filters: UserFilterRequest) => [...userKeys.lists(), filters] as const,
  details: () => [...userKeys.all, 'detail'] as const,
  detail: (id: number) => [...userKeys.details(), id] as const,
  byUsername: (username: string) => [...userKeys.details(), 'username', username] as const,
  byEmail: (email: string) => [...userKeys.details(), 'email', email] as const,
  stats: () => [...userKeys.all, 'stats'] as const,
  statsCount: () => [...userKeys.stats(), 'count'] as const,
  statsByStatus: () => [...userKeys.stats(), 'by-status'] as const,
  statsByRole: () => [...userKeys.stats(), 'by-role'] as const,
};

// Get users with filters and pagination
export function useUsers(filters: UserFilterRequest = {}) {
  return useQuery({
    queryKey: userKeys.list(filters),
    queryFn: () => apiClient.getUsers(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

// Get users with infinite scroll
export function useInfiniteUsers(filters: Omit<UserFilterRequest, 'page'> = {}) {
  return useInfiniteQuery({
    queryKey: userKeys.list(filters),
    queryFn: ({ pageParam = 0 }) =>
      apiClient.getUsers({ ...filters, page: pageParam }),
    getNextPageParam: (lastPage: PagedResponse<UserDto>) =>
      lastPage.last ? undefined : lastPage.number + 1,
    initialPageParam: 0,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

// Get user by ID
export function useUser(id: number) {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: () => apiClient.getUserById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

// Get user by username
export function useUserByUsername(username: string) {
  return useQuery({
    queryKey: userKeys.byUsername(username),
    queryFn: () => apiClient.getUserByUsername(username),
    enabled: !!username,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

// Get user by email
export function useUserByEmail(email: string) {
  return useQuery({
    queryKey: userKeys.byEmail(email),
    queryFn: () => apiClient.getUserByEmail(email),
    enabled: !!email,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

// Get user statistics count
export function useUserStatsCount() {
  return useQuery({
    queryKey: userKeys.statsCount(),
    queryFn: () => apiClient.getUserStatsCount(),
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Get user statistics by status
export function useUserStatsByStatus() {
  return useQuery({
    queryKey: userKeys.statsByStatus(),
    queryFn: () => apiClient.getUserStatsByStatus(),
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
}

// Get user statistics by role
export function useUserStatsByRole() {
  return useQuery({
    queryKey: userKeys.statsByRole(),
    queryFn: () => apiClient.getUserStatsByRole(),
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
}
