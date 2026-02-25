import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { Toaster as HotToaster } from "react-hot-toast";
import { QueryProvider } from "@workspace/shared/query";
import { I18nextProvider, i18n } from "@workspace/shared/i18n";
import enIam from "./locales/en.json";
import viIam from "./locales/vi.json";
import { NuqsAdapter } from "nuqs/adapters/react-router/v7";
import { allRoutes } from "./routes";

// Inject 'iam' namespace translations
i18n.addResourceBundle("en", "iam", enIam, true, true);
i18n.addResourceBundle("vi", "iam", viIam, true, true);
import {
  Users,
  Shield,
  FolderTree,
  AppWindow,
  Monitor,
  Key,
  LayoutDashboard,
} from "lucide-react";
import "./styles/globals.css";

const navItems = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard },
  { path: "/users", label: "Người dùng", icon: Users },
  { path: "/roles", label: "Vai trò", icon: Shield },
  { path: "/groups", label: "Nhóm", icon: FolderTree },
  { path: "/permissions", label: "Quyền", icon: Key },
  { path: "/clients", label: "Clients", icon: AppWindow },
  { path: "/sessions", label: "Phiên", icon: Monitor },
];

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <QueryProvider>
        <BrowserRouter basename="/iam">
          <NuqsAdapter>
            <div className="h-full bg-gray-50 flex">
              {/* Sidebar */}
              <aside className="w-56 border-r bg-card flex flex-col shrink-0">
                <div className="px-4 py-3 border-b">
                  <h2 className="font-bold text-sm tracking-tight flex items-center gap-2">
                    <Shield className="h-4 w-4 text-primary" />
                    IAM Admin
                  </h2>
                </div>
                <nav className="flex-1 p-2 space-y-0.5">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        end={item.path === "/"}
                        className={({ isActive }) =>
                          `flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors ${
                            isActive
                              ? "bg-primary/10 text-primary font-medium"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground"
                          }`
                        }
                      >
                        <Icon className="h-4 w-4" />
                        {item.label}
                      </NavLink>
                    );
                  })}
                </nav>
              </aside>

              {/* Main Content */}
              <main className="flex-1 overflow-auto p-4">
                <Routes>
                  {allRoutes.map((route: any, index: number) => (
                    <Route
                      key={index}
                      path={route.path}
                      element={route.element}
                    />
                  ))}
                </Routes>
              </main>

              <HotToaster position="top-right" />
            </div>
          </NuqsAdapter>
        </BrowserRouter>
      </QueryProvider>
    </I18nextProvider>
  );
}

export default App;
