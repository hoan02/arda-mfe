# BaseApiClient với Fetch và TanStack Query

## Tổng quan

`BaseApiClient` đã được refactor để sử dụng **fetch** thay vì axios và tích hợp sẵn với **TanStack Query** để quản lý caching và state.

## Tính năng chính

- ✅ **Fetch API**: Sử dụng native fetch thay vì axios
- ✅ **Timeout handling**: Tự động timeout với AbortController
- ✅ **Error handling**: Xử lý lỗi network, timeout, và HTTP status
- ✅ **TanStack Query integration**: Hỗ trợ query keys và invalidation
- ✅ **TypeScript support**: Full type safety
- ✅ **Logging**: Console logs cho debugging

## Cách sử dụng

### 1. Tạo API Client

```typescript
import { BaseApiClient } from "@workspace/shared/lib/base-api-client";

class MenuApiClient extends BaseApiClient {
  constructor() {
    super("http://localhost:8000/api/v1"); // Base URL
  }

  // GET /menus
  async getMenus(params?: { page?: number; limit?: number }) {
    return this.get<{ menus: any[]; total: number }>("/menus", params);
  }

  // GET /menus/:id
  async getMenu(id: string) {
    return this.get<any>(`/menus/${id}`);
  }

  // POST /menus
  async createMenu(data: any) {
    return this.post<any>("/menus", data);
  }

  // PUT /menus/:id
  async updateMenu(id: string, data: any) {
    return this.put<any>(`/menus/${id}`, data);
  }

  // DELETE /menus/:id
  async deleteMenu(id: string) {
    return this.delete(`/menus/${id}`);
  }
}

export const menuApiClient = new MenuApiClient();
```

### 2. Tạo React Hooks với TanStack Query

```typescript
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { menuApiClient } from "./menu-api-client";

// Query hook
export function useMenus(params?: { page?: number; limit?: number }) {
  return useQuery({
    queryKey: menuApiClient.getQueryKey("/menus", params),
    queryFn: () => menuApiClient.getMenus(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Mutation hook
export function useCreateMenu() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => menuApiClient.createMenu(data),
    onSuccess: () => {
      // Invalidate và refetch danh sách menus
      queryClient.invalidateQueries({
        queryKey: menuApiClient.getQueryKeysForEndpoint("/menus"),
      });
    },
    onError: (error: ApiError) => {
      console.error("Failed to create menu:", error.message);
    },
  });
}
```

### 3. Sử dụng trong Component

```tsx
function MenuList() {
  const { data: menus, isLoading, error } = useMenus({ page: 1, limit: 10 });
  const createMenuMutation = useCreateMenu();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleCreateMenu = (data: any) => {
    createMenuMutation.mutate(data);
  };

  return (
    <div>
      {menus?.menus.map((menu) => (
        <div key={menu.id}>{menu.name}</div>
      ))}
      <button onClick={() => handleCreateMenu({ name: "New Menu" })}>
        Create Menu
      </button>
    </div>
  );
}
```

## API Reference

### BaseApiClient Methods

#### CRUD Methods

- `get<T>(endpoint, params?)` - GET request
- `post<T>(endpoint, data?)` - POST request
- `put<T>(endpoint, data?)` - PUT request
- `patch<T>(endpoint, data?)` - PATCH request
- `delete(endpoint)` - DELETE request

#### TanStack Query Helpers

- `getQueryKey(endpoint, params?)` - Tạo query key cho caching
- `getQueryKeysForEndpoint(endpoint)` - Lấy query keys để invalidate

#### Configuration

- `baseUrl` - Base URL cho API
- `defaultTimeout` - Timeout mặc định (10s)

### Error Handling

```typescript
interface ApiError {
  error: string; // Loại lỗi
  message: string; // Thông báo lỗi
  timestamp: string; // Thời gian xảy ra lỗi
  status: number; // HTTP status code
}
```

## Migration từ Axios

Nếu bạn đang migrate từ axios:

1. **Thay thế axios.create()** → `new BaseApiClient(baseUrl)`
2. **Thay thế client.get()** → `this.get()`
3. **Thay thế client.post()** → `this.post()`
4. **Thay thế interceptors** → Sử dụng TanStack Query hooks
5. **Thay thế error handling** → Sử dụng ApiError interface

## Lợi ích

- 🚀 **Performance**: Fetch API nhanh hơn axios
- 📦 **Bundle size**: Giảm kích thước bundle (không cần axios)
- 🔄 **Caching**: TanStack Query tự động cache và sync
- 🛡️ **Type safety**: Full TypeScript support
- 🐛 **Debugging**: Console logs chi tiết
