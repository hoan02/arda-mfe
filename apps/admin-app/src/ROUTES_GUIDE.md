# Routes Management

## Cách thêm routes cho một feature mới

Khi tạo một feature mới, bạn chỉ cần làm 2 bước:

### 1. Tạo file route trong feature của bạn

Ví dụ: `src/features/your-feature/your-feature.route.tsx`

```tsx
import { RouteObject } from "react-router-dom";
import { YourFeaturePage } from "./pages/YourFeaturePage";

export const yourFeatureRoutes: RouteObject[] = [
  {
    path: "/your-feature",
    element: <YourFeaturePage />,
  },
  // Có thể thêm nhiều routes khác nếu cần
  {
    path: "/your-feature/:id",
    element: <YourFeatureDetailPage />,
  },
];
```

### 2. Import vào file routes.tsx

Mở file `src/routes.tsx` và thêm import:

```tsx
import { yourFeatureRoutes } from "./features/your-feature/your-feature.route";

export const allRoutes: RouteObject[] = [
  ...homeRoutes,
  ...menuRoutes,
  ...yourFeatureRoutes, // Thêm dòng này
];
```

**Lưu ý:** Bạn KHÔNG cần phải sửa file `App.tsx` nữa!

## Cấu trúc hiện tại

```
src/
├── routes.tsx             # Tổng hợp tất cả routes (file duy nhất)
├── features/
│   ├── _home/
│   │   └── home.route.tsx # Routes cho trang home
│   ├── menu/
│   │   └── menu.route.tsx # Routes cho menu feature
│   └── [feature-name]/
│       └── [feature-name].route.tsx
└── App.tsx                # Không cần sửa file này khi thêm routes mới
```

## Lợi ích

- ✅ Mỗi feature tự quản lý routes của mình
- ✅ Không cần sửa App.tsx khi thêm feature mới
- ✅ Dễ dàng tìm kiếm và maintain
- ✅ Tự động tổng hợp tất cả routes
- ✅ Cấu trúc đơn giản hơn với file routes.tsx ở ngoài
