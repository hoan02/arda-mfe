import { useQuery } from "@tanstack/react-query";
import { permissionApi } from "../services/permission-api";

export const permissionKeys = {
  all: ["iam", "permissions"] as const,
  list: () => ["iam", "permissions", "list"] as const,
  byResource: () => ["iam", "permissions", "by-resource"] as const,
  resources: () => ["iam", "permissions", "resources"] as const,
};

export function usePermissions() {
  return useQuery({
    queryKey: permissionKeys.list(),
    queryFn: () => permissionApi.listPermissions(),
  });
}

export function usePermissionsByResource() {
  return useQuery({
    queryKey: permissionKeys.byResource(),
    queryFn: () => permissionApi.getPermissionsByResource(),
  });
}

export function useResources() {
  return useQuery({
    queryKey: permissionKeys.resources(),
    queryFn: () => permissionApi.getResources(),
  });
}
