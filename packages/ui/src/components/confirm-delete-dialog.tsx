import React from "react";
import { Button } from "@workspace/ui/components/button";
import { AlertTriangle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog";

interface ConfirmDeleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  itemName: string;
  itemDetails: {
    primary: string;
    secondary?: string;
    tertiary?: string;
  };
  onConfirm: () => void;
  isLoading?: boolean;
  confirmButtonText?: string;
}

export function ConfirmDeleteDialog({
  open,
  onOpenChange,
  title,
  description,
  itemName,
  itemDetails,
  onConfirm,
  isLoading = false,
  confirmButtonText = "Delete",
}: ConfirmDeleteDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="h-5 w-5" />
            {title}
          </DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="text-sm text-red-800">
              <strong>{itemName}:</strong> {itemDetails.primary}
            </div>
            {itemDetails.secondary && (
              <div className="text-sm text-red-700">
                <strong>Details:</strong> {itemDetails.secondary}
              </div>
            )}
            {itemDetails.tertiary && (
              <div className="text-sm text-red-700">
                <strong>Additional:</strong> {itemDetails.tertiary}
              </div>
            )}
          </div>

          <div className="text-sm text-gray-600">
            This action cannot be undone and will permanently delete the item.
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : confirmButtonText}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
