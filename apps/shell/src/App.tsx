import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import {
  SidebarInset,
  SidebarProvider,
} from "@workspace/ui/components/sidebar";
import { QueryProvider } from "@workspace/shared/query";
import { AuthProvider, useAuth } from "@workspace/shared/auth";
import { I18nextProvider, i18n } from "@workspace/shared/i18n";
import { AppSidebar } from "./components/layout/AppSidebar";
import { AppHeader } from "./components/layout/AppHeader";
import { ShellDashboard } from "./features/dashboard/ShellDashboard";
import { NotFoundPage } from "./features/404/NotFoundPage";
import { LoginPage } from "./features/auth/LoginPage";
import { AuthCallbackPage } from "./features/auth/AuthCallbackPage";
import { IamAppWrapper } from "./components/common/RemoteApps";
import { menuRoutes } from "./features/menu/menu.route";
import { tenantRoutes } from "./features/tenant-management/tenant.route";
import "./styles/globals.css";

/**
 * Protected layout — redirects to /login if not authenticated
 */
function ProtectedLayout() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <SidebarInset>
          <AppHeader />
          <div className="flex-1 overflow-hidden">
            <div className="h-full">
              <Outlet />
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

// Hàm đệ quy để render các routes từ Config
function renderRoutes(routes: any[]) {
  return routes.map((route, index) => {
    if (route.children) {
      return (
        <Route key={index} path={route.path} element={route.element}>
          {renderRoutes(route.children)}
        </Route>
      );
    }
    return <Route key={index} path={route.path} element={route.element} />;
  });
}

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <QueryProvider>
        <AuthProvider>
          <BrowserRouter basename="/">
            <Routes>
              {/* Public auth routes — no sidebar/header */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/auth/callback" element={<AuthCallbackPage />} />

              {/* Protected routes — with sidebar/header */}
              <Route element={<ProtectedLayout />}>
                <Route path="/" element={<ShellDashboard />} />
                {renderRoutes(menuRoutes)}
                {renderRoutes(tenantRoutes)}
                <Route path="/iam/*" element={<IamAppWrapper />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </QueryProvider>
    </I18nextProvider>
  );
}

export default App;
