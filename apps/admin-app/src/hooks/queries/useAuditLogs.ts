import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { apiClient } from '../../lib/api-client';
import { AuditLog, AuditLogFilterRequest, PagedResponse } from '../../types/api';

// Query keys
export const auditLogKeys = {
  all: ['audit-logs'] as const,
  lists: () => [...auditLogKeys.all, 'list'] as const,
  list: (filters: AuditLogFilterRequest) => [...auditLogKeys.lists(), filters] as const,
  details: () => [...auditLogKeys.all, 'detail'] as const,
  detail: (id: number) => [...auditLogKeys.details(), id] as const,
  stats: () => [...auditLogKeys.all, 'stats'] as const,
};

// Get audit logs with filters and pagination
export function useAuditLogs(filters: AuditLogFilterRequest = {}) {
  return useQuery({
    queryKey: auditLogKeys.list(filters),
    queryFn: () => apiClient.getAuditLogs(filters),
    staleTime: 1 * 60 * 1000, // 1 minute
    gcTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Get audit logs with infinite scroll
export function useInfiniteAuditLogs(filters: Omit<AuditLogFilterRequest, 'page'> = {}) {
  return useInfiniteQuery({
    queryKey: auditLogKeys.list(filters),
    queryFn: ({ pageParam = 0 }) =>
      apiClient.getAuditLogs({ ...filters, page: pageParam }),
    getNextPageParam: (lastPage: PagedResponse<AuditLog>) =>
      lastPage.last ? undefined : lastPage.number + 1,
    initialPageParam: 0,
    staleTime: 1 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
}

// Get audit log by ID
export function useAuditLog(id: number) {
  return useQuery({
    queryKey: auditLogKeys.detail(id),
    queryFn: () => apiClient.getAuditLogById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

// Get audit log statistics
export function useAuditLogStats() {
  return useQuery({
    queryKey: auditLogKeys.stats(),
    queryFn: () => apiClient.getAuditLogStats(),
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
  });
}
