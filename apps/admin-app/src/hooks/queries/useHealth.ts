import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../lib/api-client';
import { HealthStatus } from '../../types/api';

// Query keys
export const healthKeys = {
  all: ['health'] as const,
  status: () => [...healthKeys.all, 'status'] as const,
};

// Get health status
export function useHealthStatus() {
  return useQuery({
    queryKey: healthKeys.status(),
    queryFn: () => apiClient.getHealthStatus(),
    staleTime: 30 * 1000, // 30 seconds
    gcTime: 2 * 60 * 1000, // 2 minutes
    refetchInterval: 30 * 1000, // Refetch every 30 seconds
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}
