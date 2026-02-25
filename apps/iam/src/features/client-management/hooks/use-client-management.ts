import { useQuery } from "@tanstack/react-query";
import { clientApi } from "../services/client-api";

export const clientKeys = {
  all: ["iam", "clients"] as const,
  list: () => ["iam", "clients", "list"] as const,
  detail: (id: string) => ["iam", "clients", "detail", id] as const,
};

export function useClients() {
  return useQuery({
    queryKey: clientKeys.list(),
    queryFn: () => clientApi.listClients(),
  });
}

export function useClient(id: string | null) {
  return useQuery({
    queryKey: clientKeys.detail(id!),
    queryFn: () => clientApi.getClient(id!),
    enabled: !!id,
  });
}
