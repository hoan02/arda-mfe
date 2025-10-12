# Admin App - Query Hooks Documentation

## Overview

This admin app now includes comprehensive query hooks using TanStack Query (React Query) to interact with the backend API. The hooks follow the same patterns as the `data-table-filters` app and provide a clean, type-safe interface for data fetching and mutations.

## Architecture

### 1. API Client (`src/lib/api-client.ts`)

- Centralized Axios instance with interceptors
- Type-safe API calls with proper error handling
- Automatic request/response logging
- Base URL configuration for the admin service

### 2. Type Definitions (`src/types/api.ts`)

- Complete TypeScript interfaces for all API requests/responses
- User, Dashboard, Audit Log, and Health Check types
- Pagination and filtering interfaces

### 3. Query Hooks (`src/hooks/queries/`)

- **useUsers.ts**: User management queries
- **useDashboard.ts**: Dashboard and analytics queries
- **useAuditLogs.ts**: Audit log queries
- **useHealth.ts**: Health check queries

### 4. Mutation Hooks (`src/hooks/mutations/`)

- **useUserMutations.ts**: CRUD operations for users
- **useBulkUserMutations.ts**: Bulk operations for users

### 5. Updated useUsersTable Hook

- Enhanced with real API integration
- Comprehensive state management
- Built-in loading and error states
- Filter and pagination support

## Usage Examples

### Basic User Query

```typescript
import { useUsers } from '../hooks/queries/useUsers';

function UsersList() {
  const { data, isLoading, error } = useUsers({
    page: 0,
    size: 10,
    status: 'ACTIVE',
    sortBy: 'createdAt',
    sortDirection: 'desc'
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data?.content.map(user => (
        <div key={user.id}>{user.username}</div>
      ))}
    </div>
  );
}
```

### User Mutations

```typescript
import { useCreateUser, useUpdateUser, useDeleteUser } from '../hooks/mutations/useUserMutations';

function UserActions() {
  const createUser = useCreateUser();
  const updateUser = useUpdateUser();
  const deleteUser = useDeleteUser();

  const handleCreate = async () => {
    try {
      await createUser.mutateAsync({
        username: 'newuser',
        email: 'newuser@example.com',
        password: 'password123',
        role: 'USER'
      });
      console.log('User created successfully!');
    } catch (error) {
      console.error('Failed to create user:', error);
    }
  };

  return (
    <button onClick={handleCreate} disabled={createUser.isPending}>
      {createUser.isPending ? 'Creating...' : 'Create User'}
    </button>
  );
}
```

### Dashboard Data

```typescript
import { useDashboardOverview, useRecentActivities } from '../hooks/queries/useDashboard';

function Dashboard() {
  const { data: overview } = useDashboardOverview();
  const { data: activities } = useRecentActivities();

  return (
    <div>
      <h1>Total Users: {overview?.totalUsers}</h1>
      <h2>Recent Activities</h2>
      {activities?.activities.map(activity => (
        <div key={activity.id}>{activity.description}</div>
      ))}
    </div>
  );
}
```

### Enhanced useUsersTable Hook

```typescript
import { useUsersTable } from "../hooks/useUsersTable";

function UsersTable() {
  const {
    // Data
    users,
    stats,
    selectedRows,

    // Loading states
    isLoading,
    isCreating,
    isUpdating,

    // Filter handlers
    setSearch,
    setStatus,
    setRole,
    setPage,

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

    // Bulk actions
    handleBulkActivate,
    handleBulkDeactivate,
    handleBulkDelete,
  } = useUsersTable({
    initialFilters: {
      page: 0,
      size: 10,
      sortBy: "createdAt",
      sortDirection: "desc",
    },
  });

  // Use the hook data and handlers in your component
}
```

## Key Features

### 1. **Automatic Caching**

- TanStack Query provides intelligent caching
- Data is cached and shared across components
- Automatic background refetching
- Optimistic updates for mutations

### 2. **Loading States**

- Built-in loading indicators for all operations
- Granular loading states for different actions
- Error handling with retry mechanisms

### 3. **Real-time Updates**

- Dashboard data refreshes automatically
- Recent activities update every 30 seconds
- System health monitoring

### 4. **Filtering & Pagination**

- URL state management with nuqs (compatible)
- Advanced filtering options
- Infinite scroll support for large datasets

### 5. **Bulk Operations**

- Select multiple users
- Bulk activate/deactivate/delete
- Progress tracking for bulk operations

## Example Components

The `src/components/examples/` directory contains complete example components:

- **UsersTableExample.tsx**: Full-featured users table with filtering, pagination, and bulk actions
- **DashboardExample.tsx**: Dashboard with stats, charts, and real-time updates
- **AuditLogsExample.tsx**: Audit logs table with filtering and detailed view

## Configuration

### API Base URL

Update the base URL in `src/lib/api-client.ts`:

```typescript
this.client = axios.create({
  baseURL: "http://localhost:8000/api/v1", // Change this to your API URL
  // ...
});
```

### Query Defaults

Customize default query options in each hook:

```typescript
export function useUsers(filters: UserFilterRequest = {}) {
  return useQuery({
    queryKey: userKeys.list(filters),
    queryFn: () => apiClient.getUsers(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}
```

## Error Handling

All hooks include comprehensive error handling:

- Network errors
- API errors with proper status codes
- Retry mechanisms with exponential backoff
- User-friendly error messages

## Performance Optimizations

- **Query Invalidation**: Automatic cache invalidation after mutations
- **Optimistic Updates**: Immediate UI updates with rollback on error
- **Background Refetching**: Keep data fresh without user interaction
- **Request Deduplication**: Prevent duplicate requests

## Integration with Data Table Filters

The query hooks are designed to work seamlessly with the data table patterns from `data-table-filters`:

- Compatible with TanStack Table
- URL state management with nuqs
- Advanced filtering and sorting
- Pagination with infinite scroll support

This provides a consistent developer experience across the entire admin application.
