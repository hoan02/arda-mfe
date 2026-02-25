import { useState } from "react";
import { useCreateUser } from "../hooks/use-user-management";

interface Props {
  open: boolean;
  onClose: () => void;
}

export function UserCreateDialog({ open, onClose }: Props) {
  const createUser = useCreateUser();
  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    department: "",
    temporaryPassword: "",
  });

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createUser.mutate(form, {
      onSuccess: () => {
        onClose();
        setForm({
          email: "",
          firstName: "",
          lastName: "",
          department: "",
          temporaryPassword: "",
        });
      },
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="relative z-50 w-full max-w-md rounded-lg border bg-card p-6 shadow-xl">
        <h2 className="text-lg font-semibold mb-4">Tạo Người dùng mới</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Email *
            </label>
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="user@example.com"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Họ *
              </label>
              <input
                required
                value={form.firstName}
                onChange={(e) =>
                  setForm({ ...form, firstName: e.target.value })
                }
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Nguyễn"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Tên
              </label>
              <input
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Văn A"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Phòng ban
            </label>
            <input
              value={form.department}
              onChange={(e) => setForm({ ...form, department: e.target.value })}
              className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Phòng Kinh doanh"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Mật khẩu tạm *
            </label>
            <input
              required
              type="password"
              value={form.temporaryPassword}
              onChange={(e) =>
                setForm({ ...form, temporaryPassword: e.target.value })
              }
              className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="••••••••"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Người dùng sẽ phải đổi lại mật khẩu khi đăng nhập lần đầu
            </p>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border px-4 py-2 text-sm hover:bg-muted transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={createUser.isPending}
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-colors"
            >
              {createUser.isPending ? "Đang tạo..." : "Tạo người dùng"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
