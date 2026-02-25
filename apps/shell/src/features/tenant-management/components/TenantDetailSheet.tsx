import React, { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@workspace/ui/components/sheet";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { Badge } from "@workspace/ui/components/badge";
import { Separator } from "@workspace/ui/components/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import { Loader2, Pencil, X, Check, RefreshCw } from "lucide-react";
import {
  useTenantDetail,
  useUpdateTenant,
  useUpdateTenantStatus,
} from "../hooks/use-tenants";
import {
  STATUS_OPTIONS,
  type TenantStatus,
  type UpdateTenantRequest,
} from "../types/tenant.types";

interface TenantDetailSheetProps {
  tenantKey: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const statusVariantMap: Record<
  TenantStatus,
  "default" | "secondary" | "destructive" | "outline"
> = {
  ACTIVE: "default",
  INACTIVE: "secondary",
  TRIAL: "outline",
  SUSPENDED: "destructive",
};

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleString("vi-VN");
}

export function TenantDetailSheet({
  tenantKey,
  open,
  onOpenChange,
}: TenantDetailSheetProps) {
  const { data: tenant, isLoading } = useTenantDetail(tenantKey);
  const updateTenant = useUpdateTenant();
  const updateStatus = useUpdateTenantStatus();

  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState({
    displayName: "",
    primaryColor: "",
    logoUrl: "",
  });
  const [selectedStatus, setSelectedStatus] = useState("");

  // Sync status with tenant data
  useEffect(() => {
    if (tenant) {
      setSelectedStatus(tenant.status);
    }
  }, [tenant]);

  function enableEditMode() {
    if (tenant) {
      setEditForm({
        displayName: tenant.name,
        primaryColor: tenant.primaryColor || "",
        logoUrl: tenant.logo || "",
      });
      setEditMode(true);
    }
  }

  function cancelEdit() {
    setEditMode(false);
  }

  function saveChanges() {
    if (!tenantKey) return;
    const request: UpdateTenantRequest = {
      displayName: editForm.displayName || undefined,
      primaryColor: editForm.primaryColor || undefined,
      logoUrl: editForm.logoUrl || undefined,
    };

    updateTenant.mutate(
      { tenantKey, request },
      {
        onSuccess: () => setEditMode(false),
      }
    );
  }

  function handleUpdateStatus() {
    if (!tenantKey || selectedStatus === tenant?.status) return;
    updateStatus.mutate({ tenantKey, status: selectedStatus });
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Chi tiết Tenant</SheetTitle>
          <SheetDescription>
            Xem và quản lý thông tin tenant
          </SheetDescription>
        </SheetHeader>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : tenant ? (
          <div className="space-y-6 px-4 overflow-y-auto">
            {/* Tenant Key & Status */}
            <div>
              <Label className="text-xs text-muted-foreground">Mã Tenant</Label>
              <div className="flex items-center gap-2 mt-1">
                <span className="font-mono text-lg font-bold text-primary">
                  {tenant.key}
                </span>
                <Badge variant={statusVariantMap[tenant.status as TenantStatus]}>
                  {STATUS_OPTIONS.find((o) => o.value === tenant.status)
                    ?.label || tenant.status}
                </Badge>
              </div>
            </div>

            <Separator />

            {/* UI Config Section */}
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Thông tin cấu hình UI</h3>
              {!editMode && (
                <Button variant="ghost" size="sm" onClick={enableEditMode}>
                  <Pencil className="mr-1 h-3 w-3" />
                  Chỉnh sửa
                </Button>
              )}
            </div>

            {/* Display Name */}
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">
                Tên hiển thị
              </Label>
              {editMode ? (
                <Input
                  value={editForm.displayName}
                  onChange={(e) =>
                    setEditForm((prev) => ({
                      ...prev,
                      displayName: e.target.value,
                    }))
                  }
                  placeholder="Nhập tên hiển thị"
                />
              ) : (
                <p className="text-sm">{tenant.name}</p>
              )}
            </div>

            {/* Primary Color */}
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">
                Màu chủ đạo
              </Label>
              {editMode ? (
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={editForm.primaryColor || "#3B82F6"}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        primaryColor: e.target.value,
                      }))
                    }
                    className="h-9 w-11 cursor-pointer rounded border bg-transparent p-1"
                  />
                  <Input
                    value={editForm.primaryColor}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        primaryColor: e.target.value,
                      }))
                    }
                    placeholder="#3B82F6"
                    className="flex-1"
                  />
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  {tenant.primaryColor ? (
                    <>
                      <div
                        className="h-8 w-8 rounded border"
                        style={{ backgroundColor: tenant.primaryColor }}
                      />
                      <span className="font-mono text-sm">
                        {tenant.primaryColor}
                      </span>
                    </>
                  ) : (
                    <span className="text-sm text-muted-foreground">
                      Chưa thiết lập
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Logo URL */}
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">URL Logo</Label>
              {editMode ? (
                <Input
                  value={editForm.logoUrl}
                  onChange={(e) =>
                    setEditForm((prev) => ({
                      ...prev,
                      logoUrl: e.target.value,
                    }))
                  }
                  placeholder="https://example.com/logo.png"
                />
              ) : tenant.logo ? (
                <div className="flex items-center gap-3">
                  <img
                    src={tenant.logo}
                    alt={tenant.name}
                    className="h-12 w-12 rounded object-contain"
                  />
                  <span className="text-xs text-muted-foreground truncate max-w-[280px]">
                    {tenant.logo}
                  </span>
                </div>
              ) : (
                <span className="text-sm text-muted-foreground">
                  Chưa có logo
                </span>
              )}
            </div>

            {/* Edit mode buttons */}
            {editMode && (
              <div className="flex gap-2 pt-2">
                <Button
                  className="flex-1"
                  onClick={saveChanges}
                  disabled={updateTenant.isPending}
                >
                  {updateTenant.isPending ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Check className="mr-2 h-4 w-4" />
                  )}
                  Lưu
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={cancelEdit}
                >
                  <X className="mr-2 h-4 w-4" />
                  Hủy
                </Button>
              </div>
            )}

            <Separator />

            {/* Database Config (Read-only) */}
            <div>
              <h3 className="font-semibold mb-3">Cấu hình Database</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Loại DB:</span>
                  <Badge variant="outline">{tenant.dbType}</Badge>
                </div>
                <div>
                  <span className="text-muted-foreground">JDBC URL:</span>
                  <div className="mt-1 rounded bg-muted p-2 font-mono text-xs break-all">
                    {tenant.jdbcUrl}
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Username:</span>
                  <span className="font-mono">{tenant.dbUsername}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tạo lúc:</span>
                  <span>{formatDate(tenant.createdAt)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Cập nhật:</span>
                  <span>{formatDate(tenant.updatedAt)}</span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Status Management */}
            <div>
              <h3 className="font-semibold mb-3">Quản lý trạng thái</h3>
              <div className="flex gap-2">
                <Select
                  value={selectedStatus}
                  onValueChange={setSelectedStatus}
                >
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Chọn trạng thái" />
                  </SelectTrigger>
                  <SelectContent>
                    {STATUS_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  onClick={handleUpdateStatus}
                  disabled={
                    selectedStatus === tenant.status ||
                    updateStatus.isPending
                  }
                >
                  {updateStatus.isPending ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <RefreshCw className="mr-2 h-4 w-4" />
                  )}
                  Cập nhật
                </Button>
              </div>
            </div>
          </div>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}
