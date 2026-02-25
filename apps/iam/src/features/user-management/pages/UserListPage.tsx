import { useState } from "react";
import {
  Users,
  Plus,
  Search,
  Shield,
  KeyRound,
  Trash2,
} from "lucide-react";
import {
  useUsers,
  useDeleteUser,
  useResetPassword,
} from "../hooks/use-user-management";
import type { UserDto } from "../types/user.types";
import { UserCreateDialog } from "../components/UserCreateDialog";
import { UserDetailSheet } from "../components/UserDetailSheet";

export function UserListPage() {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState<UserDto | null>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showDetailSheet, setShowDetailSheet] = useState(false);

  const { data, isLoading } = useUsers({
    page,
    size: 20,
    search: search || undefined,
  });
  const deleteUser = useDeleteUser();
  const resetPassword = useResetPassword();

  const users = data?.content ?? [];
  const totalPages = data?.totalPages ?? 0;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Quản lý Người dùng
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Quản lý tài khoản người dùng, phân quyền và phiên đăng nhập
          </p>
        </div>
        <button
          onClick={() => setShowCreateDialog(true)}
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Tạo người dùng
        </button>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Tìm kiếm theo email, tên..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(0);
            }}
            className="w-full rounded-md border border-input bg-background pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg border bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="py-3 px-4 text-left font-medium text-muted-foreground">
                Người dùng
              </th>
              <th className="py-3 px-4 text-left font-medium text-muted-foreground">
                Email
              </th>
              <th className="py-3 px-4 text-left font-medium text-muted-foreground">
                Phòng ban
              </th>
              <th className="py-3 px-4 text-left font-medium text-muted-foreground">
                Vai trò
              </th>
              <th className="py-3 px-4 text-center font-medium text-muted-foreground">
                Trạng thái
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
            ) : users.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="py-12 text-center text-muted-foreground"
                >
                  <Users className="h-10 w-10 mx-auto mb-2 opacity-30" />
                  Chưa có người dùng nào
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr
                  key={user.id}
                  className="border-b hover:bg-muted/30 cursor-pointer transition-colors"
                  onClick={() => {
                    setSelectedUser(user);
                    setShowDetailSheet(true);
                  }}
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary">
                        {user.firstName?.[0]?.toUpperCase() ??
                          user.email[0].toUpperCase()}
                      </div>
                      <span className="font-medium">
                        {user.fullName || user.email}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">
                    {user.email}
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">
                    {user.department || "—"}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex flex-wrap gap-1">
                      {user.roles?.slice(0, 2).map((role) => (
                        <span
                          key={role.id}
                          className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700"
                        >
                          <Shield className="h-3 w-3" />
                          {role.name}
                        </span>
                      ))}
                      {(user.roles?.length ?? 0) > 2 && (
                        <span className="text-xs text-muted-foreground">
                          +{user.roles.length - 2}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        user.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {user.isActive ? "Hoạt động" : "Vô hiệu"}
                    </span>
                  </td>
                  <td
                    className="py-3 px-4 text-right"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => {
                          const pw = prompt("Nhập mật khẩu mới:");
                          if (pw)
                            resetPassword.mutate({
                              id: user.id,
                              req: { newPassword: pw, temporary: true },
                            });
                        }}
                        className="rounded-md p-1.5 hover:bg-muted transition-colors"
                        title="Đặt lại mật khẩu"
                      >
                        <KeyRound className="h-4 w-4 text-muted-foreground" />
                      </button>
                      <button
                        onClick={() => {
                          if (
                            confirm(
                              `Vô hiệu hóa "${user.fullName || user.email}"?`,
                            )
                          ) {
                            deleteUser.mutate(user.id);
                          }
                        }}
                        className="rounded-md p-1.5 hover:bg-destructive/10 transition-colors"
                        title="Vô hiệu hóa"
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Trang {page + 1} / {totalPages} — {data?.totalElements} người dùng
          </p>
          <div className="flex gap-1">
            <button
              disabled={page === 0}
              onClick={() => setPage((p) => p - 1)}
              className="rounded-md border px-3 py-1.5 text-sm disabled:opacity-50 hover:bg-muted transition-colors"
            >
              Trước
            </button>
            <button
              disabled={page + 1 >= totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="rounded-md border px-3 py-1.5 text-sm disabled:opacity-50 hover:bg-muted transition-colors"
            >
              Sau
            </button>
          </div>
        </div>
      )}

      {/* Dialogs */}
      <UserCreateDialog
        open={showCreateDialog}
        onClose={() => setShowCreateDialog(false)}
      />
      <UserDetailSheet
        user={selectedUser}
        open={showDetailSheet}
        onClose={() => setShowDetailSheet(false)}
      />
    </div>
  );
}
