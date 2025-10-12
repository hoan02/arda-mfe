"use client";

import React, { useState, useCallback } from "react";
import { DataTable } from "@workspace/ui/components/data-table/data-table";
import { UserDto } from "../../types/api";
import { Button } from "@workspace/ui/components/button";
import { Plus, UserCheck, UserX, Mail, Trash2 } from "lucide-react";
import { createUsersColumns } from "./columns";
import { fetchUsersData } from "./utils/data-fetching";
import { userApiClient } from "./utils/user-api-client";
import { UserDetailDialog, UserDeleteDialog } from "./components";
import { useUserOperations } from "./hooks/useUserOperations";

export function UsersManagement() {
  const [showUserDialog, setShowUserDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserDto | null>(null);
  const [dialogAction, setDialogAction] = useState<"view" | "edit" | "create">(
    "view"
  );
  const [refreshKey, setRefreshKey] = useState(0);

  const { createUser, updateUser, deleteUser, isLoading } = useUserOperations();

  // Handle row clicks to open user detail dialog
  const handleRowClick = useCallback((user: UserDto, rowIndex: number) => {
    setSelectedUser(user);
    setDialogAction("view");
    setShowUserDialog(true);
  }, []);

  // Handle user actions
  const handleEditUser = useCallback((user: UserDto) => {
    setSelectedUser(user);
    setDialogAction("edit");
    setShowUserDialog(true);
  }, []);

  const handleDeleteUserClick = useCallback((user: UserDto) => {
    setSelectedUser(user);
    setShowDeleteDialog(true);
  }, []);

  const handleViewUser = useCallback((user: UserDto) => {
    setSelectedUser(user);
    setDialogAction("view");
    setShowUserDialog(true);
  }, []);

  const handleCreateUserClick = useCallback(() => {
    setSelectedUser(null);
    setDialogAction("create");
    setShowUserDialog(true);
  }, []);

  const handleActivateUser = useCallback(async (id: number) => {
    // Implement activate user logic
    console.log("Activate user:", id);
  }, []);

  const handleDeactivateUser = useCallback(async (id: number) => {
    // Implement deactivate user logic
    console.log("Deactivate user:", id);
  }, []);

  const handleVerifyEmail = useCallback(async (id: number) => {
    // Implement verify email logic
    console.log("Verify email:", id);
  }, []);

  const handleUserSuccess = async (userData: any) => {
    let success = false;

    if (dialogAction === "create") {
      success = await createUser(userData);
    } else if (dialogAction === "edit" && selectedUser) {
      success = await updateUser(selectedUser.id, userData);
    }

    if (success) {
      setShowUserDialog(false);
      setSelectedUser(null);
      // Trigger data refresh
      setRefreshKey((prev) => prev + 1);
    }
  };

  const handleDeleteUserSuccess = async () => {
    if (selectedUser) {
      const success = await deleteUser(selectedUser.id);

      if (success) {
        setShowDeleteDialog(false);
        setSelectedUser(null);
        // Trigger data refresh
        setRefreshKey((prev) => prev + 1);
      }
    }
  };

  // Create columns with action handlers
  const getColumns = useCallback(
    (handleRowDeselection: ((rowId: string) => void) | null | undefined) => {
      return createUsersColumns({
        onEditUser: handleEditUser,
        onDeleteUser: handleDeleteUserClick,
        onViewUser: handleViewUser,
        onActivateUser: handleActivateUser,
        onDeactivateUser: handleDeactivateUser,
        onVerifyEmail: handleVerifyEmail,
      });
    },
    [
      handleEditUser,
      handleDeleteUserClick,
      handleViewUser,
      handleActivateUser,
      handleDeactivateUser,
      handleVerifyEmail,
    ]
  );

  // Custom toolbar content for bulk actions
  const renderToolbarContent = useCallback(
    ({
      selectedRows,
      allSelectedIds,
      totalSelectedCount,
      resetSelection,
    }: {
      selectedRows: UserDto[];
      allSelectedIds: string[];
      totalSelectedCount: number;
      resetSelection: () => void;
    }) => {
      if (totalSelectedCount === 0) return null;

      return (
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">
            {totalSelectedCount} user(s) selected
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              // Implement bulk activate
              console.log("Bulk activate:", allSelectedIds);
              resetSelection();
            }}
          >
            <UserCheck className="h-4 w-4" />
            Activate
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              // Implement bulk deactivate
              console.log("Bulk deactivate:", allSelectedIds);
              resetSelection();
            }}
          >
            <UserX className="h-4 w-4" />
            Deactivate
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              // Implement bulk verify
              console.log("Bulk verify:", allSelectedIds);
              resetSelection();
            }}
          >
            <Mail className="h-4 w-4" />
            Verify Email
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => {
              // Implement bulk delete
              console.log("Bulk delete:", allSelectedIds);
              resetSelection();
            }}
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
        </div>
      );
    },
    []
  );

  // Export configuration
  const exportConfig = {
    entityName: "users",
    columnMapping: {
      id: "ID",
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email",
      username: "Username",
      status: "Status",
      role: "Role",
      emailVerified: "Email Verified",
      createdAt: "Created At",
      updatedAt: "Updated At",
    },
    columnWidths: [
      { wch: 5 }, // ID
      { wch: 20 }, // First Name
      { wch: 15 }, // Last Name
      { wch: 25 }, // Email
      { wch: 15 }, // Username
      { wch: 12 }, // Status
      { wch: 12 }, // Role
      { wch: 15 }, // Email Verified
      { wch: 20 }, // Created At
      { wch: 20 }, // Updated At
    ],
    headers: [
      "id",
      "firstName",
      "lastName",
      "email",
      "username",
      "status",
      "role",
      "emailVerified",
      "createdAt",
      "updatedAt",
    ],
  };

  return (
    <div className="h-full max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Users Management</h1>
          <p className="text-gray-600">Manage and monitor user accounts</p>
        </div>
        <Button
          onClick={handleCreateUserClick}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add User
        </Button>
      </div>

      {/* Data Table */}
      <DataTable<UserDto, any>
        key={refreshKey}
        getColumns={getColumns}
        exportConfig={exportConfig}
        fetchDataFn={fetchUsersData}
        fetchByIdsFn={userApiClient.getUsersByIds.bind(userApiClient)}
        idField="id"
        pageSizeOptions={[10, 20, 50, 100]}
        onRowClick={handleRowClick}
        renderToolbarContent={renderToolbarContent}
        config={{
          enableRowSelection: true,
          enableSearch: true,
          enableDateFilter: true,
          enableColumnVisibility: true,
          enableUrlState: true,
          enableToolbar: true,
          enablePagination: true,
          enableColumnResizing: true,
          enableKeyboardNavigation: true,
          enableClickRowSelect: false,
          defaultSortBy: "createdAt",
          defaultSortOrder: "desc",
        }}
      />

      {/* Dialogs */}
      <UserDetailDialog
        open={showUserDialog}
        onOpenChange={setShowUserDialog}
        action={dialogAction}
        user={selectedUser || undefined}
        onSuccess={handleUserSuccess}
        isLoading={isLoading}
      />

      {selectedUser && (
        <UserDeleteDialog
          open={showDeleteDialog}
          onOpenChange={setShowDeleteDialog}
          user={selectedUser}
          onConfirm={handleDeleteUserSuccess}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}
