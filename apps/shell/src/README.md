# Shell App - Menu Management

## Tổng quan

Shell app đã được cải thiện để sử dụng **TanStack Query** và **BaseApiClient** mới với fetch API để quản lý menu sidebar.

## Tính năng mới

### ✅ **API Integration**

- Menu sidebar được load từ API thực tế
- Sử dụng TanStack Query cho caching và state management
- Error handling và retry logic tự động

### ✅ **Loading States**

- Loading spinner khi đang fetch data
- Error state với retry button
- Refetch functionality

### ✅ **Icon Mapping**

- Tự động map icon từ API string sang Lucide React components
- Fallback icon nếu không tìm thấy

## Cấu trúc API

### Menu API Endpoints

```typescript
// GET /api/v1/menus?role=admin
interface ApiMenuItem {
  id: number;
  label: string;
  icon?: string; // 'home', 'settings', 'users', etc.
  path?: string; // '/dashboard', '/users', etc.
  orderIndex?: number;
  type?: string; // 'menu', 'submenu'
  children?: ApiMenuItem[];
}
```

### Dynamic Icon Support

Shell app sử dụng **DynamicIcon** từ `lucide-react/dynamic` để tự động load icon dựa trên tên từ API:

```typescript
import { DynamicIcon, IconName, iconNames } from 'lucide-react/dynamic';

function getIconComponent(iconName?: string) {
  return function DynamicIconComponent({ className, style }) {
    const trimmedIconName = iconName?.trim() as IconName | undefined;

    if (trimmedIconName && iconNames.includes(trimmedIconName)) {
      return <DynamicIcon name={trimmedIconName} className={className} style={style} />;
    }

    return <File className={className} style={style} />; // Fallback
  };
}
```

**Lợi ích:**

- ✅ Tự động load icon từ tên string
- ✅ Không cần hardcode mapping
- ✅ Hỗ trợ tất cả icon từ Lucide React
- ✅ Fallback icon nếu không tìm thấy

### Icon Color Support

Icons sẽ hiển thị màu từ API response:

```typescript
interface ApiMenuItem {
  icon?: string; // 'layout-dashboard', 'circle-user-round', etc.
  iconColor?: string; // '#F59E0B', '#111827', '#EF4444', etc.
}
```

## Cách sử dụng

### 1. Sử dụng useMenus Hook

```tsx
import { useMenus } from "../hooks/useMenus";

function MyComponent() {
  const { data: menus, isLoading, error, refetch } = useMenus("admin"); // role optional

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {menus?.map((menu) => (
        <div key={menu.id}>{menu.label}</div>
      ))}
    </div>
  );
}
```

### 2. Test API

```typescript
import { testGetMenus, testCreateMenu } from "./lib/menu-api-test";

// Test trong browser console
testGetMenus();
testCreateMenu();
```

## Cấu hình

### Base URL

Mặc định: `http://localhost:8000/api/v1`

Có thể thay đổi trong `MenuApiClient` constructor:

```typescript
class MenuApiClient extends BaseApiClient {
  constructor() {
    super("https://your-api.com/api/v1"); // Custom base URL
  }
}
```

### Query Options

- **staleTime**: 5 phút (data được cache 5 phút)
- **retry**: 3 lần retry
- **retryDelay**: Exponential backoff (1s, 2s, 4s, max 30s)

## Error Handling

### Network Errors

- Tự động retry 3 lần
- Hiển thị error message trong sidebar
- Retry button để thử lại

### API Errors

- HTTP status codes được xử lý
- Error message từ server
- Fallback error message

## Development

### Chạy Shell App

```bash
cd arda-mfe/apps/shell
pnpm dev
```

### Test API

```bash
# Đảm bảo admin-service đang chạy
cd arda-mfe
docker-compose up admin-service

# Test trong browser
# Mở DevTools Console và chạy:
import { testGetMenus } from './lib/menu-api-test';
testGetMenus();
```

## Troubleshooting

### Menu không load

1. Kiểm tra admin-service có đang chạy không
2. Kiểm tra network tab trong DevTools
3. Kiểm tra console logs

### Icons không hiển thị

1. Kiểm tra icon name trong API response
2. Thêm icon mới vào iconMap nếu cần

### Error states

1. Kiểm tra API endpoint có đúng không
2. Kiểm tra CORS settings
3. Sử dụng retry button để thử lại
