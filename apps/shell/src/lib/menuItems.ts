import { MenuItem } from '../types';
import { Home, Settings, Users, BarChart3, Database, FileText, Layers, Tag } from 'lucide-react';

export const menuItems: MenuItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: Home,
    path: "/",
  },
  {
    id: "admin",
    label: "Admin",
    icon: Settings,
    path: "/admin",
    children: [
      {
        id: "admin-dashboard",
        label: "Admin Dashboard",
        icon: BarChart3,
        path: "/admin",
      },
      {
        id: "admin-users",
        label: "User Management",
        icon: Users,
        path: "/admin/users",
      },
      {
        id: "admin-settings",
        label: "Admin Settings",
        icon: Settings,
        path: "/admin/settings",
      },
    ],
  },
  {
    id: "data-governance",
    label: "Data Governance",
    icon: Database,
    path: "/data-governance",
    children: [
      {
        id: "data-governance-dashboard",
        label: "Data Governance Dashboard",
        icon: BarChart3,
        path: "/data-governance",
      },
      {
        id: "reference-data",
        label: "Reference Data",
        icon: FileText,
        path: "/data-governance/reference-data",
      },
      {
        id: "master-data",
        label: "Master Data",
        icon: Database,
        path: "/data-governance/master-data",
      },
      {
        id: "data-model",
        label: "Data Model",
        icon: Layers,
        path: "/data-governance/data-model",
      },
      {
        id: "data-type",
        label: "Data Type",
        icon: Tag,
        path: "/data-governance/data-type",
      },
    ],
  },
];
