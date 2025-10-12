import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog";
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
import { Checkbox } from "@workspace/ui/components/checkbox";
import {
  Calendar,
  Mail,
  Phone,
  User,
  Shield,
  CheckCircle,
  XCircle,
} from "lucide-react";

type DialogAction = "view" | "edit" | "create";

export interface FieldConfig {
  key: string;
  label: string;
  type: "text" | "email" | "select" | "checkbox" | "phone" | "readonly";
  required?: boolean;
  options?: { value: string; label: string }[];
  icon?: React.ComponentType<{ className?: string }>;
  validation?: {
    pattern?: RegExp;
    minLength?: number;
    maxLength?: number;
    custom?: (value: any) => string | null;
  };
  section?: string;
  gridCols?: 1 | 2 | 3;
}

export interface EntityFormData {
  [key: string]: any;
}

export interface EntityData {
  id: number;
  createdAt: string;
  updatedAt?: string;
  [key: string]: any;
}

interface EntityDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  action: DialogAction;
  entity?: EntityData;
  onSuccess?: (entityData: EntityFormData) => void;
  isLoading?: boolean;
  entityType?: string;
  fields: FieldConfig[];
  initialData?: EntityFormData;
}

export function EntityDetailDialog({
  open,
  onOpenChange,
  action,
  entity,
  onSuccess,
  isLoading = false,
  entityType = "Entity",
  fields,
  initialData,
}: EntityDetailDialogProps) {
  const [formData, setFormData] = useState<EntityFormData>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Initialize form data when entity changes
  useEffect(() => {
    if (entity && action !== "create") {
      const newFormData: EntityFormData = {};
      fields.forEach((field) => {
        newFormData[field.key] = entity[field.key] || "";
      });
      setFormData(newFormData);
    } else if (action === "create") {
      const newFormData: EntityFormData = {};
      fields.forEach((field) => {
        newFormData[field.key] = initialData?.[field.key] || "";
      });
      setFormData(newFormData);
    }
  }, [entity, action, fields, initialData]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    fields.forEach((field) => {
      const value = formData[field.key];

      if (field.required && (!value || value.toString().trim() === "")) {
        newErrors[field.key] = `${field.label} is required`;
        return;
      }

      if (value && field.validation) {
        if (
          field.validation.minLength &&
          value.toString().length < field.validation.minLength
        ) {
          newErrors[field.key] =
            `${field.label} must be at least ${field.validation.minLength} characters`;
          return;
        }

        if (
          field.validation.maxLength &&
          value.toString().length > field.validation.maxLength
        ) {
          newErrors[field.key] =
            `${field.label} must be no more than ${field.validation.maxLength} characters`;
          return;
        }

        if (
          field.validation.pattern &&
          !field.validation.pattern.test(value.toString())
        ) {
          newErrors[field.key] = `${field.label} format is invalid`;
          return;
        }

        if (field.validation.custom) {
          const customError = field.validation.custom(value);
          if (customError) {
            newErrors[field.key] = customError;
          }
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (action === "view") {
      onOpenChange(false);
      return;
    }

    if (!validateForm()) {
      return;
    }

    if (onSuccess) {
      onSuccess(formData);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const renderField = (field: FieldConfig) => {
    const isReadOnly = action === "view" || field.type === "readonly";
    const value = formData[field.key] || "";
    const IconComponent = field.icon || User;

    const fieldContent = () => {
      switch (field.type) {
        case "select":
          return isReadOnly ? (
            <div className="flex items-center gap-2">
              <IconComponent className="h-4 w-4 text-gray-400" />
              <Badge variant="default">{value}</Badge>
            </div>
          ) : (
            <Select
              value={value}
              onValueChange={(val) => handleInputChange(field.key, val)}
              disabled={isLoading}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {field.options?.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          );

        case "checkbox":
          return isReadOnly ? (
            <div className="flex items-center gap-2">
              <IconComponent className="h-4 w-4 text-gray-400" />
              {value ? (
                <CheckCircle className="h-4 w-4 text-green-500" />
              ) : (
                <XCircle className="h-4 w-4 text-red-500" />
              )}
              <span className="text-sm">{value ? "Yes" : "No"}</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Checkbox
                id={field.key}
                checked={value}
                onCheckedChange={(checked) =>
                  handleInputChange(field.key, checked)
                }
                disabled={isLoading}
              />
              <Label htmlFor={field.key}>{field.label}</Label>
            </div>
          );

        case "phone":
          return isReadOnly ? (
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-gray-400" />
              <span className="text-sm">{value || "N/A"}</span>
            </div>
          ) : (
            <Input
              id={field.key}
              value={value}
              onChange={(e) => handleInputChange(field.key, e.target.value)}
              disabled={isLoading}
              className={errors[field.key] ? "border-red-500" : ""}
            />
          );

        case "email":
          return isReadOnly ? (
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-gray-400" />
              <span className="text-sm">{value}</span>
            </div>
          ) : (
            <Input
              id={field.key}
              type="email"
              value={value}
              onChange={(e) => handleInputChange(field.key, e.target.value)}
              disabled={isLoading}
              className={errors[field.key] ? "border-red-500" : ""}
            />
          );

        default: // text
          return isReadOnly ? (
            <div className="flex items-center gap-2">
              <IconComponent className="h-4 w-4 text-gray-400" />
              <span className="text-sm">{value}</span>
            </div>
          ) : (
            <Input
              id={field.key}
              value={value}
              onChange={(e) => handleInputChange(field.key, e.target.value)}
              disabled={isLoading}
              className={errors[field.key] ? "border-red-500" : ""}
            />
          );
      }
    };

    return (
      <div
        className={`space-y-2 ${field.gridCols === 1 ? "col-span-1" : field.gridCols === 2 ? "col-span-2" : "col-span-3"}`}
      >
        {field.type !== "checkbox" && (
          <Label htmlFor={field.key}>{field.label}</Label>
        )}
        {fieldContent()}
        {errors[field.key] && (
          <p className="text-sm text-red-500">{errors[field.key]}</p>
        )}
      </div>
    );
  };

  const isReadOnly = action === "view";
  const title =
    action === "create"
      ? `Create ${entityType}`
      : action === "edit"
        ? `Edit ${entityType}`
        : `${entityType} Details`;
  const description =
    action === "create"
      ? `Create a new ${entityType.toLowerCase()}`
      : action === "edit"
        ? `Update ${entityType.toLowerCase()} information`
        : `Complete information about this ${entityType.toLowerCase()}`;

  // Group fields by section
  const sections = fields.reduce(
    (acc, field) => {
      const section = field.section || "General";
      if (!acc[section]) {
        acc[section] = [];
      }
      acc[section].push(field);
      return acc;
    },
    {} as Record<string, FieldConfig[]>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            {title}
          </DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {Object.entries(sections).map(
            ([sectionName, sectionFields], sectionIndex) => (
              <div key={sectionName}>
                {sectionIndex > 0 && <Separator />}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">{sectionName}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {sectionFields.map((field) => renderField(field))}
                  </div>
                </div>
              </div>
            )
          )}

          {/* Show timestamps only in view mode */}
          {isReadOnly && entity && (
            <>
              <Separator />
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Timestamps</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Created At</Label>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">
                        {new Date(entity.createdAt).toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Updated At</Label>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">
                        {entity.updatedAt
                          ? new Date(entity.updatedAt).toLocaleString()
                          : "N/A"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              {isReadOnly ? "Close" : "Cancel"}
            </Button>
            {!isReadOnly && (
              <Button type="submit" disabled={isLoading}>
                {isLoading
                  ? "Saving..."
                  : action === "create"
                    ? `Create ${entityType}`
                    : `Update ${entityType}`}
              </Button>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
