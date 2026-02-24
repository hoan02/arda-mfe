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
import { QueryProvider } from "@workspace/shared/providers";
import { AuthProvider, useAuth } from "@workspace/shared/contexts";
import { AppSidebar } from "./components/layout/AppSidebar";
import { AppHeader } from "./components/layout/AppHeader";
import { ShellDashboard } from "./features/dashboard/ShellDashboard";
import { NotFoundPage } from "./features/404/NotFoundPage";
import { LoginPage } from "./features/auth/LoginPage";
import { AuthCallbackPage } from "./features/auth/AuthCallbackPage";
import { IamAppWrapper } from "./components/common/RemoteApps";
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

function App() {
  return (
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
              <Route path="/iam/*" element={<IamAppWrapper />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryProvider>
  );
}

export default App;
