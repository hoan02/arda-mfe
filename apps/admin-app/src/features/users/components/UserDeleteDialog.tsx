import React from "react";
import { UserDto } from "../../../types/api";
import { ConfirmDeleteDialog } from "@workspace/ui/components/confirm-delete-dialog";

interface UserDeleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: UserDto;
  onConfirm: () => void;
  isLoading?: boolean;
}

export function UserDeleteDialog({
  open,
  onOpenChange,
  user,
  onConfirm,
  isLoading = false,
}: UserDeleteDialogProps) {
  return (
    <ConfirmDeleteDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Delete User"
      description="Are you sure you want to delete this user? This action cannot be undone."
      itemName="User"
      itemDetails={{
        primary: `${user.firstName} ${user.lastName}`,
        secondary: user.email,
        tertiary: `@${user.username}`,
      }}
      onConfirm={onConfirm}
      isLoading={isLoading}
      confirmButtonText="Delete User"
    />
  );
}
