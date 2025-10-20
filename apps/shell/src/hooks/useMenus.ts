import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { ApiMenuItem, MenuItem } from '../types';
import { BaseApiClient } from '@workspace/shared/lib/base-api-client';
import { getIconComponent } from '@workspace/ui/lib/utils';

class MenuApiClient extends BaseApiClient {
  async getMenus(role?: string): Promise<ApiMenuItem[]> {
    return this.get<ApiMenuItem[]>('/menus', role ? { role } : undefined);
  }
}

const menuApiClient = new MenuApiClient();

// Cache for icon components to prevent re-creation on every render
const iconCache = new Map<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>>();

// Cache for entire MenuItem objects to prevent re-creation
const menuItemCache = new Map<string, MenuItem>();

// Create a cache key for API menu item
const createApiMenuCacheKey = (apiMenu: ApiMenuItem): string => {
  const childrenKey = apiMenu.children?.map(child => createApiMenuCacheKey(child)).join(',') || '';
  return `${apiMenu.id}-${apiMenu.label}-${apiMenu.icon}-${apiMenu.iconColor}-${apiMenu.path}-${childrenKey}`;
};

// Convert API menu item to client menu item with memoized icons and objects
const mapApiMenuToClient = (apiMenu: ApiMenuItem): MenuItem => {
  const cacheKey = createApiMenuCacheKey(apiMenu);

  // Check if we already have this menu item cached
  const cachedMenuItem = menuItemCache.get(cacheKey);
  if (cachedMenuItem) {
    return cachedMenuItem;
  }

  // Create a cache key for the icon
  const iconKey = `${apiMenu.icon || 'default'}-${apiMenu.iconColor || 'default'}`;

  // Get or create the icon component
  let iconComponent = iconCache.get(iconKey);
  if (!iconComponent) {
    iconComponent = getIconComponent({
      iconName: apiMenu.icon,
      iconColor: apiMenu.iconColor,
      defaultClassName: "h-4 w-4"
    });
    iconCache.set(iconKey, iconComponent);
  }

  const menuItem: MenuItem = {
    id: apiMenu.id.toString(),
    label: apiMenu.label,
    icon: iconComponent,
    path: apiMenu.path || '#',
    iconColor: apiMenu.iconColor,
    children: apiMenu.children?.map(mapApiMenuToClient),
  };

  // Cache the menu item
  menuItemCache.set(cacheKey, menuItem);
  return menuItem;
};

export function useMenus(role?: string) {
  return useQuery({
    queryKey: ['menus', role],
    queryFn: () => menuApiClient.getMenus(role),
    // React 19 can handle this automatically, but the caching is still important
    select: (data: ApiMenuItem[]) => {
      // Cache prevents re-creation of menu objects and icon components
      return data.map(mapApiMenuToClient);
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 1000 * 60 * 60 * 24, // 24 hours - same as persistence maxAge
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    // Enable persistence for menu data
    meta: {
      persist: true,
    },
  });
}