import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster as HotToaster } from "react-hot-toast";
import { QueryProvider } from "@workspace/shared/providers";
import { RouterAdapter } from "./providers/RouterAdapter";
import { AdminDashboard } from "./features/dashboard/AdminDashboard";
import { UsersManagement } from "./features/users/UsersManagement";
import { Settings } from "./features/settings/Settings";
import MenuPage from "./features/menu/MenuPage";
import "./index.css";
import { UsersTableExample } from "./components/examples";
import { NuqsAdapter } from "nuqs/adapters/react-router/v6";

function App() {
  return (
    <QueryProvider>
      <BrowserRouter basename="/admin">
        <NuqsAdapter>
          <RouterAdapter>
            <div className="h-full bg-gray-50 flex flex-col">
              <main className="flex-1 overflow-auto p-2">
                <Routes>
                  <Route path="/" element={<AdminDashboard />} />
                  <Route path="/users" element={<UsersManagement />} />
                  <Route path="/menus" element={<MenuPage />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route
                    path="/examples/users-table"
                    element={<UsersTableExample />}
                  />
                </Routes>
              </main>
              <HotToaster position="top-right" />
            </div>
          </RouterAdapter>
        </NuqsAdapter>
      </BrowserRouter>
    </QueryProvider>
  );
}

export default App;
