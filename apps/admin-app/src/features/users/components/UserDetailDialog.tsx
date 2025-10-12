import React from "react";
import { UserDto } from "../../../types/api";
import {
  EntityDetailDialog,
  EntityFormData,
  EntityData,
} from "@workspace/ui/components/entity-detail-dialog";
import { userFields, userInitialData } from "../config/user-fields";

interface UserDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  action: "view" | "edit" | "create";
  user?: UserDto;
  onSuccess?: (userData: EntityFormData) => void;
  isLoading?: boolean;
}

export function UserDetailDialog({
  open,
  onOpenChange,
  action,
  user,
  onSuccess,
  isLoading = false,
}: UserDetailDialogProps) {
  // Convert UserDto to EntityData format
  const entityData: EntityData | undefined = user
    ? {
        id: user.id,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email,
        username: user.username,
        phoneNumber: user.phoneNumber || "",
        status: user.status,
        role: user.role,
        emailVerified: user.emailVerified,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        lastLoginAt: user.lastLoginAt,
      }
    : undefined;

  return (
    <EntityDetailDialog
      open={open}
      onOpenChange={onOpenChange}
      action={action}
      entity={entityData}
      onSuccess={onSuccess}
      isLoading={isLoading}
      entityType="User"
      fields={userFields}
      initialData={userInitialData}
    />
  );
}
