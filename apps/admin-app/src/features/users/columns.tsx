import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { UserDto } from "../../types/api";
import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import { Checkbox } from "@workspace/ui/components/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import {
  MoreHorizontal,
  Trash2,
  UserCheck,
  UserX,
  Mail,
  Edit,
  Eye,
} from "lucide-react";

interface UsersTableProps {
  onEditUser: (user: UserDto) => void;
  onDeleteUser: (user: UserDto) => void;
  onViewUser: (user: UserDto) => void;
  onActivateUser: (id: number) => void;
  onDeactivateUser: (id: number) => void;
  onVerifyEmail: (id: number) => void;
  selectedRows: number[];
  onSelectRow: (userId: number) => void;
  onSelectAll: () => void;
  users: UserDto[];
}

export function createUsersColumns({
  onEditUser,
  onDeleteUser,
  onViewUser,
  onActivateUser,
  onDeactivateUser,
  onVerifyEmail,
}: Omit<
  UsersTableProps,
  "selectedRows" | "onSelectRow" | "onSelectAll" | "users"
>): ColumnDef<UserDto>[] {
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "default" as const;
      case "INACTIVE":
        return "secondary" as const;
      case "PENDING":
        return "outline" as const;
      case "SUSPENDED":
        return "destructive" as const;
      default:
        return "secondary" as const;
    }
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "SUPER_ADMIN":
        return "destructive" as const;
      case "ADMIN":
        return "default" as const;
      case "MANAGER":
        return "secondary" as const;
      case "USER":
        return "outline" as const;
      default:
        return "outline" as const;
    }
  };

  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => (
        <div className="text-sm text-gray-500">#{row.getValue("id")}</div>
      ),
      enableSorting: true,
    },
    {
      accessorKey: "firstName",
      header: "User",
      cell: ({ row }) => {
        const user = row.original;
        return (
          <div>
            <div className="font-medium">
              {user.firstName} {user.lastName}
            </div>
            <div className="text-sm text-gray-500">{user.email}</div>
            <div className="text-xs text-gray-400">@{user.username}</div>
          </div>
        );
      },
      enableSorting: true,
      enableHiding: true,
      size: 500,
    },
    {
      accessorKey: "phoneNumber",
      header: "Phone",
      cell: ({ row }) => {
        const phone = row.getValue("phoneNumber") as string;
        return <div className="text-sm text-gray-500">{phone || "N/A"}</div>;
      },
      enableSorting: true,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge variant={getStatusBadgeVariant(row.getValue("status"))}>
          {row.getValue("status")}
        </Badge>
      ),
      enableSorting: true,
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => (
        <Badge variant={getRoleBadgeVariant(row.getValue("role"))}>
          {row.getValue("role")}
        </Badge>
      ),
      enableSorting: true,
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: "emailVerified",
      header: "Email Verified",
      cell: ({ row }) => (
        <Badge
          variant={row.getValue("emailVerified") ? "default" : "secondary"}
        >
          {row.getValue("emailVerified") ? "Verified" : "Unverified"}
        </Badge>
      ),
      enableSorting: true,
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: "createdAt",
      header: "Created",
      cell: ({ row }) => (
        <div className="text-sm text-gray-500">
          {new Date(row.getValue("createdAt")).toLocaleDateString()}
        </div>
      ),
      enableSorting: true,
    },
    {
      accessorKey: "updatedAt",
      header: "Updated",
      cell: ({ row }) => {
        const updatedAt = row.getValue("updatedAt") as string;
        return (
          <div className="text-sm text-gray-500">
            {updatedAt ? new Date(updatedAt).toLocaleDateString() : "N/A"}
          </div>
        );
      },
      enableSorting: true,
    },
    {
      accessorKey: "lastLoginAt",
      header: "Last Login",
      cell: ({ row }) => {
        const lastLoginAt = row.getValue("lastLoginAt") as string;
        return (
          <div className="text-sm text-gray-500">
            {lastLoginAt ? new Date(lastLoginAt).toLocaleDateString() : "Never"}
          </div>
        );
      },
      enableSorting: true,
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const user = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  onViewUser(user);
                }}
              >
                <Eye className="h-4 w-4" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  onEditUser(user);
                }}
              >
                <Edit className="h-4 w-4" />
                Edit User
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  onActivateUser(user.id);
                }}
              >
                <UserCheck className="h-4 w-4" />
                Activate
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  onDeactivateUser(user.id);
                }}
              >
                <UserX className="h-4 w-4" />
                Deactivate
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  onVerifyEmail(user.id);
                }}
              >
                <Mail className="h-4 w-4" />
                Verify Email
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteUser(user);
                }}
                className="text-red-600"
              >
                <Trash2 className="h-4 w-4" />
                Delete User
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
      enableSorting: false,
      enableHiding: false,
    },
  ];
}
