import { RouteObject } from "react-router-dom";
import { placeholderRoutes } from "./features/placeholder/placeholder.route";

// Tự động tổng hợp tất cả routes từ các features
export const allRoutes: RouteObject[] = [...placeholderRoutes];
