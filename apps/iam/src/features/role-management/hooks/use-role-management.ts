import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { roleApi } from "../services/role-api";
import { CreateRoleRequest, UpdateRoleRequest } from "../types/role.types";
import toast from "react-hot-toast";

export const roleKeys = {
  all: ["iam", "roles"] as const,
  list: () => ["iam", "roles", "list"] as const,
  detail: (id: string) => ["iam", "roles", "detail", id] as const,
  users: (id: string) => ["iam", "roles", "detail", id, "users"] as const,
};

export function useRoles() {
  return useQuery({
    queryKey: roleKeys.list(),
    queryFn: () => roleApi.listRoles(),
  });
}

export function useRole(id: string | null) {
  return useQuery({
    queryKey: roleKeys.detail(id!),
    queryFn: () => roleApi.getRole(id!),
    enabled: !!id,
  });
}

export function useCreateRole() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (req: CreateRoleRequest) => roleApi.createRole(req),
    onSuccess: () => {
      toast.success("Tạo vai trò thành công");
      qc.invalidateQueries({ queryKey: roleKeys.all });
      qc.invalidateQueries({ queryKey: ["iam", "stats"] });
    },
    onError: (e: any) => toast.error(e?.message || "Không thể tạo vai trò"),
  });
}

export function useUpdateRole() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, req }: { id: string; req: UpdateRoleRequest }) => roleApi.updateRole(id, req),
    onSuccess: (_, v) => {
      toast.success("Cập nhật vai trò thành công");
      qc.invalidateQueries({ queryKey: roleKeys.all });
      qc.invalidateQueries({ queryKey: roleKeys.detail(v.id) });
    },
    onError: () => toast.error("Không thể cập nhật vai trò"),
  });
}

export function useDeleteRole() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => roleApi.deleteRole(id),
    onSuccess: () => {
      toast.success("Đã xóa vai trò");
      qc.invalidateQueries({ queryKey: roleKeys.all });
      qc.invalidateQueries({ queryKey: ["iam", "stats"] });
    },
    onError: () => toast.error("Không thể xóa vai trò"),
  });
}

export function useSetRolePermissions() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ roleId, permissionIds }: { roleId: string; permissionIds: string[] }) =>
      roleApi.setRolePermissions(roleId, permissionIds),
    onSuccess: (_, v) => {
      toast.success("Cập nhật quyền thành công");
      qc.invalidateQueries({ queryKey: roleKeys.detail(v.roleId) });
    },
    onError: () => toast.error("Không thể cập nhật quyền"),
  });
}

export function useRoleUsers(roleId: string | null) {
  return useQuery({
    queryKey: roleKeys.users(roleId!),
    queryFn: () => roleApi.getRoleUsers(roleId!),
    enabled: !!roleId,
  });
}
