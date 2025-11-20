import React from "react";
import { useLocation, Link } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarTrigger,
} from "@workspace/ui/components/sidebar";
import {
  Settings,
  ChevronRight,
  Loader2,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { useNavigation } from "../../hooks/useNavigation";
import { useMenus } from "../../hooks/useMenus";
import { useMenuRestoring } from "../../hooks/use-menu-persistence";
import { MenuItem } from "../../types";
import { Button } from "@workspace/ui/components/button";

// Recursive menu item component to handle unlimited nesting levels
interface MenuItemComponentProps {
  item: MenuItem;
  location: ReturnType<typeof useLocation>;
  expandedItems: string[];
  toggleExpanded: (itemId: string) => void;
  isSubMenu?: boolean;
}

function MenuItemComponent({
  item,
  location,
  expandedItems,
  toggleExpanded,
  isSubMenu = false,
}: MenuItemComponentProps) {
  const hasChildren = item.children && item.children.length > 0;
  const isExpanded = expandedItems.includes(item.id);

  if (hasChildren) {
    if (isSubMenu) {
      // For sub-menu items that have children, use SidebarMenuSub for proper nesting
      return (
        <>
          <SidebarMenuSubButton
            onClick={() => toggleExpanded(item.id)}
            className="w-full"
            style={{ marginRight: 0, width: "100%" }}
          >
            <item.icon className="h-4 w-4" style={{ color: item.iconColor }} />
            <span>{item.label}</span>
            <ChevronRight
              className={`ml-auto h-4 w-4 transition-transform ${
                isExpanded ? "rotate-90" : ""
              }`}
            />
          </SidebarMenuSubButton>
          {isExpanded && (
            <SidebarMenuSub>
              {item.children!.map((child) => (
                <SidebarMenuSubItem
                  key={child.id}
                  className="mr-0"
                  style={{ marginRight: 0, width: "100%" }}
                >
                  <MenuItemComponent
                    item={child}
                    location={location}
                    expandedItems={expandedItems}
                    toggleExpanded={toggleExpanded}
                    isSubMenu={true}
                  />
                </SidebarMenuSubItem>
              ))}
            </SidebarMenuSub>
          )}
        </>
      );
    } else {
      // For top-level menu items with children
      return (
        <>
          <SidebarMenuButton
            onClick={() => toggleExpanded(item.id)}
            className="w-full"
          >
            <item.icon className="h-4 w-4" style={{ color: item.iconColor }} />
            <span>{item.label}</span>
            <ChevronRight
              className={`ml-auto h-4 w-4 transition-transform ${
                isExpanded ? "rotate-90" : ""
              }`}
            />
          </SidebarMenuButton>
          {isExpanded && (
            <SidebarMenuSub>
              {item.children!.map((child) => (
                <SidebarMenuSubItem
                  key={child.id}
                  className="mr-0"
                  style={{ marginRight: 0, width: "100%" }}
                >
                  <MenuItemComponent
                    item={child}
                    location={location}
                    expandedItems={expandedItems}
                    toggleExpanded={toggleExpanded}
                    isSubMenu={true}
                  />
                </SidebarMenuSubItem>
              ))}
            </SidebarMenuSub>
          )}
        </>
      );
    }
  }

  // Leaf node - no children
  if (isSubMenu) {
    return (
      <SidebarMenuSubButton
        asChild
        isActive={location.pathname === item.path}
        className="w-full"
        style={{ marginRight: 0, width: "100%" }}
      >
        <Link to={item.path}>
          <item.icon className="h-4 w-4" style={{ color: item.iconColor }} />
          <span>{item.label}</span>
        </Link>
      </SidebarMenuSubButton>
    );
  } else {
    return (
      <SidebarMenuButton asChild isActive={location.pathname === item.path}>
        <Link to={item.path}>
          <item.icon className="h-4 w-4" style={{ color: item.iconColor }} />
          <span>{item.label}</span>
        </Link>
      </SidebarMenuButton>
    );
  }
}

export function AppSidebar() {
  const location = useLocation();
  const { expandedItems, toggleExpanded } = useNavigation();
  const isRestoring = useMenuRestoring();
  const {
    data: dynamicMenus,
    isLoading,
    error,
    refetch,
    isRefetching,
  } = useMenus();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Settings className="h-4 w-4" />
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
              {isLoading || isRestoring ? (
                <SidebarMenuItem>
                  <SidebarMenuButton disabled className="w-full">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>
                      {isRestoring ? "Restoring menus..." : "Loading menus..."}
                    </span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ) : error ? (
                <SidebarMenuItem>
                  <SidebarMenuButton disabled className="w-full">
                    <AlertCircle className="h-4 w-4 text-destructive" />
                    <span className="text-destructive">
                      Failed to load menus
                    </span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => refetch()}
                      disabled={isRefetching}
                      className="ml-auto h-6 w-6 p-0"
                    >
                      {isRefetching ? (
                        <Loader2 className="h-3 w-3 animate-spin" />
                      ) : (
                        <RefreshCw className="h-3 w-3" />
                      )}
                    </Button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ) : (
                (dynamicMenus || []).map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <MenuItemComponent
                      item={item}
                      location={location}
                      expandedItems={expandedItems}
                      toggleExpanded={toggleExpanded}
                    />
                  </SidebarMenuItem>
                ))
              )}
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
