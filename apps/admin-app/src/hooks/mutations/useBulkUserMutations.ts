import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../lib/api-client';
import { userKeys } from '../queries/useUsers';

// Bulk activate users
export function useBulkActivateUsers() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userIds: number[]) => {
      const promises = userIds.map(id => apiClient.activateUser(id));
      await Promise.all(promises);
    },
    onSuccess: () => {
      // Invalidate all user-related queries
      queryClient.invalidateQueries({ queryKey: userKeys.all });
    },
    onError: (error) => {
      console.error('Failed to bulk activate users:', error);
    },
  });
}

// Bulk deactivate users
export function useBulkDeactivateUsers() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userIds: number[]) => {
      const promises = userIds.map(id => apiClient.deactivateUser(id));
      await Promise.all(promises);
    },
    onSuccess: () => {
      // Invalidate all user-related queries
      queryClient.invalidateQueries({ queryKey: userKeys.all });
    },
    onError: (error) => {
      console.error('Failed to bulk deactivate users:', error);
    },
  });
}

// Bulk delete users
export function useBulkDeleteUsers() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userIds: number[]) => {
      const promises = userIds.map(id => apiClient.deleteUser(id));
      await Promise.all(promises);
    },
    onSuccess: (_, userIds) => {
      // Remove users from cache
      userIds.forEach(id => {
        queryClient.removeQueries({ queryKey: userKeys.detail(id) });
      });

      // Invalidate all user-related queries
      queryClient.invalidateQueries({ queryKey: userKeys.all });
    },
    onError: (error) => {
      console.error('Failed to bulk delete users:', error);
    },
  });
}

// Bulk verify user emails
export function useBulkVerifyUserEmails() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userIds: number[]) => {
      const promises = userIds.map(id => apiClient.verifyUserEmail(id));
      await Promise.all(promises);
    },
    onSuccess: () => {
      // Invalidate all user-related queries
      queryClient.invalidateQueries({ queryKey: userKeys.all });
    },
    onError: (error) => {
      console.error('Failed to bulk verify user emails:', error);
    },
  });
}
