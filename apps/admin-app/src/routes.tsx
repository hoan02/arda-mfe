import { RouteObject } from "react-router-dom";
import { menuRoutes } from "./features/menu/menu.route";
import { homeRoutes } from "./features/_home/home.route";

// Tự động tổng hợp tất cả routes từ các features
export const allRoutes: RouteObject[] = [
  ...homeRoutes,
  ...menuRoutes,
  // Thêm các feature routes khác ở đây khi cần
];
