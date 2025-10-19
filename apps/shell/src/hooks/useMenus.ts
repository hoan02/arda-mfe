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


// Convert API menu item to client menu item
function mapApiMenuToClient(apiMenu: ApiMenuItem): MenuItem {
  return {
    id: apiMenu.id.toString(),
    label: apiMenu.label,
    icon: getIconComponent({
      iconName: apiMenu.icon,
      iconColor: apiMenu.iconColor,
      defaultClassName: "h-4 w-4"
    }),
    path: apiMenu.path || '#',
    iconColor: apiMenu.iconColor,
    children: apiMenu.children?.map(mapApiMenuToClient),
  };
}

export function useMenus(role?: string) {
  return useQuery({
    queryKey: ['menus', role],
    queryFn: () => menuApiClient.getMenus(role),
    select: (data: ApiMenuItem[]) => data.map(mapApiMenuToClient),
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