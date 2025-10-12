import { FieldConfig } from "@workspace/ui/components/entity-detail-dialog";
import { User, Mail, Phone, Shield } from "lucide-react";

export const userFields: FieldConfig[] = [
  // Basic Information Section
  {
    key: "firstName",
    label: "First Name",
    type: "text",
    required: true,
    icon: User,
    section: "Basic Information",
    gridCols: 1,
  },
  {
    key: "lastName",
    label: "Last Name",
    type: "text",
    required: true,
    icon: User,
    section: "Basic Information",
    gridCols: 1,
  },
  {
    key: "username",
    label: "Username",
    type: "text",
    required: true,
    icon: User,
    section: "Basic Information",
    gridCols: 1,
  },
  {
    key: "phoneNumber",
    label: "Phone Number",
    type: "phone",
    icon: Phone,
    section: "Basic Information",
    gridCols: 1,
  },

  // Contact Information Section
  {
    key: "email",
    label: "Email Address",
    type: "email",
    required: true,
    icon: Mail,
    section: "Contact Information",
    gridCols: 2,
    validation: {
      pattern: /\S+@\S+\.\S+/,
    },
  },

  // Account Status Section
  {
    key: "status",
    label: "Status",
    type: "select",
    icon: Shield,
    section: "Account Status",
    gridCols: 1,
    options: [
      { value: "ACTIVE", label: "Active" },
      { value: "INACTIVE", label: "Inactive" },
      { value: "PENDING", label: "Pending" },
      { value: "SUSPENDED", label: "Suspended" },
    ],
  },
  {
    key: "role",
    label: "Role",
    type: "select",
    icon: Shield,
    section: "Account Status",
    gridCols: 1,
    options: [
      { value: "USER", label: "User" },
      { value: "MANAGER", label: "Manager" },
      { value: "ADMIN", label: "Admin" },
      { value: "SUPER_ADMIN", label: "Super Admin" },
    ],
  },
  {
    key: "emailVerified",
    label: "Email Verified",
    type: "checkbox",
    section: "Account Status",
    gridCols: 2,
  },
];

export const userInitialData = {
  firstName: "",
  lastName: "",
  email: "",
  username: "",
  phoneNumber: "",
  status: "ACTIVE",
  role: "USER",
  emailVerified: false,
};
