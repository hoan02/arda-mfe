import { useEffect, useState } from 'react';
import { ApiMenuItem, MenuItem } from '../types';
import { mapApiMenuToClient } from '../lib/menuItems';
import { BaseApiClient } from '@workspace/shared/lib/base-api-client';

class MenuApiClient extends BaseApiClient {
  async getMenus(role?: string): Promise<ApiMenuItem[]> {
    return this.get<ApiMenuItem[]>('/menus', role ? { role } : undefined);
  }
}

const menuApiClient = new MenuApiClient();

export function useMenus(role?: string) {
  const [data, setData] = useState<MenuItem[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);
    menuApiClient
      .getMenus(role)
      .then((menus) => {
        if (!mounted) return;
        setData(menus.map(mapApiMenuToClient));
      })
      .catch((e) => {
        if (!mounted) return;
        setError(typeof e === 'string' ? e : e.message || 'Failed to load menus');
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, [role]);

  return { data, loading, error };
}


