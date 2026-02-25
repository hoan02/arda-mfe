import { AppWindow, Globe, Lock, Unlock } from "lucide-react";
import { useClients } from "../hooks/use-client-management";

export function ClientListPage() {
  const { data: clients, isLoading } = useClients();

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Quản lý Clients</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Xem các ứng dụng OIDC đã đăng ký trên Keycloak
        </p>
      </div>

      <div className="rounded-lg border bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="py-3 px-4 text-left font-medium text-muted-foreground">
                Client
              </th>
              <th className="py-3 px-4 text-left font-medium text-muted-foreground">
                Giao thức
              </th>
              <th className="py-3 px-4 text-center font-medium text-muted-foreground">
                Loại
              </th>
              <th className="py-3 px-4 text-center font-medium text-muted-foreground">
                Trạng thái
              </th>
              <th className="py-3 px-4 text-left font-medium text-muted-foreground">
                Redirect URIs
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td
                  colSpan={5}
                  className="py-12 text-center text-muted-foreground"
                >
                  <div className="flex flex-col items-center gap-2">
                    <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                    Đang tải...
                  </div>
                </td>
              </tr>
            ) : clients && clients.length > 0 ? (
              clients.map((client) => (
                <tr
                  key={client.id}
                  className="border-b hover:bg-muted/30 transition-colors"
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-md bg-blue-100 flex items-center justify-center">
                        <AppWindow className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">{client.clientId}</p>
                        {client.name && (
                          <p className="text-xs text-muted-foreground">
                            {client.name}
                          </p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center gap-1 text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded">
                      <Globe className="h-3 w-3" />
                      {client.protocol || "openid-connect"}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    {client.publicClient ? (
                      <span className="inline-flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                        <Unlock className="h-3 w-3" />
                        Public
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded">
                        <Lock className="h-3 w-3" />
                        Confidential
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        client.enabled
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {client.enabled ? "Bật" : "Tắt"}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex flex-wrap gap-1">
                      {client.redirectUris?.slice(0, 2).map((uri, i) => (
                        <span
                          key={i}
                          className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded font-mono"
                        >
                          {uri.length > 30 ? uri.slice(0, 30) + "..." : uri}
                        </span>
                      ))}
                      {(client.redirectUris?.length ?? 0) > 2 && (
                        <span className="text-xs text-muted-foreground">
                          +{client.redirectUris.length - 2}
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="py-12 text-center text-muted-foreground"
                >
                  <AppWindow className="h-10 w-10 mx-auto mb-2 opacity-20" />
                  Không có client nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
