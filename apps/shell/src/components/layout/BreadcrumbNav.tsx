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

interface BreadcrumbSegment {
  label: string;
  path?: string;
}

/**
 * Static fallback breadcrumbs for shell-internal routes that are NOT part of
 * the dynamic menu tree fetched from the API (e.g. admin/system routes).
 * Key must start with "/" and match `location.pathname` exactly or as a prefix.
 */
const STATIC_ROUTES: Record<string, BreadcrumbSegment[]> = {
  "/tenants": [{ label: "Quản lý Tenant" }],
  "/menus": [{ label: "Quản lý Menu" }],
};

export function BreadcrumbNav() {
  const location = useLocation();
  const { data: menus } = useMenus();

  const generateBreadcrumbs = (): BreadcrumbSegment[] => {
    const breadcrumbs: BreadcrumbSegment[] = [{ label: "Home", path: "/" }];

    // 1. Try to resolve from dynamic menu tree
    if (menus) {
      const findMenuPath = (items: any[], currentPath: string): any[] => {
        for (const item of items) {
          if (item.path === currentPath) {
            return [item];
          }
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

      if (menuPath.length > 0) {
        menuPath.forEach((item, index) => {
          const isLast = index === menuPath.length - 1;
          breadcrumbs.push({
            label: item.label,
            path: isLast ? undefined : item.path,
          });
        });
        return breadcrumbs;
      }
    }

    // 2. Fallback: exact match in static route map
    const staticSegments = STATIC_ROUTES[location.pathname];
    if (staticSegments) {
      breadcrumbs.push(...staticSegments);
      return breadcrumbs;
    }

    // 3. Fallback: prefix match for nested static routes (e.g. /tenants/123)
    const matchedPrefix = Object.keys(STATIC_ROUTES).find((prefix) =>
      location.pathname.startsWith(prefix + "/"),
    );
    if (matchedPrefix) {
      const segments = STATIC_ROUTES[matchedPrefix];
      // Add parent with link, then show sub-path as current page
      const parentSegment = segments[segments.length - 1];
      breadcrumbs.push({ ...parentSegment, path: matchedPrefix });
      // Derive sub-page label from remaining path segments
      const subPath = location.pathname.slice(matchedPrefix.length + 1);
      breadcrumbs.push({ label: decodeURIComponent(subPath) });
    }

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
