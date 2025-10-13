import { BaseApiClient } from "@workspace/shared/lib/base-api-client";

export interface ApiMenuItem {
  id: number;
  label: string;
  icon?: string;
  path?: string;
  orderIndex?: number;
  type?: string;
  children?: ApiMenuItem[];
}

class MenuApiClient extends BaseApiClient {
  getMenusTree() {
    return this.get<ApiMenuItem[]>("/menus/tree");
  }
  getMenus(role?: string) {
    return this.get<ApiMenuItem[]>("/menus", role ? { role } : undefined);
  }
  createMenu(data: Partial<ApiMenuItem>) {
    return this.post<number>("/menus", data);
  }
  updateMenu(id: number, data: Partial<ApiMenuItem>) {
    return this.put<void>(`/menus/${id}`, data);
  }
  deleteMenu(id: number) {
    return this.delete(`/menus/${id}`);
  }

  // Expose reorder as a public API method (wraps protected patch)
  reorderMenus(items: Array<{ id: number; parentId: number | null; orderIndex: number }>) {
    return this.patch<void>("/menus/reorder", { items });
  }
}

export const menuApiClient = new MenuApiClient();


