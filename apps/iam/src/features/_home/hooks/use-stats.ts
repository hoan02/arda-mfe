import { useQuery } from "@tanstack/react-query";
import { statsApi } from "../services/stats-api";

export const statsKeys = {
  all: ["iam", "stats"] as const,
};

export function useIamStats() {
  return useQuery({
    queryKey: statsKeys.all,
    queryFn: () => statsApi.getStats(),
    refetchInterval: 60000, // Auto-refresh every 60s
  });
}
