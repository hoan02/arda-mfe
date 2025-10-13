import {
  Globe,
  Folder,
  FolderOpen,
  File,
  Download,
  Home,
  Settings,
  Users,
  Shield,
  List,
  Database,
  FileText,
  Layers,
  Tag,
  BarChart3,
} from "lucide-react";
import TreeView, { TreeViewItem } from "@workspace/ui/components/tree-view";
import { useQuery } from "@tanstack/react-query";
import { menuApiClient } from "../utils/menu-api";
import { useMemo } from "react";

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

const menuItems = [
  {
    id: "download",
    label: "Download",
    icon: <Download className="h-4 w-4" />,
    action: (items: TreeViewItem[]) => console.log("Downloading:", items),
  },
];

export function MenuTreeManager({
  onSelectMenu,
}: {
  onSelectMenu?: (menu: any | null) => void;
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

  // Allow per-item custom icon via item.icon (string), fallback to type-based iconMap
  const iconByName: Record<string, React.ReactNode> = {
    globe: <Globe className="h-4 w-4" />,
    folder: <Folder className="h-4 w-4" />,
    folderopen: <FolderOpen className="h-4 w-4" />,
    file: <File className="h-4 w-4" />,
    home: <Home className="h-4 w-4" />,
    dashboard: <BarChart3 className="h-4 w-4" />,
    users: <Users className="h-4 w-4" />,
    settings: <Settings className="h-4 w-4" />,
    shield: <Shield className="h-4 w-4" />,
    list: <List className="h-4 w-4" />,
    database: <Database className="h-4 w-4" />,
    filetext: <FileText className="h-4 w-4" />,
    layers: <Layers className="h-4 w-4" />,
    tag: <Tag className="h-4 w-4" />,
  };

  const getIcon = (item: TreeViewItem) => {
    const anyItem = item as unknown as { icon?: string; type?: string };
    const custom = anyItem.icon?.toLowerCase().replace(/\s+/g, "");
    if (custom && iconByName[custom]) return iconByName[custom];
    return customIconMap[anyItem.type || "item"] || customIconMap.item;
  };

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
      menuItems={menuItems}
      onCheckChange={handleCheckChange}
      disableClickAwayClear
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
