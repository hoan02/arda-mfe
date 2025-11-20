import { RouteObject } from "react-router-dom";
import { MenuPage } from "./pages/MenuPage";

export const menuRoutes: RouteObject[] = [
  {
    path: "/menus",
    element: <MenuPage />,
  },
];
