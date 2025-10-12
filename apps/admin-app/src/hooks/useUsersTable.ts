import { useState, useCallback, useMemo } from 'react';
import toast from 'react-hot-toast';
import { useUsers, useUserStatsCount } from './queries/useUsers';
import { useCreateUser, useUpdateUser, useDeleteUser, useActivateUser, useDeactivateUser, useVerifyUserEmail } from './mutations/useUserMutations';
import { useBulkActivateUsers, useBulkDeactivateUsers, useBulkDeleteUsers, useBulkVerifyUserEmails } from './mutations/useBulkUserMutations';
import { UserFilterRequest, UserDto } from '../types/api';

export interface UseUsersTableOptions {
  initialFilters?: UserFilterRequest;
  pageSize?: number;
}

export function useUsersTable(options: UseUsersTableOptions = {}) {
  const { initialFilters = {}, pageSize = 10 } = options;

  // State for filters and selection
  const [filters, setFilters] = useState<UserFilterRequest>({
    ...initialFilters,
    size: pageSize,
  });
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  // Queries
  const {
    data: usersData,
    isLoading,
    error,
    refetch
  } = useUsers(filters);

  const { data: statsData } = useUserStatsCount();

  // Mutations
  const createUserMutation = useCreateUser();
  const updateUserMutation = useUpdateUser();
  const deleteUserMutation = useDeleteUser();
  const activateUserMutation = useActivateUser();
  const deactivateUserMutation = useDeactivateUser();
  const verifyEmailMutation = useVerifyUserEmail();

  // Bulk mutations
  const bulkActivateMutation = useBulkActivateUsers();
  const bulkDeactivateMutation = useBulkDeactivateUsers();
  const bulkDeleteMutation = useBulkDeleteUsers();
  const bulkVerifyMutation = useBulkVerifyUserEmails();

  // Computed values
  const users = usersData?.content || [];
  const totalElements = usersData?.totalElements || 0;
  const totalPages = usersData?.totalPages || 0;
  const currentPage = usersData?.number || 0;

  // Filter handlers
  const updateFilters = useCallback((newFilters: Partial<UserFilterRequest>) => {
    setFilters(prev => ({ ...prev, ...newFilters, page: 0 }));
  }, []);

  const setSearch = useCallback((search: string) => {
    updateFilters({ search });
  }, [updateFilters]);

  const setStatus = useCallback((status: string | undefined) => {
    updateFilters({ status: status as any });
  }, [updateFilters]);

  const setRole = useCallback((role: string | undefined) => {
    updateFilters({ role: role as any });
  }, [updateFilters]);

  const setEmailVerified = useCallback((emailVerified: boolean | undefined) => {
    updateFilters({ emailVerified });
  }, [updateFilters]);

  const setPage = useCallback((page: number) => {
    setFilters(prev => ({ ...prev, page }));
  }, []);

  const setSort = useCallback((sortBy: string, sortDirection: 'asc' | 'desc') => {
    setFilters(prev => ({ ...prev, sortBy, sortDirection }));
  }, []);

  // Selection handlers
  const handleSelectRow = useCallback((userId: number) => {
    setSelectedRows(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  }, []);

  const handleSelectAll = useCallback(() => {
    setSelectedRows(prev =>
      prev.length === users.length
        ? []
        : users.map(user => user.id)
    );
  }, [users]);

  const clearSelection = useCallback(() => {
    setSelectedRows([]);
  }, []);

  // User actions
  const handleCreateUser = useCallback(async (userData: any) => {
    try {
      await createUserMutation.mutateAsync(userData);
      toast.success('User created successfully!');
      return true;
    } catch (error) {
      console.error('Failed to create user:', error);
      toast.error('Failed to create user. Please try again.');
      return false;
    }
  }, [createUserMutation]);

  const handleUpdateUser = useCallback(async (id: number, userData: any) => {
    try {
      await updateUserMutation.mutateAsync({ id, userData });
      toast.success('User updated successfully!');
      return true;
    } catch (error) {
      console.error('Failed to update user:', error);
      toast.error('Failed to update user. Please try again.');
      return false;
    }
  }, [updateUserMutation]);

  const handleDeleteUser = useCallback(async (id: number) => {
    try {
      await deleteUserMutation.mutateAsync(id);
      toast.success('User deleted successfully!');
      return true;
    } catch (error) {
      console.error('Failed to delete user:', error);
      toast.error('Failed to delete user. Please try again.');
      return false;
    }
  }, [deleteUserMutation]);

  const handleActivateUser = useCallback(async (id: number) => {
    try {
      await activateUserMutation.mutateAsync(id);
      toast.success('User activated successfully!');
      return true;
    } catch (error) {
      console.error('Failed to activate user:', error);
      toast.error('Failed to activate user. Please try again.');
      return false;
    }
  }, [activateUserMutation]);

  const handleDeactivateUser = useCallback(async (id: number) => {
    try {
      await deactivateUserMutation.mutateAsync(id);
      toast.success('User deactivated successfully!');
      return true;
    } catch (error) {
      console.error('Failed to deactivate user:', error);
      toast.error('Failed to deactivate user. Please try again.');
      return false;
    }
  }, [deactivateUserMutation]);

  const handleVerifyEmail = useCallback(async (id: number) => {
    try {
      await verifyEmailMutation.mutateAsync(id);
      toast.success('Email verified successfully!');
      return true;
    } catch (error) {
      console.error('Failed to verify email:', error);
      toast.error('Failed to verify email. Please try again.');
      return false;
    }
  }, [verifyEmailMutation]);

  // Bulk actions
  const handleBulkActivate = useCallback(async () => {
    if (selectedRows.length === 0) return false;
    try {
      await bulkActivateMutation.mutateAsync(selectedRows);
      clearSelection();
      toast.success(`${selectedRows.length} users activated successfully!`);
      return true;
    } catch (error) {
      console.error('Failed to bulk activate users:', error);
      toast.error('Failed to activate users. Please try again.');
      return false;
    }
  }, [selectedRows, bulkActivateMutation, clearSelection]);

  const handleBulkDeactivate = useCallback(async () => {
    if (selectedRows.length === 0) return false;
    try {
      await bulkDeactivateMutation.mutateAsync(selectedRows);
      clearSelection();
      toast.success(`${selectedRows.length} users deactivated successfully!`);
      return true;
    } catch (error) {
      console.error('Failed to bulk deactivate users:', error);
      toast.error('Failed to deactivate users. Please try again.');
      return false;
    }
  }, [selectedRows, bulkDeactivateMutation, clearSelection]);

  const handleBulkDelete = useCallback(async () => {
    if (selectedRows.length === 0) return false;
    try {
      await bulkDeleteMutation.mutateAsync(selectedRows);
      clearSelection();
      toast.success(`${selectedRows.length} users deleted successfully!`);
      return true;
    } catch (error) {
      console.error('Failed to bulk delete users:', error);
      toast.error('Failed to delete users. Please try again.');
      return false;
    }
  }, [selectedRows, bulkDeleteMutation, clearSelection]);

  const handleBulkVerify = useCallback(async () => {
    if (selectedRows.length === 0) return false;
    try {
      await bulkVerifyMutation.mutateAsync(selectedRows);
      clearSelection();
      toast.success(`${selectedRows.length} emails verified successfully!`);
      return true;
    } catch (error) {
      console.error('Failed to bulk verify emails:', error);
      toast.error('Failed to verify emails. Please try again.');
      return false;
    }
  }, [selectedRows, bulkVerifyMutation, clearSelection]);

  return {
    // Data
    users,
    stats: statsData,
    selectedRows,
    filters,

    // Loading states
    isLoading,
    isCreating: createUserMutation.isPending,
    isUpdating: updateUserMutation.isPending,
    isDeleting: deleteUserMutation.isPending,
    isActivating: activateUserMutation.isPending,
    isDeactivating: deactivateUserMutation.isPending,
    isVerifying: verifyEmailMutation.isPending,
    isBulkActivating: bulkActivateMutation.isPending,
    isBulkDeactivating: bulkDeactivateMutation.isPending,
    isBulkDeleting: bulkDeleteMutation.isPending,
    isBulkVerifying: bulkVerifyMutation.isPending,

    // Error states
    error,

    // Pagination
    totalElements,
    totalPages,
    currentPage,
    pageSize,

    // Filter handlers
    setSearch,
    setStatus,
    setRole,
    setEmailVerified,
    setPage,
    setSort,
    updateFilters,

    // Selection handlers
    handleSelectRow,
    handleSelectAll,
    clearSelection,

    // User actions
    handleCreateUser,
    handleUpdateUser,
    handleDeleteUser,
    handleActivateUser,
    handleDeactivateUser,
    handleVerifyEmail,

    // Bulk actions
    handleBulkActivate,
    handleBulkDeactivate,
    handleBulkDelete,
    handleBulkVerify,

    // Utilities
    refetch,
  };
}
