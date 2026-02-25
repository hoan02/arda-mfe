import { RouteObject } from "react-router-dom";
import { homeRoutes } from "./features/_home/home.route";
import { userRoutes } from "./features/user-management/user.route";

// Tự động tổng hợp tất cả routes từ các features
export const allRoutes: RouteObject[] = [
  ...homeRoutes,
  ...userRoutes,
  // Thêm các feature routes khác ở đây khi cần
];
