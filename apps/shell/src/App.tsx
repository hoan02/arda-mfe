import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
  MemoryRouter,
} from "react-router-dom";
import { createRemoteAppComponent } from "@module-federation/bridge-react";
import { loadRemote } from "@module-federation/runtime";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarTrigger,
} from "@workspace/ui/components/sidebar";
import { Button } from "@workspace/ui/components/button";
import { Home, Settings, Users, BarChart3, ChevronRight } from "lucide-react";
import "./index.css";

// Define FallbackError component
const FallbackErrorComp = ({ error }: { error: Error }) => {
  return (
    <div className="p-8 text-center bg-white rounded-xl border border-gray-200 m-8">
      <h1 className="text-red-600 text-xl font-semibold mb-4">
        Error loading remote component
      </h1>
      <p className="text-gray-600 mb-4">{error.message}</p>
      <button
        onClick={() => window.location.reload()}
        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
      >
        Try Again
      </button>
    </div>
  );
};

// Define FallbackLoading component
const FallbackComp = (
  <div className="p-8 text-center bg-white rounded-xl border border-gray-200 m-8">
    Loading...
  </div>
);

// Use createRemoteAppComponent to create remote component
const AdminApp = createRemoteAppComponent({
  // loader is used to load remote modules
  loader: () => loadRemote("admin/export-app"),
  // fallback is used for displaying components when remote module loading fails
  fallback: FallbackErrorComp,
  // loading is used for displaying components when loading remote modules
  loading: FallbackComp,
});

// Admin App Wrapper
function AdminAppWrapper() {
  const location = useLocation();

  // Extract the admin sub-path
  const adminPath = location.pathname.replace("/admin", "") || "/";

  return (
    <div key={location.pathname}>
      <AdminApp
        basename="/admin"
        currentPath={adminPath}
        props1={"props_value"}
        props2={"another_props_value"}
      />
    </div>
  );
}

function ShellDashboard() {
  return (
    <div className="h-full bg-gray-50">
      <main className="p-8 h-full overflow-auto">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
            <p className="text-lg text-gray-600">
              Welcome to the micro-frontend shell application!
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                🚀 Module Federation
              </h3>
              <p className="text-gray-600 mb-4">
                Dynamic micro-frontend loading
              </p>
              <div className="text-2xl font-bold text-green-600">Active</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                ⚛️ React Bridge
              </h3>
              <p className="text-gray-600 mb-4">
                Cross-framework compatibility
              </p>
              <div className="text-2xl font-bold text-green-600">Enabled</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                🔄 Hot Reload
              </h3>
              <p className="text-gray-600 mb-4">Instant development feedback</p>
              <div className="text-2xl font-bold text-green-600">Running</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                📊 Performance
              </h3>
              <p className="text-gray-600 mb-4">Optimized build process</p>
              <div className="text-2xl font-bold text-green-600">Fast</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// App Sidebar Component
function AppSidebar() {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = React.useState<string[]>([]);

  const toggleExpanded = (itemId: string) => {
    setExpandedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: Home,
      path: "/",
    },
    {
      id: "admin",
      label: "Admin",
      icon: Settings,
      path: "/admin",
      children: [
        {
          id: "admin-dashboard",
          label: "Admin Dashboard",
          icon: BarChart3,
          path: "/admin",
        },
        {
          id: "admin-users",
          label: "User Management",
          icon: Users,
          path: "/admin/users",
        },
        {
          id: "admin-settings",
          label: "Admin Settings",
          icon: Settings,
          path: "/admin/settings",
        },
      ],
    },
  ];

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Home className="h-4 w-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">Shell App</span>
            <span className="truncate text-xs text-muted-foreground">
              Micro Frontend
            </span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  {item.children ? (
                    <>
                      <SidebarMenuButton
                        onClick={() => toggleExpanded(item.id)}
                        className="w-full"
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.label}</span>
                        <ChevronRight
                          className={`ml-auto h-4 w-4 transition-transform ${
                            expandedItems.includes(item.id) ? "rotate-90" : ""
                          }`}
                        />
                      </SidebarMenuButton>
                      {expandedItems.includes(item.id) && (
                        <SidebarMenuSub>
                          {item.children.map((child) => (
                            <SidebarMenuSubItem key={child.id}>
                              <SidebarMenuSubButton
                                asChild
                                isActive={location.pathname === child.path}
                              >
                                <Link to={child.path}>
                                  <child.icon className="h-4 w-4" />
                                  <span>{child.label}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      )}
                    </>
                  ) : (
                    <SidebarMenuButton
                      asChild
                      isActive={location.pathname === item.path}
                    >
                      <Link to={item.path}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Settings className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Settings</span>
                  <span className="truncate text-xs">Account settings</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

function App() {
  return (
    <BrowserRouter basename="/">
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <AppSidebar />
          <SidebarInset>
            <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 bg-background border-b transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <div className="h-4 w-px bg-sidebar-border" />
              </div>
            </header>
            <div className="flex-1 overflow-auto">
              <div className="h-full">
                <Routes>
                  <Route path="/" Component={ShellDashboard} />
                  <Route path="/admin/*" element={<AdminAppWrapper />} />
                </Routes>
              </div>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </BrowserRouter>
  );
}

export default App;
