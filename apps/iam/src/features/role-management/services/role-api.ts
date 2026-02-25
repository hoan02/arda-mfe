import { BaseApiClient } from "@workspace/shared";
import {
  RoleDto,
  CreateRoleRequest,
  UpdateRoleRequest
} from "../types/role.types";
import { UserDto } from "../../user-management/types/user.types";

class RoleApi extends BaseApiClient {
  constructor() {
    super("http://localhost:9080/api/iam/v1");
  }

  listRoles() {
    return this.get<RoleDto[]>("/roles");
  }

  getRole(id: string) {
    return this.get<RoleDto>(`/roles/${id}`);
  }

  createRole(request: CreateRoleRequest) {
    return this.post<RoleDto>("/roles", request);
  }

  updateRole(id: string, request: UpdateRoleRequest) {
    return this.put<RoleDto>(`/roles/${id}`, request);
  }

  deleteRole(id: string) {
    return this.delete(`/roles/${id}`);
  }

  setRolePermissions(roleId: string, permissionIds: string[]) {
    return this.put<RoleDto>(`/roles/${roleId}/permissions`, permissionIds);
  }

  getRoleUsers(roleId: string) {
    return this.get<UserDto[]>(`/roles/${roleId}/users`);
  }
}

export const roleApi = new RoleApi();
