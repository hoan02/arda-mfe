import { Card } from "@workspace/ui/components/card";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import {
  IconPicker,
  Icon,
  type IconName,
} from "@workspace/ui/components/icon-picker";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { menuApiClient } from "../utils/menu-api";

export function MenuDetails({ menu }: { menu: any | null }) {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState<{
    label: string;
    path?: string;
    icon?: IconName;
    orderIndex?: number;
    type?: string;
  }>({ label: "" });

  useEffect(() => {
    if (menu) {
      setForm({
        label: menu.label ?? "",
        path: menu.path ?? "",
        icon: (menu.icon as IconName) ?? undefined,
        orderIndex: menu.orderIndex ?? 0,
        type: menu.type ?? "",
      });
      setIsEditing(false);
    }
  }, [menu]);

  const updateMutation = useMutation({
    mutationFn: async () => {
      if (!menu?.id) return;
      await menuApiClient.updateMenu(menu.id, {
        label: form.label,
        path: form.path,
        icon: form.icon,
        orderIndex: form.orderIndex,
        type: form.type,
      });
    },
    onSuccess: () => {
      toast.success("Đã lưu thay đổi");
      queryClient.invalidateQueries({ queryKey: ["menus"] });
      queryClient.invalidateQueries({ queryKey: ["menus-tree"] });
      setIsEditing(false);
    },
    onError: (e: any) => toast.error(e?.message || "Lỗi lưu thay đổi"),
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      if (!menu?.id) return;
      await menuApiClient.deleteMenu(menu.id);
    },
    onSuccess: () => {
      toast.success("Đã xoá menu");
      queryClient.invalidateQueries({ queryKey: ["menus"] });
      queryClient.invalidateQueries({ queryKey: ["menus-tree"] });
    },
    onError: (e: any) => toast.error(e?.message || "Xoá thất bại"),
  });

  if (!menu) {
    return (
      <Card className="p-4 space-y-2">
        <div className="text-sm text-muted-foreground">
          Chọn một menu để xem chi tiết.
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold">Chi tiết menu</h2>
        {!isEditing ? (
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsEditing(true)}
            >
              Sửa
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => {
                if (confirm("Xoá menu này?")) deleteMutation.mutate();
              }}
            >
              Xoá
            </Button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={() => updateMutation.mutate()}
              disabled={updateMutation.isPending}
            >
              Lưu
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setIsEditing(false);
                setForm({
                  label: menu.label ?? "",
                  path: menu.path ?? "",
                  icon: (menu.icon as IconName) ?? undefined,
                  orderIndex: menu.orderIndex ?? 0,
                  type: menu.type ?? "",
                });
              }}
            >
              Huỷ
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="text-muted-foreground self-center">Label</div>
        <Input
          value={form.label}
          disabled={!isEditing}
          onChange={(e) => setForm((f) => ({ ...f, label: e.target.value }))}
        />

        <div className="text-muted-foreground self-center">Path</div>
        <Input
          value={form.path || ""}
          disabled={!isEditing}
          onChange={(e) => setForm((f) => ({ ...f, path: e.target.value }))}
        />

        <div className="text-muted-foreground self-center">Icon</div>
        {isEditing ? (
          <IconPicker
            value={form.icon as IconName}
            onValueChange={(v) => setForm((f) => ({ ...f, icon: v }))}
            triggerPlaceholder="Chọn icon"
          >
            <Button variant="outline" className="w-full justify-start">
              {form.icon ? (
                <>
                  <Icon name={form.icon as IconName} className="h-4 w-4" />
                  {form.icon}
                </>
              ) : (
                "Chọn icon"
              )}
            </Button>
          </IconPicker>
        ) : (
          <Button variant="outline" className="w-full justify-start" disabled>
            {form.icon ? (
              <>
                <Icon name={form.icon as IconName} className="h-4 w-4" />
                {form.icon}
              </>
            ) : (
              "Chưa chọn icon"
            )}
          </Button>
        )}

        <div className="text-muted-foreground self-center">Order</div>
        <Input
          type="number"
          value={Number(form.orderIndex ?? 0)}
          disabled={!isEditing}
          onChange={(e) =>
            setForm((f) => ({ ...f, orderIndex: Number(e.target.value) }))
          }
        />

        <div className="text-muted-foreground self-center">Type</div>
        <Input
          value={form.type || ""}
          disabled={!isEditing}
          onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}
        />
      </div>
    </Card>
  );
}
