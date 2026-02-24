import { RouteObject } from "react-router-dom";
import { UserListPage } from "./pages/UserListPage";

export const userRoutes: RouteObject[] = [
  {
    path: "/users",
    element: <UserListPage />,
  },
];
