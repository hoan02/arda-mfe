import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { userApi } from "../services/user-api";
import {
  CreateUserRequest,
  UpdateUserRequest,
  ResetPasswordRequest
} from "../types/user.types";
import toast from "react-hot-toast";

export const userKeys = {
  all: ["iam", "users"] as const,
  list: (params: any) => ["iam", "users", "list", params] as const,
  detail: (id: string) => ["iam", "users", "detail", id] as const,
  sessions: (id: string) => ["iam", "users", "detail", id, "sessions"] as const,
};

export function useUsers(params?: { page?: number; size?: number; search?: string }) {
  return useQuery({
    queryKey: userKeys.list(params),
    queryFn: () => userApi.listUsers(params),
  });
}

export function useUser(id: string | null) {
  return useQuery({
    queryKey: userKeys.detail(id!),
    queryFn: () => userApi.getUser(id!),
    enabled: !!id,
  });
}

export function useCreateUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (req: CreateUserRequest) => userApi.createUser(req),
    onSuccess: () => {
      toast.success("Tạo người dùng thành công");
      qc.invalidateQueries({ queryKey: userKeys.all });
      qc.invalidateQueries({ queryKey: ["iam", "stats"] });
    },
    onError: (e: any) => toast.error(e?.message || "Không thể tạo người dùng"),
  });
}

export function useUpdateUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, req }: { id: string; req: UpdateUserRequest }) => userApi.updateUser(id, req),
    onSuccess: (_, v) => {
      toast.success("Cập nhật thành công");
      qc.invalidateQueries({ queryKey: userKeys.all });
      qc.invalidateQueries({ queryKey: userKeys.detail(v.id) });
    },
    onError: () => toast.error("Không thể cập nhật người dùng"),
  });
}

export function useDeleteUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => userApi.deleteUser(id),
    onSuccess: () => {
      toast.success("Đã vô hiệu hóa người dùng");
      qc.invalidateQueries({ queryKey: userKeys.all });
      qc.invalidateQueries({ queryKey: ["iam", "stats"] });
    },
    onError: () => toast.error("Không thể xóa người dùng"),
  });
}

export function useResetPassword() {
  return useMutation({
    mutationFn: ({ id, req }: { id: string; req: ResetPasswordRequest }) => userApi.resetPassword(id, req),
    onSuccess: () => toast.success("Đặt lại mật khẩu thành công"),
    onError: () => toast.error("Không thể đặt lại mật khẩu"),
  });
}

export function useAssignRole() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ userId, roleId }: { userId: string; roleId: string }) => userApi.assignRole(userId, roleId),
    onSuccess: (_, v) => {
      toast.success("Gán vai trò thành công");
      qc.invalidateQueries({ queryKey: userKeys.detail(v.userId) });
    },
    onError: () => toast.error("Không thể gán vai trò"),
  });
}

export function useRemoveRole() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ userId, roleId }: { userId: string; roleId: string }) => userApi.removeRole(userId, roleId),
    onSuccess: (_, v) => {
      toast.success("Gỡ vai trò thành công");
      qc.invalidateQueries({ queryKey: userKeys.detail(v.userId) });
    },
    onError: () => toast.error("Không thể gỡ vai trò"),
  });
}

export function useUserSessions(userId: string | null) {
  return useQuery({
    queryKey: userKeys.sessions(userId!),
    queryFn: () => userApi.getUserSessions(userId!),
    enabled: !!userId,
  });
}
