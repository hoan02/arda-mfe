import { Monitor, Globe, Trash2 } from "lucide-react";
import {
  useSessions,
  useTerminateSession,
} from "../hooks/use-session-management";

export function SessionListPage() {
  const { data: sessions, isLoading } = useSessions();
  const terminateSession = useTerminateSession();

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Phiên đăng nhập</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Quản lý các phiên đăng nhập đang hoạt động trên hệ thống
        </p>
      </div>

      <div className="rounded-lg border bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="py-3 px-4 text-left font-medium text-muted-foreground">
                Người dùng
              </th>
              <th className="py-3 px-4 text-left font-medium text-muted-foreground">
                Địa chỉ IP
              </th>
              <th className="py-3 px-4 text-left font-medium text-muted-foreground">
                Bắt đầu
              </th>
              <th className="py-3 px-4 text-left font-medium text-muted-foreground">
                Hoạt động cuối
              </th>
              <th className="py-3 px-4 text-left font-medium text-muted-foreground">
                Client
              </th>
              <th className="py-3 px-4 text-right font-medium text-muted-foreground">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td
                  colSpan={6}
                  className="py-12 text-center text-muted-foreground"
                >
                  <div className="flex flex-col items-center gap-2">
                    <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                    Đang tải...
                  </div>
                </td>
              </tr>
            ) : sessions && sessions.length > 0 ? (
              sessions.map((session) => (
                <tr
                  key={session.id}
                  className="border-b hover:bg-muted/30 transition-colors"
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <Monitor className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{session.username}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1">
                      <Globe className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="font-mono text-xs">
                        {session.ipAddress}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">
                    {new Date(session.start).toLocaleString("vi-VN")}
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">
                    {new Date(session.lastAccess).toLocaleString("vi-VN")}
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                      {session.clientId || "—"}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => {
                        if (
                          confirm(`Kết thúc phiên của "${session.username}"?`)
                        ) {
                          terminateSession.mutate(session.id);
                        }
                      }}
                      className="rounded-md p-1.5 hover:bg-destructive/10 transition-colors"
                      title="Kết thúc phiên"
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="py-12 text-center text-muted-foreground"
                >
                  <Monitor className="h-10 w-10 mx-auto mb-2 opacity-20" />
                  Không có phiên đang hoạt động
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
