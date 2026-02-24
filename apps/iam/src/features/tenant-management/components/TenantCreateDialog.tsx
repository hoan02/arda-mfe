import React, { useState, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import { Separator } from "@workspace/ui/components/separator";
import { Loader2 } from "lucide-react";
import { useCreateTenant } from "../hooks/use-tenants";
import {
  DB_TYPE_OPTIONS,
  type CreateTenantRequest,
  type DbTypeOption,
} from "../types/tenant.types";

interface TenantCreateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const initialForm = {
  tenantKey: "",
  displayName: "",
  logoUrl: "",
  primaryColor: "#3B82F6",
  dbType: "" as string,
  jdbcUrl: "",
  dbUsername: "",
  dbPassword: "",
  driverClassName: "",
};

export function TenantCreateDialog({
  open,
  onOpenChange,
}: TenantCreateDialogProps) {
  const createTenant = useCreateTenant();
  const [form, setForm] = useState({ ...initialForm });

  const selectedDbOption = useMemo(
    () => DB_TYPE_OPTIONS.find((o) => o.value === form.dbType) || null,
    [form.dbType]
  );

  const isValidTenantKey = /^[a-z0-9]{6}$/.test(form.tenantKey);

  const isFormValid =
    isValidTenantKey &&
    form.displayName.trim() !== "" &&
    form.dbType !== "" &&
    form.jdbcUrl.trim() !== "" &&
    form.dbUsername.trim() !== "" &&
    form.dbPassword.trim() !== "";

  const jdbcUrlPlaceholder = useMemo(() => {
    if (!selectedDbOption) return "";
    const { value, defaultPort } = selectedDbOption;
    return value === "POSTGRES"
      ? `jdbc:postgresql://localhost:${defaultPort}/tenant_${form.tenantKey || "xxx"}`
      : `jdbc:oracle:thin:@localhost:${defaultPort}:ORCL`;
  }, [selectedDbOption, form.tenantKey]);

  const jdbcUrlHint = useMemo(() => {
    return selectedDbOption?.value === "POSTGRES"
      ? "Ví dụ: jdbc:postgresql://localhost:5432/tenant_abc123"
      : selectedDbOption?.value === "ORACLE"
        ? "Ví dụ: jdbc:oracle:thin:@localhost:1521:ORCL"
        : "";
  }, [selectedDbOption]);

  function updateField<K extends keyof typeof form>(
    field: K,
    value: (typeof form)[K]
  ) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleDbTypeChange(value: string) {
    const option = DB_TYPE_OPTIONS.find((o) => o.value === value);
    if (option) {
      const { value: dbType, driverClass, defaultPort } = option;
      const autoJdbcUrl =
        dbType === "POSTGRES"
          ? `jdbc:postgresql://localhost:${defaultPort}/tenant_${form.tenantKey || "xxx"}`
          : `jdbc:oracle:thin:@localhost:${defaultPort}:ORCL`;

      setForm((prev) => ({
        ...prev,
        dbType,
        driverClassName: driverClass,
        jdbcUrl: autoJdbcUrl,
      }));
    }
  }

  function resetForm() {
    setForm({ ...initialForm });
  }

  function handleClose(openState: boolean) {
    if (!openState) resetForm();
    onOpenChange(openState);
  }

  function handleSubmit() {
    if (!isFormValid) return;

    const request: CreateTenantRequest = {
      tenantKey: form.tenantKey.toLowerCase(),
      displayName: form.displayName,
      logoUrl: form.logoUrl || undefined,
      primaryColor: form.primaryColor || undefined,
      dbType: form.dbType as "POSTGRES" | "ORACLE",
      jdbcUrl: form.jdbcUrl,
      dbUsername: form.dbUsername,
      dbPassword: form.dbPassword,
      driverClassName: form.driverClassName,
    };

    createTenant.mutate(request, {
      onSuccess: () => handleClose(false),
    });
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Tạo Tenant Mới</DialogTitle>
          <DialogDescription>
            Điền thông tin để tạo tenant mới trong hệ thống
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* Tenant Key */}
          <div className="grid gap-2">
            <Label htmlFor="tenantKey">
              Mã Tenant <span className="text-destructive">*</span>
            </Label>
            <Input
              id="tenantKey"
              value={form.tenantKey}
              onChange={(e) =>
                updateField("tenantKey", e.target.value.toLowerCase())
              }
              placeholder="abc123 (6 ký tự a-z0-9)"
              maxLength={6}
              className="font-mono"
            />
            <p className="text-xs text-muted-foreground">
              Đúng 6 ký tự, chỉ chữ thường và số
            </p>
            {!isValidTenantKey && form.tenantKey.length > 0 && (
              <p className="text-xs text-destructive">
                Mã tenant không hợp lệ
              </p>
            )}
          </div>

          {/* Display Name */}
          <div className="grid gap-2">
            <Label htmlFor="displayName">
              Tên hiển thị <span className="text-destructive">*</span>
            </Label>
            <Input
              id="displayName"
              value={form.displayName}
              onChange={(e) => updateField("displayName", e.target.value)}
              placeholder="Tên công ty / doanh nghiệp"
            />
          </div>

          {/* Primary Color */}
          <div className="grid gap-2">
            <Label>Màu chủ đạo</Label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={form.primaryColor}
                onChange={(e) => updateField("primaryColor", e.target.value)}
                className="h-10 w-12 cursor-pointer rounded border bg-transparent p-1"
              />
              <Input
                value={form.primaryColor}
                onChange={(e) => updateField("primaryColor", e.target.value)}
                placeholder="#3B82F6 (optional)"
                className="flex-1"
              />
            </div>
          </div>

          {/* Logo URL */}
          <div className="grid gap-2">
            <Label htmlFor="logoUrl">URL Logo</Label>
            <Input
              id="logoUrl"
              value={form.logoUrl}
              onChange={(e) => updateField("logoUrl", e.target.value)}
              placeholder="https://example.com/logo.png (optional)"
            />
          </div>

          <Separator />
          <h4 className="font-semibold">Cấu hình Database</h4>

          {/* DB Type */}
          <div className="grid gap-2">
            <Label>
              Loại Database <span className="text-destructive">*</span>
            </Label>
            <Select value={form.dbType} onValueChange={handleDbTypeChange}>
              <SelectTrigger>
                <SelectValue placeholder="Chọn loại database" />
              </SelectTrigger>
              <SelectContent>
                {DB_TYPE_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedDbOption && (
            <>
              {/* JDBC URL */}
              <div className="grid gap-2">
                <Label htmlFor="jdbcUrl">
                  JDBC URL <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="jdbcUrl"
                  value={form.jdbcUrl}
                  onChange={(e) => updateField("jdbcUrl", e.target.value)}
                  placeholder={jdbcUrlPlaceholder}
                  className="font-mono text-sm"
                />
                <p className="text-xs text-muted-foreground">{jdbcUrlHint}</p>
              </div>

              {/* Username */}
              <div className="grid gap-2">
                <Label htmlFor="dbUsername">
                  Database Username <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="dbUsername"
                  value={form.dbUsername}
                  onChange={(e) => updateField("dbUsername", e.target.value)}
                  placeholder="postgres / oracle_user"
                />
              </div>

              {/* Password */}
              <div className="grid gap-2">
                <Label htmlFor="dbPassword">
                  Database Password <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="dbPassword"
                  type="password"
                  value={form.dbPassword}
                  onChange={(e) => updateField("dbPassword", e.target.value)}
                  placeholder="••••••••"
                />
              </div>

              {/* Driver Class */}
              <div className="grid gap-2">
                <Label>Driver Class</Label>
                <Input
                  value={form.driverClassName}
                  className="font-mono text-sm"
                  readOnly
                  disabled
                />
                <p className="text-xs text-muted-foreground">
                  Tự động điền theo loại database
                </p>
              </div>
            </>
          )}
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => handleClose(false)}>
            Hủy
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!isFormValid || createTenant.isPending}
          >
            {createTenant.isPending && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Tạo Tenant
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
