import {
  Globe,
  Folder,
  FolderOpen,
  File,
  Eye,
  Edit,
  Trash2,
  Plus,
  ArrowUpDown,
} from "lucide-react";
import TreeView, { TreeViewItem } from "@workspace/ui/components/tree-view";
import { useQuery } from "@tanstack/react-query";
import { menuApiClient } from "../utils/menu-api";
import { useMemo, useState } from "react";
import { DynamicIcon, IconName, iconNames } from "lucide-react/dynamic";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog";
import { Button } from "@workspace/ui/components/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table";
import {
  Sortable,
  SortableContent,
  SortableItem,
  SortableItemHandle,
  SortableOverlay,
} from "@workspace/ui/components/sortable";
import { GripVertical } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { MenuDetails } from "./MenuDetails";

// Map backend menu tree (id, label, icon, type, children) to TreeViewItem[]
function mapMenusToTreeViewItems(items: any[] | undefined): TreeViewItem[] {
  if (!items) return [];
  const mapOne = (m: any): TreeViewItem => {
    const children = Array.isArray(m.children) ? m.children.map(mapOne) : [];
    const node: any = {
      id: String(m.id),
      name: m.label,
      type: (m.type || (children.length ? "folder" : "file"))
        .toString()
        .toLowerCase(),
      children,
      icon: m.icon, // extra field used by getIcon
    };
    return node as TreeViewItem;
  };
  return items.map(mapOne);
}

const customIconMap: Record<string, React.ReactNode> = {
  region: <Globe className="h-4 w-4 text-purple-500" />,
  store: <Folder className="h-4 w-4 text-blue-500" />,
  department: <FolderOpen className="h-4 w-4 text-green-500" />,
  item: <File className="h-4 w-4 text-orange-500" />,
  folder: <Folder className="h-4 w-4 text-primary/80" />,
};

// Menu items sẽ được tạo trong component với các callback

