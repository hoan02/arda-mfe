import { BaseApiClient } from "@workspace/shared/lib/base-api-client";

export interface ApiMenuItem {
  id: string;
  parentId?: string | null;
  label: string;
  icon?: string;
  iconColor?: string;
  path?: string;
  sortOrder?: number;
  type?: string;
  children?: ApiMenuItem[];
  createdAt?: string;
  updatedAt?: string;
}

class MenuApiClient extends BaseApiClient {
  constructor() {
    super("http://localhost:9080/api/central/v1");
  }

  getMenusTree() {
    return this.get<ApiMenuItem[]>("/menus/tree");
  }
  getMenus(role?: string) {
    return this.get<ApiMenuItem[]>("/menus", role ? { role } : undefined);
  }
  createMenu(data: Partial<ApiMenuItem>) {
    return this.post<ApiMenuItem>("/menus", data);
  }
  updateMenu(id: string, data: Partial<ApiMenuItem>) {
    return this.put<ApiMenuItem>(`/menus/${id}`, data);
  }
  deleteMenu(id: string) {
    return this.delete(`/menus/${id}`);
  }

  // Expose reorder as a public API method (wraps protected patch)
  reorderMenus(items: Array<{ id: string; parentId: string | null; sortOrder: number }>) {
    return this.patch<{ success: boolean }>("/menus/reorder", items);
  }
}

export const menuApiClient = new MenuApiClient();


