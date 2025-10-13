import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import {
  IconPicker,
  type IconName,
} from "@workspace/ui/components/icon-picker";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { menuApiClient } from "./utils/menu-api";
import { toast } from "react-hot-toast";
import { useEffect } from "react";

interface MenuFormProps {
  open: boolean;
  onClose: () => void;
  menu?: any | null;
  onSuccess?: () => void;
}

interface FormData {
  label: string;
  path?: string;
  icon?: IconName;
  orderIndex?: number;
  type?: string;
  parentId?: number | null;
}

export function MenuForm({ open, onClose, menu, onSuccess }: MenuFormProps) {
  const { register, handleSubmit, reset, setValue, watch } = useForm<FormData>({
    defaultValues: {
      label: "",
      path: "",
      icon: undefined,
      orderIndex: 0,
      type: "PAGE",
      parentId: null,
    },
  });
  const queryClient = useQueryClient();
  const currentIcon = watch("icon");

  useEffect(() => {
    if (menu) {
      reset({
        label: menu.label || "",
        path: menu.path || "",
        icon: (menu.icon as IconName) || undefined,
        orderIndex: menu.orderIndex || 0,
        type: menu.type || "PAGE",
        parentId: menu.parentId || null,
      });
    } else {
      reset({
        label: "",
        path: "",
        icon: undefined,
        orderIndex: 0,
        type: "PAGE",
        parentId: null,
      });
    }
  }, [menu, reset]);

  const createUpdateMutation = useMutation({
    mutationFn: async (data: FormData) => {
      if (menu?.id) {
        return menuApiClient.updateMenu(menu.id, data);
      } else {
        return menuApiClient.createMenu(data);
      }
    },
    onSuccess: () => {
      toast.success(
        menu?.id ? "Cập nhật menu thành công" : "Tạo menu thành công"
      );
      queryClient.invalidateQueries({ queryKey: ["menus"] });
      queryClient.invalidateQueries({ queryKey: ["menus-tree"] });
      onClose();
      onSuccess?.();
    },
    onError: (e: any) => {
      toast.error(e?.message || "Thao tác thất bại");
    },
  });

  const onSubmit = (data: FormData) => {
    createUpdateMutation.mutate(data);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{menu?.id ? "Sửa menu" : "Thêm menu mới"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 gap-2">
            <label className="text-sm text-muted-foreground">Label *</label>
            <Input
              placeholder="Tên menu"
              {...register("label", { required: true })}
            />
          </div>

          <div className="grid grid-cols-1 gap-2">
            <label className="text-sm text-muted-foreground">Path</label>
            <Input placeholder="Đường dẫn (/dashboard)" {...register("path")} />
          </div>

          <div className="grid grid-cols-1 gap-2">
            <label className="text-sm text-muted-foreground">Icon</label>
            <IconPicker
              value={currentIcon}
              onValueChange={(iconName) => setValue("icon", iconName)}
              triggerPlaceholder="Chọn icon"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="grid grid-cols-1 gap-2">
              <label className="text-sm text-muted-foreground">Order</label>
              <Input
                type="number"
                placeholder="0"
                {...register("orderIndex", { valueAsNumber: true })}
              />
            </div>
            <div className="grid grid-cols-1 gap-2">
              <label className="text-sm text-muted-foreground">Type</label>
              <select
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                {...register("type")}
              >
                <option value="PAGE">PAGE</option>
                <option value="GROUP">GROUP</option>
                <option value="EXTERNAL">EXTERNAL</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Huỷ
            </Button>
            <Button type="submit" disabled={createUpdateMutation.isPending}>
              {createUpdateMutation.isPending ? "Đang lưu..." : "Lưu"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
