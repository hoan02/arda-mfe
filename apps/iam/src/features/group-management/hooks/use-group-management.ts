import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { groupApi } from "../services/group-api";
import { CreateGroupRequest } from "../types/group.types";
import toast from "react-hot-toast";

export const groupKeys = {
  all: ["iam", "groups"] as const,
  list: () => ["iam", "groups", "list"] as const,
  detail: (id: string) => ["iam", "groups", "detail", id] as const,
  members: (id: string) => ["iam", "groups", "detail", id, "members"] as const,
};

export function useGroups() {
  return useQuery({
    queryKey: groupKeys.list(),
    queryFn: () => groupApi.listGroups(),
  });
}

export function useGroup(id: string | null) {
  return useQuery({
    queryKey: groupKeys.detail(id!),
    queryFn: () => groupApi.getGroup(id!),
    enabled: !!id,
  });
}

export function useCreateGroup() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (req: CreateGroupRequest) => groupApi.createGroup(req),
    onSuccess: () => {
      toast.success("Tạo nhóm thành công");
      qc.invalidateQueries({ queryKey: groupKeys.all });
      qc.invalidateQueries({ queryKey: ["iam", "stats"] });
    },
    onError: (e: any) => toast.error(e?.message || "Không thể tạo nhóm"),
  });
}

export function useDeleteGroup() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => groupApi.deleteGroup(id),
    onSuccess: () => {
      toast.success("Đã xóa nhóm");
      qc.invalidateQueries({ queryKey: groupKeys.all });
      qc.invalidateQueries({ queryKey: ["iam", "stats"] });
    },
    onError: () => toast.error("Không thể xóa nhóm"),
  });
}

export function useGroupMembers(groupId: string | null) {
  return useQuery({
    queryKey: groupKeys.members(groupId!),
    queryFn: () => groupApi.getGroupMembers(groupId!),
    enabled: !!groupId,
  });
}

export function useAddGroupMember() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ groupId, userId }: { groupId: string; userId: string }) =>
      groupApi.addGroupMember(groupId, userId),
    onSuccess: (_, v) => {
      toast.success("Thêm thành viên thành công");
      qc.invalidateQueries({ queryKey: groupKeys.members(v.groupId) });
    },
    onError: () => toast.error("Không thể thêm thành viên"),
  });
}

export function useRemoveGroupMember() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ groupId, userId }: { groupId: string; userId: string }) =>
      groupApi.removeGroupMember(groupId, userId),
    onSuccess: (_, v) => {
      toast.success("Gỡ thành viên thành công");
      qc.invalidateQueries({ queryKey: groupKeys.members(v.groupId) });
    },
    onError: () => toast.error("Không thể gỡ thành viên"),
  });
}
