import { RoleDtoSimple } from "../../role-management/types/role.types";
import { SessionDto } from "../../session-management/types/session.types";

export interface UserDto {
  id: string;
  keycloakId: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  department: string;
  isActive: boolean;
  roles: RoleDtoSimple[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserRequest {
  email: string;
  firstName: string;
  lastName?: string;
  department?: string;
  temporaryPassword: string;
}

export interface UpdateUserRequest {
  department?: string;
  isActive?: boolean;
}

export interface ResetPasswordRequest {
  newPassword: string;
  temporary?: boolean;
}
