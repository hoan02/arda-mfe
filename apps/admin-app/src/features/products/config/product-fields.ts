import { FieldConfig } from "@workspace/ui/components/entity-detail-dialog";
import { Package, DollarSign, Tag, Hash } from "lucide-react";

export const productFields: FieldConfig[] = [
  // Basic Information Section
  {
    key: "name",
    label: "Product Name",
    type: "text",
    required: true,
    icon: Package,
    section: "Basic Information",
    gridCols: 2,
  },
  {
    key: "sku",
    label: "SKU",
    type: "text",
    required: true,
    icon: Hash,
    section: "Basic Information",
    gridCols: 1,
  },
  {
    key: "category",
    label: "Category",
    type: "select",
    icon: Tag,
    section: "Basic Information",
    gridCols: 1,
    options: [
      { value: "ELECTRONICS", label: "Electronics" },
      { value: "CLOTHING", label: "Clothing" },
      { value: "BOOKS", label: "Books" },
      { value: "HOME", label: "Home & Garden" },
    ],
  },

  // Pricing Section
  {
    key: "price",
    label: "Price",
    type: "text",
    required: true,
    icon: DollarSign,
    section: "Pricing",
    gridCols: 1,
    validation: {
      pattern: /^\d+(\.\d{2})?$/,
    },
  },
  {
    key: "cost",
    label: "Cost",
    type: "text",
    icon: DollarSign,
    section: "Pricing",
    gridCols: 1,
    validation: {
      pattern: /^\d+(\.\d{2})?$/,
    },
  },

  // Inventory Section
  {
    key: "stock",
    label: "Stock Quantity",
    type: "text",
    required: true,
    icon: Package,
    section: "Inventory",
    gridCols: 1,
    validation: {
      pattern: /^\d+$/,
    },
  },
  {
    key: "isActive",
    label: "Active",
    type: "checkbox",
    section: "Inventory",
    gridCols: 1,
  },
];

export const productInitialData = {
  name: "",
  sku: "",
  category: "ELECTRONICS",
  price: "",
  cost: "",
  stock: "",
  isActive: true,
};
