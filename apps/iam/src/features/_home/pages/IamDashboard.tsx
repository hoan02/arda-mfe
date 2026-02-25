import {
  Users,
  Shield,
  FolderTree,
  AppWindow,
  Monitor,
  Key,
  ArrowRight,
} from "lucide-react";
import { useIamStats } from "../hooks/use-stats";
import { Link } from "react-router-dom";

const statCards = [
  {
    key: "totalUsers",
    label: "Người dùng",
    icon: Users,
    color: "text-blue-600 bg-blue-100",
    linkTo: "/users",
  },
  {
    key: "totalRoles",
    label: "Vai trò",
    icon: Shield,
    color: "text-purple-600 bg-purple-100",
    linkTo: "/roles",
  },
  {
    key: "totalGroups",
    label: "Nhóm",
    icon: FolderTree,
    color: "text-green-600 bg-green-100",
    linkTo: "/groups",
  },
  {
    key: "totalClients",
    label: "Clients",
    icon: AppWindow,
    color: "text-cyan-600 bg-cyan-100",
    linkTo: "/clients",
  },
  {
    key: "activeSessions",
    label: "Phiên hoạt động",
    icon: Monitor,
    color: "text-orange-600 bg-orange-100",
    linkTo: "/sessions",
  },
  {
    key: "totalPermissions",
    label: "Quyền",
    icon: Key,
    color: "text-rose-600 bg-rose-100",
    linkTo: "/permissions",
  },
] as const;

export function IamDashboard() {
  const { data: stats, isLoading } = useIamStats();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">IAM Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Tổng quan hệ thống quản lý danh tính và truy cập
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          const value = stats ? stats[card.key] : 0;

          return (
            <Link
              key={card.key}
              to={card.linkTo}
              className="group rounded-xl border bg-card p-4 hover:shadow-md transition-all duration-200 hover:border-primary/30"
            >
              <div className="flex items-center justify-between">
                <div
                  className={`h-10 w-10 rounded-lg ${card.color} flex items-center justify-center`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="mt-3">
                <p className="text-2xl font-bold">
                  {isLoading ? (
                    <span className="inline-block h-7 w-12 animate-pulse bg-muted rounded"></span>
                  ) : (
                    value
                  )}
                </p>
                <p className="text-sm text-muted-foreground">{card.label}</p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick info */}
      {stats && (
        <div className="rounded-xl border bg-card p-4">
          <h3 className="font-semibold text-sm mb-3">Thông tin nhanh</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">
                Người dùng hoạt động
              </span>
              <span className="font-medium text-green-600">
                {stats.activeUsers} / {stats.totalUsers}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Tỷ lệ hoạt động</span>
              <span className="font-medium">
                {stats.totalUsers > 0
                  ? Math.round((stats.activeUsers / stats.totalUsers) * 100)
                  : 0}
                %
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
