import {
  Globe,
  Folder,
  FolderOpen,
  File,
  Eye,
  Edit,
  Trash2,
  Plus,
} from "lucide-react";
import TreeView, { TreeViewItem } from "@workspace/ui/components/tree-view";
import { useQuery } from "@tanstack/react-query";
import { menuApiClient } from "../utils/menu-api";
import { useMemo } from "react";
import { DynamicIcon, IconName, iconNames } from "lucide-react/dynamic";

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

export function MenuTreeManager({
  onSelectMenu,
  onViewMenu,
  onEditMenu,
  onDeleteMenu,
  onAddSubMenu,
}: {
  onSelectMenu?: (menu: any | null) => void;
  onViewMenu?: (menu: any) => void;
  onEditMenu?: (menu: any) => void;
  onDeleteMenu?: (menu: any) => void;
  onAddSubMenu?: (menu: any) => void;
}) {
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

  const handleCheckChange = (item: TreeViewItem, checked: boolean) => {
    // no-op for now
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
    const items = [];

    if (onViewMenu) {
      items.push({
        id: "view",
        label: "Xem",
        icon: <Eye className="h-4 w-4 text-blue-500" />,
        action: (item: TreeViewItem) => {
          const menu = idToMenu.get(item.id);
          if (menu) onViewMenu(menu);
        },
      });
    }

    if (onEditMenu) {
      items.push({
        id: "edit",
        label: "Sửa",
        icon: <Edit className="h-4 w-4 text-purple-500" />,
        action: (item: TreeViewItem) => {
          const menu = idToMenu.get(item.id);
          if (menu) onEditMenu(menu);
        },
      });
    }

    if (onAddSubMenu) {
      items.push({
        id: "add-submenu",
        label: "Thêm menu con",
        icon: <Plus className="h-4 w-4 text-green-500" />,
        action: (item: TreeViewItem) => {
          const menu = idToMenu.get(item.id);
          if (menu) onAddSubMenu(menu);
        },
      });
    }

    if (onDeleteMenu) {
      items.push({
        id: "delete",
        label: "Xóa",
        icon: <Trash2 className="h-4 w-4 text-red-500" />,
        action: (item: TreeViewItem) => {
          const menu = idToMenu.get(item.id);
          if (menu) onDeleteMenu(menu);
        },
      });
    }

    return items;
  }, [onViewMenu, onEditMenu, onDeleteMenu, onAddSubMenu, idToMenu]);

  if (isLoading)
    return (
      <div className="p-2 text-sm text-muted-foreground">Loading menus...</div>
    );
  if (isError)
    return <div className="p-2 text-sm text-red-600">Failed to load menus</div>;

  return (
    <TreeView
      data={treeData}
      title="Tree View Demo"
      showCheckboxes={false}
      iconMap={customIconMap}
      getIcon={getIcon}
      onCheckChange={handleCheckChange}
      disableClickAwayClear
      menuItems={menuItems}
      onSelectionChange={(selected) => {
        if (!onSelectMenu) return;
        const first = selected?.[0];
        if (!first) return onSelectMenu(null);
        const raw = idToMenu.get(String(first.id)) || null;
        onSelectMenu(raw);
      }}
    />
  );
}
