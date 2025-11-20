import React from "react";
import { useLocation, Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@workspace/ui/components/breadcrumb";
import { Home } from "lucide-react";
import { useMenus } from "../../hooks/useMenus";

interface BreadcrumbItem {
  label: string;
  path?: string;
}

export function BreadcrumbNav() {
  const location = useLocation();
  const { data: menus } = useMenus();

  // Generate breadcrumb items based on menu data
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const breadcrumbs: BreadcrumbItem[] = [{ label: "Home", path: "/" }];

    if (!menus) return breadcrumbs;

    // Find menu items that match the current path
    const findMenuPath = (items: any[], currentPath: string): any[] => {
      for (const item of items) {
        // Check if current item matches the path exactly
        if (item.path === currentPath) {
          return [item];
        }

        // Check children recursively
        if (item.children) {
          const childPath = findMenuPath(item.children, currentPath);
          if (childPath.length > 0) {
            return [item, ...childPath];
          }
        }
      }
      return [];
    };

    const menuPath = findMenuPath(menus, location.pathname);

    // Add menu items to breadcrumbs
    menuPath.forEach((item, index) => {
      const isLast = index === menuPath.length - 1;
      breadcrumbs.push({
        label: item.label,
        path: isLast ? undefined : item.path,
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((item, index) => (
          <React.Fragment key={index}>
            <BreadcrumbItem>
              {item.path ? (
                <BreadcrumbLink asChild>
                  <Link to={item.path}>
                    {index === 0 && <Home className="h-4 w-4" />}
                    <span className={index === 0 ? "sr-only" : ""}>
                      {item.label}
                    </span>
                  </Link>
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
            {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
