import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { tenantApiClient } from "../services/tenant-api";
import type {
  CreateTenantRequest,
  UpdateTenantRequest,
} from "../types/tenant.types";
import toast from "react-hot-toast";

const TENANTS_QUERY_KEY = ["tenants"];

export function useTenants() {
  return useQuery({
    queryKey: TENANTS_QUERY_KEY,
    queryFn: () => tenantApiClient.listTenants(),
  });
}

export function useTenantDetail(tenantKey: string | null) {
  return useQuery({
    queryKey: ["tenant", tenantKey],
    queryFn: () => tenantApiClient.getTenantDetails(tenantKey!),
    enabled: !!tenantKey,
  });
}

export function useCreateTenant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: CreateTenantRequest) =>
      tenantApiClient.createTenant(request),
    onSuccess: (data) => {
      toast.success(`Tạo tenant "${data.tenantKey}" thành công`);
      queryClient.invalidateQueries({ queryKey: TENANTS_QUERY_KEY });
    },
    onError: (error: any) => {
      const message = error?.message || "Không thể tạo tenant";
      toast.error(message);
    },
  });
}

export function useUpdateTenant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      tenantKey,
      request,
    }: {
      tenantKey: string;
      request: UpdateTenantRequest;
    }) => tenantApiClient.updateTenant(tenantKey, request),
    onSuccess: (_, variables) => {
      toast.success("Cập nhật tenant thành công");
      queryClient.invalidateQueries({ queryKey: TENANTS_QUERY_KEY });
      queryClient.invalidateQueries({
        queryKey: ["tenant", variables.tenantKey],
      });
    },
    onError: () => {
      toast.error("Không thể cập nhật tenant");
    },
  });
}

export function useUpdateTenantStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      tenantKey,
      status,
    }: {
      tenantKey: string;
      status: string;
    }) => tenantApiClient.updateStatus(tenantKey, status),
    onSuccess: (_, variables) => {
      toast.success("Cập nhật trạng thái thành công");
      queryClient.invalidateQueries({ queryKey: TENANTS_QUERY_KEY });
      queryClient.invalidateQueries({
        queryKey: ["tenant", variables.tenantKey],
      });
    },
    onError: () => {
      toast.error("Không thể cập nhật trạng thái");
    },
  });
}

export function useDeleteTenant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (tenantKey: string) =>
      tenantApiClient.deleteTenant(tenantKey),
    onSuccess: () => {
      toast.success("Đã xóa tenant thành công");
      queryClient.invalidateQueries({ queryKey: TENANTS_QUERY_KEY });
    },
    onError: () => {
      toast.error("Không thể xóa tenant");
    },
  });
}
