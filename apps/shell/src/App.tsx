import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  SidebarInset,
  SidebarProvider,
} from "@workspace/ui/components/sidebar";
import { QueryProvider } from "@workspace/shared/providers";
import { RouterAdapter } from "./providers/RouterAdapter";
import { AppSidebar } from "./components/layout/AppSidebar";
import { AppHeader } from "./components/layout/AppHeader";
import { ShellDashboard } from "./features/dashboard/ShellDashboard";
import {
  AdminAppWrapper,
  DataGovernanceAppWrapper,
} from "./components/common/RemoteApps";
import "./styles/globals.css";

function App() {
  return (
    <QueryProvider>
      <BrowserRouter basename="/">
        <RouterAdapter>
          <SidebarProvider>
            <div className="flex min-h-screen w-full">
              <AppSidebar />
              <SidebarInset>
                <AppHeader />
                <div className="flex-1 overflow-hidden">
                  <div className="h-full">
                    <Routes>
                      <Route path="/" Component={ShellDashboard} />
                      <Route path="/admin/*" element={<AdminAppWrapper />} />
                      <Route
                        path="/data-governance/*"
                        element={<DataGovernanceAppWrapper />}
                      />
                    </Routes>
                  </div>
                </div>
              </SidebarInset>
            </div>
          </SidebarProvider>
        </RouterAdapter>
      </BrowserRouter>
    </QueryProvider>
  );
}

export default App;
