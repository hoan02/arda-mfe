import { RouteObject } from "react-router-dom";
import { menuRoutes } from "./features/menu/menu.route";
import { homeRoutes } from "./features/_home/home.route";
import { tenantRoutes } from "./features/tenant-management/tenant.route";
import { userRoutes } from "./features/user-management/user.route";

// Tự động tổng hợp tất cả routes từ các features
export const allRoutes: RouteObject[] = [
  ...homeRoutes,
  ...menuRoutes,
  ...tenantRoutes,
  ...userRoutes,
  // Thêm các feature routes khác ở đây khi cần
];
