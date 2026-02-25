import { Key } from "lucide-react";
import { usePermissionsByResource } from "../hooks/use-permission-management";

export function PermissionListPage() {
  const { data: permsByResource, isLoading } = usePermissionsByResource();

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Quản lý Quyền</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Danh sách quyền hệ thống phân theo tài nguyên
        </p>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
        </div>
      ) : permsByResource ? (
        <div className="space-y-4">
          {Object.entries(permsByResource).map(([resource, perms]) => (
            <div key={resource} className="rounded-lg border bg-card">
              <div className="border-b px-4 py-3 flex items-center gap-2">
                <Key className="h-4 w-4 text-primary" />
                <h3 className="font-semibold text-sm">{resource}</h3>
                <span className="text-xs text-muted-foreground ml-auto">
                  {perms.length} quyền
                </span>
              </div>
              <div className="p-3">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {perms.map((perm) => (
                    <div key={perm.id} className="rounded-md border px-3 py-2">
                      <p className="font-mono text-xs font-medium text-primary">
                        {perm.code}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        <span className="inline-flex items-center gap-1 bg-muted px-1.5 py-0.5 rounded">
                          {perm.action}
                        </span>
                      </p>
                      {perm.description && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {perm.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-muted-foreground">
          <Key className="h-10 w-10 mx-auto mb-2 opacity-20" />
          <p>Chưa có quyền nào được định nghĩa</p>
        </div>
      )}
    </div>
  );
}
