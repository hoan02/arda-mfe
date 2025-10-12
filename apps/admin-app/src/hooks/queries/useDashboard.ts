import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../lib/api-client';
import { DashboardOverview, UserGrowthStats, RecentActivities, SystemHealth } from '../../types/api';

// Query keys
export const dashboardKeys = {
  all: ['dashboard'] as const,
  overview: () => [...dashboardKeys.all, 'overview'] as const,
  userGrowth: () => [...dashboardKeys.all, 'user-growth'] as const,
  recentActivities: () => [...dashboardKeys.all, 'recent-activities'] as const,
  systemHealth: () => [...dashboardKeys.all, 'system-health'] as const,
};

// Get dashboard overview
export function useDashboardOverview() {
  return useQuery({
    queryKey: dashboardKeys.overview(),
    queryFn: () => apiClient.getDashboardOverview(),
    staleTime: 1 * 60 * 1000, // 1 minute
    gcTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 2 * 60 * 1000, // Refetch every 2 minutes
  });
}

// Get user growth statistics
export function useUserGrowthStats() {
  return useQuery({
    queryKey: dashboardKeys.userGrowth(),
    queryFn: () => apiClient.getUserGrowthStats(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

// Get recent activities
export function useRecentActivities() {
  return useQuery({
    queryKey: dashboardKeys.recentActivities(),
    queryFn: () => apiClient.getRecentActivities(),
    staleTime: 30 * 1000, // 30 seconds
    gcTime: 2 * 60 * 1000, // 2 minutes
    refetchInterval: 30 * 1000, // Refetch every 30 seconds
  });
}

// Get system health
export function useSystemHealth() {
  return useQuery({
    queryKey: dashboardKeys.systemHealth(),
    queryFn: () => apiClient.getSystemHealth(),
    staleTime: 30 * 1000, // 30 seconds
    gcTime: 2 * 60 * 1000, // 2 minutes
    refetchInterval: 60 * 1000, // Refetch every minute
  });
}
