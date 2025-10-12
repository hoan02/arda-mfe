import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../lib/api-client';
import { CreateUserRequest, UpdateUserRequest, UserDto } from '../../types/api';
import { userKeys } from '../queries/useUsers';

// Create user mutation
export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userData: CreateUserRequest) => apiClient.createUser(userData),
    onSuccess: (newUser: UserDto) => {
      // Invalidate and refetch user lists
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      queryClient.invalidateQueries({ queryKey: userKeys.stats() });

      // Add the new user to the cache
      queryClient.setQueryData(userKeys.detail(newUser.id), newUser);
    },
    onError: (error) => {
      console.error('Failed to create user:', error);
    },
  });
}

// Update user mutation
export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, userData }: { id: number; userData: UpdateUserRequest }) =>
      apiClient.updateUser(id, userData),
    onSuccess: (updatedUser: UserDto, variables) => {
      // Update the user in cache
      queryClient.setQueryData(userKeys.detail(variables.id), updatedUser);

      // Invalidate user lists and stats
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      queryClient.invalidateQueries({ queryKey: userKeys.stats() });
    },
    onError: (error) => {
      console.error('Failed to update user:', error);
    },
  });
}

// Delete user mutation
export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => apiClient.deleteUser(id),
    onSuccess: (_, userId) => {
      // Remove user from cache
      queryClient.removeQueries({ queryKey: userKeys.detail(userId) });

      // Invalidate user lists and stats
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      queryClient.invalidateQueries({ queryKey: userKeys.stats() });
    },
    onError: (error) => {
      console.error('Failed to delete user:', error);
    },
  });
}

// Activate user mutation
export function useActivateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => apiClient.activateUser(id),
    onSuccess: (_, userId) => {
      // Invalidate user data to refetch with updated status
      queryClient.invalidateQueries({ queryKey: userKeys.detail(userId) });
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      queryClient.invalidateQueries({ queryKey: userKeys.stats() });
    },
    onError: (error) => {
      console.error('Failed to activate user:', error);
    },
  });
}

// Deactivate user mutation
export function useDeactivateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => apiClient.deactivateUser(id),
    onSuccess: (_, userId) => {
      // Invalidate user data to refetch with updated status
      queryClient.invalidateQueries({ queryKey: userKeys.detail(userId) });
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      queryClient.invalidateQueries({ queryKey: userKeys.stats() });
    },
    onError: (error) => {
      console.error('Failed to deactivate user:', error);
    },
  });
}

// Verify user email mutation
export function useVerifyUserEmail() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => apiClient.verifyUserEmail(id),
    onSuccess: (_, userId) => {
      // Invalidate user data to refetch with updated email verification status
      queryClient.invalidateQueries({ queryKey: userKeys.detail(userId) });
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      queryClient.invalidateQueries({ queryKey: userKeys.stats() });
    },
    onError: (error) => {
      console.error('Failed to verify user email:', error);
    },
  });
}
