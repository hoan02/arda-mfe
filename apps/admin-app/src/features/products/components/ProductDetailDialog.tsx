import React from "react";
import {
  EntityDetailDialog,
  EntityFormData,
  EntityData,
} from "@workspace/ui/components/entity-detail-dialog";
import { productFields, productInitialData } from "../config/product-fields";

// Mock Product interface
interface Product {
  id: number;
  name: string;
  sku: string;
  category: string;
  price: number;
  cost?: number;
  stock: number;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
}

interface ProductDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  action: "view" | "edit" | "create";
  product?: Product;
  onSuccess?: (productData: EntityFormData) => void;
  isLoading?: boolean;
}

export function ProductDetailDialog({
  open,
  onOpenChange,
  action,
  product,
  onSuccess,
  isLoading = false,
}: ProductDetailDialogProps) {
  // Convert Product to EntityData format
  const entityData: EntityData | undefined = product
    ? {
        id: product.id,
        name: product.name,
        sku: product.sku,
        category: product.category,
        price: product.price.toString(),
        cost: product.cost?.toString() || "",
        stock: product.stock.toString(),
        isActive: product.isActive,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
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
      entityType="Product"
      fields={productFields}
      initialData={productInitialData}
    />
  );
}
