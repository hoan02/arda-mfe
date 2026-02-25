import { PermissionDto } from "../../permission-management/types/permission.types";

export interface RoleDto {
  id: string;
  name: string;
  description: string;
  isSystem: boolean;
  permissions: PermissionDto[];
  createdAt: string;
  updatedAt: string;
}

export interface RoleDtoSimple {
  id: string;
  name: string;
  description: string;
  isSystem: boolean;
}

export interface CreateRoleRequest {
  name: string;
  description?: string;
  isSystem?: boolean;
}

export interface UpdateRoleRequest {
  name?: string;
  description?: string;
  permissionIds?: string[];
}
