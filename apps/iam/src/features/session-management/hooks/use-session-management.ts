import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { sessionApi } from "../services/session-api";
import toast from "react-hot-toast";

export const sessionKeys = {
  all: ["iam", "sessions"] as const,
  list: () => ["iam", "sessions", "list"] as const,
};

export function useSessions() {
  return useQuery({
    queryKey: sessionKeys.list(),
    queryFn: () => sessionApi.listSessions(),
    refetchInterval: 30000, // Auto-refresh every 30s
  });
}

export function useTerminateSession() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (sessionId: string) => sessionApi.terminateSession(sessionId),
    onSuccess: () => {
      toast.success("Đã kết thúc phiên");
      qc.invalidateQueries({ queryKey: sessionKeys.all });
      qc.invalidateQueries({ queryKey: ["iam", "stats"] });
    },
    onError: () => toast.error("Không thể kết thúc phiên"),
  });
}
