import { useState } from "react";
import { Shield, Plus, Check, Trash2 } from "lucide-react";
import {
  useRoles,
  useCreateRole,
  useUpdateRole,
  useDeleteRole,
  useSetRolePermissions,
  useRoleUsers,
} from "../hooks/use-role-management";
import { usePermissionsByResource } from "../../permission-management/hooks/use-permission-management";
import type { RoleDto } from "../types/role.types";
import type { PermissionDto } from "../../permission-management/types/permission.types";

export function RoleListPage() {
  const { data: roles, isLoading } = useRoles();
  const { data: permsByResource } = usePermissionsByResource();
  const createRole = useCreateRole();
  const deleteRole = useDeleteRole();
  const setPermissions = useSetRolePermissions();

  const [selectedRole, setSelectedRole] = useState<RoleDto | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [newRoleName, setNewRoleName] = useState("");
  const [newRoleDesc, setNewRoleDesc] = useState("");

  const handleCreateRole = () => {
    if (!newRoleName.trim()) return;
    createRole.mutate(
      { name: newRoleName, description: newRoleDesc },
      {
        onSuccess: () => {
          setShowCreate(false);
          setNewRoleName("");
          setNewRoleDesc("");
        },
      },
    );
  };

  const togglePermission = (
    roleId: string,
    permissionId: string,
    currentPermissions: PermissionDto[],
  ) => {
    const currentIds = currentPermissions.map((p) => p.id);
    const newIds = currentIds.includes(permissionId)
      ? currentIds.filter((id) => id !== permissionId)
      : [...currentIds, permissionId];
    setPermissions.mutate({ roleId, permissionIds: newIds });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Quản lý Vai trò</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Định nghĩa vai trò và phân quyền chi tiết
          </p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Tạo vai trò
        </button>
      </div>

      <div className="grid grid-cols-12 gap-4">
        {/* Role List */}
        <div className="col-span-4 space-y-2">
          {isLoading ? (
            <div className="text-center py-8 text-muted-foreground">
              Đang tải...
            </div>
          ) : (
            roles?.map((role) => (
              <div
                key={role.id}
                onClick={() => setSelectedRole(role)}
                className={`rounded-lg border p-3 cursor-pointer transition-all ${
                  selectedRole?.id === role.id
                    ? "border-primary bg-primary/5 ring-1 ring-primary"
                    : "hover:bg-muted/50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-primary" />
                    <span className="font-medium text-sm">{role.name}</span>
                  </div>
                  {role.isSystem && (
                    <span className="text-xs text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded">
                      System
                    </span>
                  )}
                </div>
                {role.description && (
                  <p className="text-xs text-muted-foreground mt-1 ml-6">
                    {role.description}
                  </p>
                )}
                <div className="flex items-center justify-between mt-2 ml-6">
                  <span className="text-xs text-muted-foreground">
                    {role.permissions?.length ?? 0} quyền
                  </span>
                  {!role.isSystem && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm(`Xóa vai trò "${role.name}"?`))
                          deleteRole.mutate(role.id);
                      }}
                      className="text-destructive hover:text-destructive/80"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Permission Matrix */}
        <div className="col-span-8">
          {selectedRole ? (
            <div className="rounded-lg border bg-card">
              <div className="border-b px-4 py-3">
                <h3 className="font-semibold">
                  {selectedRole.name} — Ma trận quyền
                </h3>
              </div>
              <div className="p-4 space-y-4 max-h-[60vh] overflow-y-auto">
                {permsByResource &&
                  Object.entries(permsByResource).map(([resource, perms]) => (
                    <div key={resource}>
                      <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                        {resource}
                      </h4>
                      <div className="grid grid-cols-4 gap-2">
                        {(perms as PermissionDto[]).map((perm) => {
                          const hasPermission = selectedRole.permissions?.some(
                            (p) => p.id === perm.id,
                          );
                          return (
                            <button
                              key={perm.id}
                              onClick={() =>
                                togglePermission(
                                  selectedRole.id,
                                  perm.id,
                                  selectedRole.permissions ?? [],
                                )
                              }
                              className={`flex items-center gap-2 rounded-md border px-3 py-2 text-xs transition-all ${
                                hasPermission
                                  ? "border-green-500 bg-green-50 text-green-700"
                                  : "border-gray-200 text-gray-500 hover:border-gray-400"
                              }`}
                            >
                              <Check
                                className={`h-3.5 w-3.5 ${hasPermission ? "opacity-100" : "opacity-0"}`}
                              />
                              {perm.action}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
              <div className="text-center">
                <Shield className="h-12 w-12 mx-auto mb-2 opacity-20" />
                <p>Chọn một vai trò để xem quyền</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Create Dialog */}
      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setShowCreate(false)}
          />
          <div className="relative z-50 w-full max-w-md rounded-lg border bg-card p-6 shadow-xl">
            <h2 className="text-lg font-semibold mb-4">Tạo Vai trò mới</h2>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Tên vai trò *
                </label>
                <input
                  value={newRoleName}
                  onChange={(e) => setNewRoleName(e.target.value)}
                  className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="SALE_MANAGER"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Mô tả
                </label>
                <input
                  value={newRoleDesc}
                  onChange={(e) => setNewRoleDesc(e.target.value)}
                  className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Quản lý bán hàng"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <button
                onClick={() => setShowCreate(false)}
                className="rounded-md border px-4 py-2 text-sm hover:bg-muted"
              >
                Hủy
              </button>
              <button
                onClick={handleCreateRole}
                disabled={createRole.isPending}
                className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
              >
                {createRole.isPending ? "Đang tạo..." : "Tạo"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
