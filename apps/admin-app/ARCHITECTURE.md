# Admin App Architecture

## Overview

Admin app được tổ chức lại với cấu trúc rõ ràng, tập trung vào Users Management với data-table và query hooks.

## Cấu trúc thư mục

```
src/
├── components/           # Shared components
│   ├── examples/        # Example components
│   └── layout/          # Layout components
├── features/            # Feature-based modules
│   ├── users/          # Users management feature
│   │   ├── components/ # User-specific components
│   │   └── UsersManagement.tsx
│   ├── dashboard/      # Dashboard feature
│   └── settings/       # Settings feature
├── hooks/              # Reusable hooks
│   ├── queries/        # TanStack Query hooks
│   ├── mutations/      # Mutation hooks
│   └── useUsersTable.ts
├── lib/                # Utilities and API client
├── providers/          # Context providers
├── types/              # TypeScript types
└── App.tsx
```

## Features

### 1. Users Management (`/users`)

- **Main View**: Data table với filtering, pagination, sorting
- **Create User**: Dialog form để tạo user mới
- **Edit User**: Dialog form để cập nhật user
- **Delete User**: Confirmation dialog
- **View Details**: Detailed user information dialog
- **Bulk Actions**: Select multiple users và thực hiện bulk operations

### 2. Navigation

- Top navigation bar với active states
- Easy navigation giữa các features

### 3. Query System

- **TanStack Query** cho data fetching và caching
- **API Client** với Axios và error handling
- **Type-safe** API calls
- **Optimistic updates** cho mutations

## Components

### User Components

- `UserCreateDialog`: Form tạo user mới
- `UserEditDialog`: Form cập nhật user
- `UserDeleteDialog`: Confirmation dialog
- `UserDetailDialog`: Chi tiết user information
- `BulkActionsToolbar`: Bulk operations toolbar

### Layout Components

- `Navigation`: Top navigation bar
- `DataTablePagination`: Pagination component

## Hooks

### Query Hooks

- `useUsers`: Fetch users với filters
- `useDashboard`: Dashboard data
- `useAuditLogs`: Audit logs
- `useHealth`: Health checks

### Mutation Hooks

- `useCreateUser`: Create user
- `useUpdateUser`: Update user
- `useDeleteUser`: Delete user
- `useBulkUserMutations`: Bulk operations

### Enhanced Hook

- `useUsersTable`: Comprehensive hook cho users table với:
  - Data fetching
  - Filtering và pagination
  - Selection management
  - CRUD operations
  - Bulk actions
  - Loading states

## API Integration

### API Client (`lib/api-client.ts`)

- Centralized Axios instance
- Request/response interceptors
- Error handling
- Type-safe API calls

### Types (`types/api.ts`)

- Complete TypeScript interfaces
- Request/response types
- Pagination types
- Filter types

## Routes

- `/` - Dashboard
- `/users` - Users Management (main feature)
- `/settings` - Settings
- `/examples/users-table` - Example component

## Key Features

### 1. **Data Table**

- Advanced filtering (search, status, role, email verified)
- Pagination với page size options
- Sorting trên tất cả columns
- Row selection với bulk actions
- Loading states và error handling

### 2. **User Operations**

- Create user với validation
- Edit user information
- Delete user với confirmation
- View detailed user information
- Bulk activate/deactivate/delete/verify

### 3. **Real-time Updates**

- Automatic data refetching
- Optimistic updates
- Cache invalidation
- Background sync

### 4. **User Experience**

- Loading indicators
- Error messages
- Success notifications
- Responsive design
- Keyboard navigation

## Usage

### Basic Usage

```typescript
import { useUsersTable } from '../hooks/useUsersTable';

function UsersPage() {
  const { users, isLoading, handleCreateUser } = useUsersTable();

  return (
    <div>
      {isLoading ? <Loading /> : <UsersTable users={users} />}
    </div>
  );
}
```

### With Filters

```typescript
const { users, setSearch, setStatus, setRole } = useUsersTable({
  initialFilters: {
    status: "ACTIVE",
    role: "USER",
  },
});
```

## Benefits

1. **Maintainable**: Clear separation of concerns
2. **Reusable**: Shared hooks và components
3. **Type-safe**: Full TypeScript support
4. **Performant**: TanStack Query caching
5. **User-friendly**: Intuitive UI/UX
6. **Scalable**: Easy to add new features

## Next Steps

1. Add more features (roles, permissions, etc.)
2. Implement advanced filtering
3. Add export functionality
4. Add audit logging
5. Add real-time notifications
