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
    // TODO: Implement add submenu flow
    console.log("Add submenu to:", menu);
  };

  const handleReorder = (menu: any) => {
    // TODO: Implement reorder flow
    console.log("Reorder menu:", menu);
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
        title="Tree View Demo"
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
              onClose={() => setDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
