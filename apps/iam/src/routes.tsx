import { RouteObject } from "react-router-dom";
import { IamDashboard } from "./features/_home/pages/IamDashboard";
import { UserListPage } from "./features/user-management/pages/UserListPage";
import { RoleListPage } from "./features/role-management/pages/RoleListPage";
import { GroupListPage } from "./features/group-management/pages/GroupListPage";
import { ClientListPage } from "./features/client-management/pages/ClientListPage";
import { SessionListPage } from "./features/session-management/pages/SessionListPage";
import { PermissionListPage } from "./features/permission-management/pages/PermissionListPage";

export const allRoutes: RouteObject[] = [
  { path: "/", element: <IamDashboard /> },
  { path: "/users", element: <UserListPage /> },
  { path: "/roles", element: <RoleListPage /> },
  { path: "/groups", element: <GroupListPage /> },
  { path: "/clients", element: <ClientListPage /> },
  { path: "/sessions", element: <SessionListPage /> },
  { path: "/permissions", element: <PermissionListPage /> },
];