export function MenuTreeManager() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["menus-tree"],
    queryFn: () => menuApiClient.getMenusTree(),
  });

  const treeData = useMemo(
    () => mapMenusToTreeViewItems(data as any[]),
    [data]
  );

  const idToMenu = useMemo(() => {
    const map = new Map<string, any>();
    const walk = (items: any[]) => {
      items?.forEach((m) => {
        map.set(String(m.id), m);
        if (Array.isArray(m.children)) walk(m.children);
      });
    };
    walk((data as any[]) || []);
    return map;
  }, [data]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMenu, setDialogMenu] = useState<any>(null);
  const [dialogMode, setDialogMode] = useState<"view" | "edit">("view");
  const [dialogParentMenu, setDialogParentMenu] = useState<any>(null);

  const parentMap = useMemo(() => {
    const map = new Map<string, any | null>();
    const walk = (items: any[], parent: any | null) => {
      items?.forEach((m) => {
        map.set(String(m.id), parent);
        if (Array.isArray(m.children)) walk(m.children, m);
      });
    };
    walk((data as any[]) || [], null);
    return map;
  }, [data]);

  const queryClient = useQueryClient();
  const reorderMutation = useMutation({
    mutationFn: async (params: {
      items: Array<{ id: number; parentId: number | null; orderIndex: number }>;
    }) => menuApiClient.reorderMenus(params.items),
    onSuccess: () => {
      toast.success("Đã cập nhật thứ tự");
      queryClient.invalidateQueries({ queryKey: ["menus-tree"] });
      setReorderOpen(false);
    },
    onError: (e: any) => toast.error(e?.message || "Cập nhật thứ tự thất bại"),
  });

  const [reorderOpen, setReorderOpen] = useState(false);
  const [reorderParentId, setReorderParentId] = useState<number | null>(null);
  const [reorderItems, setReorderItems] = useState<
    Array<{ id: string; label: string; path?: string }>
  >([]);

  const handleViewMenu = (menu: any) => {
    setDialogMenu(menu);
    setDialogMode("view");
    setDialogOpen(true);
  };

  const handleEditMenu = (menu: any) => {
    setDialogMenu(menu);
    setDialogMode("edit");
    setDialogOpen(true);
  };

  const handleDeleteMenu = (menu: any) => {
    if (confirm(`Xóa menu "${menu.label}"?`)) {
      // TODO: Implement delete API
      console.log("Delete menu:", menu);
    }
  };

  const handleAddSubMenu = (menu: any) => {
    // Open details dialog for creating a submenu, pre-filling parent info
    setDialogParentMenu(menu);
    setDialogMenu({
      label: "",
      path: "",
      icon: undefined,
      iconColor: undefined,
      orderIndex: 0,
      type: "",
    });
    setDialogMode("edit");
    setDialogOpen(true);
  };

  const handleReorder = (menu: any) => {
    const parent = parentMap.get(String(menu.id));
    const siblings: any[] = parent
      ? parent.children || []
      : (data as any[]) || [];
    const prepared = siblings.map((m) => ({
      id: String(m.id),
      label: m.label,
      path: m.path,
    }));
    setReorderParentId(parent ? Number(parent.id) : null);
    setReorderItems(prepared);
    setReorderOpen(true);
  };

  const getIcon = (item: TreeViewItem) => {
    const anyItem = item as unknown as { icon?: string; type?: string };
    const iconName = anyItem.icon?.trim() as IconName | undefined;
    if (iconName && (iconNames as readonly string[]).includes(iconName)) {
      return <DynamicIcon name={iconName} className="h-4 w-4" />;
    }
    return customIconMap[anyItem.type || "item"] || customIconMap.item;
  };

  const menuItems = useMemo(() => {
    const items = [] as any[];

    items.push({
      id: "view",
      label: "Xem",
      icon: <Eye className="h-4 w-4 text-blue-500" />,
      action: (item: TreeViewItem) => {
        const menu = idToMenu.get(item.id);
        if (menu) handleViewMenu(menu);
      },
    });

    items.push({
      id: "edit",
      label: "Sửa",
      icon: <Edit className="h-4 w-4 text-purple-500" />,
      action: (item: TreeViewItem) => {
        const menu = idToMenu.get(item.id);
        if (menu) handleEditMenu(menu);
      },
    });

    items.push({
      id: "add-submenu",
      label: "Thêm menu con",
      icon: <Plus className="h-4 w-4 text-green-500" />,
      action: (item: TreeViewItem) => {
        const menu = idToMenu.get(item.id);
        if (menu) handleAddSubMenu(menu);
      },
    });

    items.push({
      id: "reorder",
      label: "Thay đổi vị trí",
      icon: <ArrowUpDown className="h-4 w-4 text-amber-600" />,
      action: (item: TreeViewItem) => {
        const menu = idToMenu.get(item.id);
        if (menu) handleReorder(menu);
      },
    });

    items.push({
      id: "delete",
      label: "Xóa",
      icon: <Trash2 className="h-4 w-4 text-red-500" />,
      action: (item: TreeViewItem) => {
        const menu = idToMenu.get(item.id);
        if (menu) handleDeleteMenu(menu);
      },
    });

    return items;
  }, [idToMenu]);

  if (isLoading)
    return (
      <div className="p-2 text-sm text-muted-foreground">Loading menus...</div>
    );
  if (isError)
    return <div className="p-2 text-sm text-red-600">Failed to load menus</div>;

  return (
    <>
      <TreeView
        data={treeData}
        title="Cấu hình menu"
        showCheckboxes={false}
        iconMap={customIconMap}
        getIcon={getIcon}
        disableClickAwayClear
        menuItems={menuItems}
      />

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="min-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {dialogMode === "view" ? "Xem chi tiết menu" : "Chỉnh sửa menu"}
            </DialogTitle>
          </DialogHeader>
          {dialogMenu && (
            <MenuDetails
              menu={dialogMenu}
              mode={dialogMode}
              parentMenu={dialogParentMenu}
              onClose={() => setDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={reorderOpen} onOpenChange={setReorderOpen}>
        <DialogContent className="min-w-2xl">
          <DialogHeader>
            <DialogTitle>Sắp xếp vị trí</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <Sortable
              value={reorderItems}
              onValueChange={setReorderItems}
              getItemValue={(item) => item.id}
            >
              <Table className="rounded-none border">
                <TableHeader>
                  <TableRow className="bg-accent/50">
                    <TableHead className="w-[50px] bg-transparent" />
                    <TableHead className="bg-transparent">Menu</TableHead>
                    <TableHead className="bg-transparent">Đường dẫn</TableHead>
                  </TableRow>
                </TableHeader>
                <SortableContent asChild>
                  <TableBody>
                    {reorderItems.map((it) => (
                      <SortableItem key={it.id} value={it.id} asChild>
                        <TableRow>
                          <TableCell className="w-[50px]">
                            <SortableItemHandle asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="size-8"
                              >
                                <GripVertical className="h-4 w-4" />
                              </Button>
                            </SortableItemHandle>
                          </TableCell>
                          <TableCell className="font-medium">
                            {it.label}
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {it.path || "-"}
                          </TableCell>
                        </TableRow>
                      </SortableItem>
                    ))}
                  </TableBody>
                </SortableContent>
              </Table>
              <SortableOverlay>
                <div className="size-full rounded-none bg-primary/10" />
              </SortableOverlay>
            </Sortable>

            <div className="flex justify-end gap-2">
              <Button
                variant="secondary"
                onClick={() => setReorderOpen(false)}
                disabled={reorderMutation.isPending}
              >
                Hủy
              </Button>
              <Button
                onClick={() => {
                  const items = reorderItems.map((it, idx) => ({
                    id: Number(it.id),
                    parentId: reorderParentId,
                    orderIndex: idx + 1,
                  }));
                  reorderMutation.mutate({ items });
                }}
                disabled={reorderMutation.isPending}
              >
                Lưu
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
