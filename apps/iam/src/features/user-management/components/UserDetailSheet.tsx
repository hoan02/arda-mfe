import { X, Shield, Clock, Globe } from "lucide-react";
import {
  useUserSessions,
  useAssignRole,
  useRemoveRole,
} from "../hooks/use-user-management";
import { useRoles } from "../../role-management/hooks/use-role-management";
import type { UserDto } from "../types/user.types";
import type { PermissionDto } from "../../permission-management/types/permission.types";

interface Props {
  user: UserDto | null;
  open: boolean;
  onClose: () => void;
}

export function UserDetailSheet({ user, open, onClose }: Props) {
  const { data: allRoles } = useRoles();
  const { data: sessions } = useUserSessions(open && user ? user.id : null);
  const assignRole = useAssignRole();
  const removeRole = useRemoveRole();

  if (!open || !user) return null;

  const userRoleIds = new Set(user.roles?.map((r) => r.id));
  const availableRoles = allRoles?.filter((r) => !userRoleIds.has(r.id)) ?? [];

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="relative z-50 w-full max-w-lg bg-card border-l shadow-xl overflow-y-auto animate-in slide-in-from-right">
        {/* Header */}
        <div className="sticky top-0 bg-card border-b px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
              {user.firstName?.[0]?.toUpperCase() ??
                user.email[0].toUpperCase()}
            </div>
            <div>
              <h2 className="font-semibold">{user.fullName || user.email}</h2>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-1 hover:bg-muted transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Info */}
          <section>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Thông tin
            </h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-muted-foreground">Phòng ban</span>
                <p className="font-medium">{user.department || "—"}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Trạng thái</span>
                <p>
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                      user.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {user.isActive ? "Hoạt động" : "Vô hiệu"}
                  </span>
                </p>
              </div>
              <div>
                <span className="text-muted-foreground">Keycloak ID</span>
                <p className="font-mono text-xs">{user.keycloakId}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Ngày tạo</span>
                <p className="font-medium">
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString("vi-VN")
                    : "—"}
                </p>
              </div>
            </div>
          </section>

          {/* Roles */}
          <section>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              <Shield className="inline h-4 w-4 mr-1" />
              Vai trò ({user.roles?.length ?? 0})
            </h3>
            <div className="space-y-2">
              {user.roles?.map((role) => (
                <div
                  key={role.id}
                  className="flex items-center justify-between rounded-md border px-3 py-2"
                >
                  <div>
                    <span className="font-medium text-sm">{role.name}</span>
                    {role.isSystem && (
                      <span className="ml-2 text-xs text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded">
                        System
                      </span>
                    )}
                    {role.description && (
                      <p className="text-xs text-muted-foreground">
                        {role.description}
                      </p>
                    )}
                  </div>
                  {!role.isSystem && (
                    <button
                      onClick={() =>
                        removeRole.mutate({ userId: user.id, roleId: role.id })
                      }
                      className="text-xs text-destructive hover:underline"
                    >
                      Gỡ
                    </button>
                  )}
                </div>
              ))}

              {/* Add role */}
              {availableRoles.length > 0 && (
                <select
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value=""
                  onChange={(e) => {
                    if (e.target.value)
                      assignRole.mutate({
                        userId: user.id,
                        roleId: e.target.value,
                      });
                  }}
                >
                  <option value="">+ Thêm vai trò...</option>
                  {availableRoles.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </section>

          {/* Sessions */}
          <section>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              <Clock className="inline h-4 w-4 mr-1" />
              Phiên đăng nhập ({sessions?.length ?? 0})
            </h3>
            {sessions && sessions.length > 0 ? (
              <div className="space-y-2">
                {sessions.map((session) => (
                  <div
                    key={session.id}
                    className="flex items-center justify-between rounded-md border px-3 py-2 text-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{session.ipAddress}</p>
                        <p className="text-xs text-muted-foreground">
                          Bắt đầu:{" "}
                          {new Date(session.start).toLocaleString("vi-VN")}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Không có phiên đang hoạt động
              </p>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
