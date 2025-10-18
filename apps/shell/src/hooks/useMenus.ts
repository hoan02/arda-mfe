import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { ApiMenuItem, MenuItem } from '../types';
import { BaseApiClient } from '@workspace/shared/lib/base-api-client';
import { File } from 'lucide-react';
import { DynamicIcon, IconName, iconNames } from 'lucide-react/dynamic';

class MenuApiClient extends BaseApiClient {
  async getMenus(role?: string): Promise<ApiMenuItem[]> {
    return this.get<ApiMenuItem[]>('/menus', role ? { role } : undefined);
  }
}

const menuApiClient = new MenuApiClient();

// Dynamic icon component function
function getIconComponent(iconName?: string) {
  return function DynamicIconComponent({ className, style }: { className?: string; style?: React.CSSProperties }) {
    const trimmedIconName = iconName?.trim() as IconName | undefined;

    if (trimmedIconName && (iconNames as readonly string[]).includes(trimmedIconName)) {
      return React.createElement(DynamicIcon, {
        name: trimmedIconName,
        className: className,
        style: style
      });
    }

    // Fallback to File icon if icon name is not found
    return React.createElement(File, {
      className: className,
      style: style
    });
  };
}

// Convert API menu item to client menu item
function mapApiMenuToClient(apiMenu: ApiMenuItem): MenuItem {
  return {
    id: apiMenu.id.toString(),
    label: apiMenu.label,
    icon: getIconComponent(apiMenu.icon),
    path: apiMenu.path || '#',
    iconColor: apiMenu.iconColor,
    children: apiMenu.children?.map(mapApiMenuToClient),
  };
}

export function useMenus(role?: string) {
  return useQuery({
    queryKey: menuApiClient.getQueryKey('/menus', role ? { role } : undefined),
    queryFn: () => menuApiClient.getMenus(role),
    select: (data: ApiMenuItem[]) => data.map(mapApiMenuToClient),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}