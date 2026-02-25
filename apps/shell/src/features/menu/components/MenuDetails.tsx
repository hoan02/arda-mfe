import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@workspace/ui/components/popover";
import { X } from "lucide-react";
import {
  IconPicker,
  Icon,
  type IconName,
} from "@workspace/ui/components/icon-picker";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { menuApiClient } from "../services/menu-api";

export type MenuDetailsProps = {
  menu: any | null;
  mode?: "view" | "edit";
  onClose?: () => void;
  parentMenu?: any | null;
};

export function MenuDetails({
  menu,
  mode = "view",
  onClose,
  parentMenu,
}: MenuDetailsProps) {
  const queryClient = useQueryClient();
  const DEFAULT_ICON_COLOR = "#111827"; // neutral-900
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState<{
    label: string;
    path?: string;
    icon?: IconName;
    iconColor?: string;
    orderIndex?: number;
    type?: string;
  }>({ label: "" });

  useEffect(() => {
    if (menu) {
      const nextOrderIndex = parentMenu
        ? (Array.isArray(parentMenu.children)
            ? parentMenu.children.length
            : 0) + 1
        : undefined;

      setForm({
        label: menu.label ?? "",
        path: menu.path ?? "",
        icon: (menu.icon as IconName) ?? undefined,
        iconColor: (menu.iconColor as string) ?? DEFAULT_ICON_COLOR,
        orderIndex: menu.id ? (menu.orderIndex ?? 0) : (nextOrderIndex ?? 0),
        type: menu.type ?? "",
      });
      setIsEditing(mode === "edit");
    }
  }, [menu, mode, parentMenu]);

  const updateMutation = useMutation({
    mutationFn: async () => {
      // validate required fields
      if (!form.label || !form.label.trim()) {
        toast.error("Vui lòng nhập Nhãn");
        return;
      }
      if (!form.path || !form.path.trim()) {
        toast.error("Vui lòng nhập Đường dẫn");
        return;
      }
      const payload: any = {
        label: form.label,
        path: form.path,
        icon: form.icon,
        orderIndex: form.orderIndex,
        type: form.type,
      };
      payload.iconColor = form.iconColor || DEFAULT_ICON_COLOR;
      if (menu?.id) {
        await menuApiClient.updateMenu(menu.id, payload);
      } else {
        // create new menu (submenu when parentMenu provided)
        const createdId = await menuApiClient.createMenu({
          ...payload,
          parentId: parentMenu?.id ?? null,
        } as any);
        // no need to use createdId for now; list will refresh
      }
    },
    onSuccess: () => {
      toast.success("Đã lưu thay đổi");
      queryClient.invalidateQueries({ queryKey: ["menus"] });
      queryClient.invalidateQueries({ queryKey: ["menus-tree"] });
      setIsEditing(false);
      onClose?.();
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
      onClose?.();
    },
    onError: (e: any) => toast.error(e?.message || "Xoá thất bại"),
  });

  if (!menu) {
    return (
      <div className="p-4 space-y-2 min-h-[500px] flex items-center justify-center">
        <div className="text-sm text-muted-foreground">
          Chọn một menu để xem chi tiết.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {parentMenu ? (
        <div className="flex items-center gap-3">
          <div className="text-muted-foreground text-sm w-[120px]">
            Menu cha
          </div>
          <Input value={parentMenu.label || ""} disabled className="flex-1" />
        </div>
      ) : null}

      <div className="flex items-center gap-3">
        <div className="text-muted-foreground text-sm w-[120px]">Nhãn</div>
        <Input
          value={form.label}
          disabled={!isEditing}
          onChange={(e) => setForm((f) => ({ ...f, label: e.target.value }))}
          className="flex-1"
        />
      </div>

      <div className="flex items-center gap-3">
        <div className="text-muted-foreground text-sm w-[120px]">Đường dẫn</div>
        <Input
          value={form.path || ""}
          disabled={!isEditing}
          onChange={(e) => setForm((f) => ({ ...f, path: e.target.value }))}
          className="flex-1"
        />
      </div>

      <div className="flex items-center gap-3">
        <div className="text-muted-foreground text-sm w-[120px]">
          Biểu tượng
        </div>
        <div className="flex-1">
          {isEditing ? (
            <div className="flex items-center gap-2">
              <div className="flex-1 min-w-0">
                <IconPicker
                  value={form.icon as IconName}
                  onValueChange={(v) => setForm((f) => ({ ...f, icon: v }))}
                  triggerPlaceholder="Chọn icon"
                  dialog
                  columns={10}
                >
                  <Button
                    variant="outline"
                    className="w-full flex items-center justify-between"
                  >
                    <span className="inline-flex items-center gap-2">
                      {form.icon ? (
                        <>
                          <Icon
                            name={form.icon as IconName}
                            className="h-4 w-4"
                            style={
                              form.iconColor
                                ? { color: form.iconColor }
                                : undefined
                            }
                          />
                          {form.icon}
                        </>
                      ) : (
                        "Chọn icon"
                      )}
                    </span>
                    {form.icon && (
                      <span
                        role="button"
                        aria-label="Clear icon"
                        title="Clear icon"
                        className="ml-2 inline-flex items-center justify-center rounded hover:bg-foreground/10 p-1"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setForm((f) => ({ ...f, icon: undefined }));
                        }}
                      >
                        <X className="h-3.5 w-3.5" />
                      </span>
                    )}
                  </Button>
                </IconPicker>
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <span
                      className="inline-block h-3.5 w-3.5 rounded border"
                      style={{
                        backgroundColor: form.iconColor || "transparent",
                        borderColor: form.iconColor ? "transparent" : "#e5e7eb",
                      }}
                    />
                    {form.iconColor ?? "Chọn màu"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-56">
                  <div className="grid grid-cols-6 gap-2">
                    {[
                      "#111827",
                      "#6B7280",
                      "#9CA3AF",
                      "#EF4444",
                      "#F59E0B",
                      "#10B981",
                      "#3B82F6",
                      "#6366F1",
                      "#8B5CF6",
                      "#EC4899",
                      "#06B6D4",
                      "#84CC16",
                    ].map((c) => (
                      <button
                        key={c}
                        className="h-6 w-6 rounded"
                        style={{ backgroundColor: c }}
                        onClick={() => setForm((f) => ({ ...f, iconColor: c }))}
                        aria-label={`Pick ${c}`}
                      />
                    ))}
                    <button
                      className="col-span-6 text-xs text-muted-foreground underline"
                      onClick={() =>
                        setForm((f) => ({ ...f, iconColor: undefined }))
                      }
                    >
                      Clear color
                    </button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <div className="flex-1 min-w-0">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  disabled
                >
                  {form.icon ? (
                    <>
                      <Icon
                        name={form.icon as IconName}
                        className="h-4 w-4"
                        style={{
                          color: form.iconColor || DEFAULT_ICON_COLOR,
                        }}
                      />
                      {form.icon}
                    </>
                  ) : (
                    "Chưa chọn icon"
                  )}
                </Button>
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2"
                    disabled
                  >
                    <span
                      className="inline-block h-3.5 w-3.5 rounded border"
                      style={{
                        backgroundColor: form.iconColor || DEFAULT_ICON_COLOR,
                        borderColor: "transparent",
                      }}
                    />
                    {form.iconColor ?? DEFAULT_ICON_COLOR}
                  </Button>
                </PopoverTrigger>
              </Popover>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="text-muted-foreground text-sm w-[120px]">Thứ tự</div>
        <Input
          type="number"
          value={Number(form.orderIndex ?? 0)}
          disabled
          className="flex-1"
        />
      </div>

      <div className="flex items-center gap-3">
        <div className="text-muted-foreground text-sm w-[120px]">Loại</div>
        <Input
          value={form.type || ""}
          disabled={!isEditing}
          onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}
          className="flex-1"
        />
      </div>

      {isEditing && (
        <div className="flex justify-end pt-2 border-t">
          <Button
            onClick={() => updateMutation.mutate()}
            disabled={updateMutation.isPending}
          >
            Lưu
          </Button>
        </div>
      )}
    </div>
  );
}
