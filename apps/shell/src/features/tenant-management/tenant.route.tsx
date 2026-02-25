import React from "react";
import { RouteObject } from "react-router-dom";
import { TenantListPage } from "./pages/TenantListPage";

export const tenantRoutes: RouteObject[] = [
  {
    path: "/tenants",
    element: <TenantListPage />,
  },
];
