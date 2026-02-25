import { BaseApiClient, PageResponse } from "@workspace/shared";
import {
  UserDto,
  CreateUserRequest,
  UpdateUserRequest,
  ResetPasswordRequest
} from "../types/user.types";
import { SessionDto } from "../../session-management/types/session.types";

class UserApi extends BaseApiClient {
  constructor() {
    super("http://localhost:9080/api/iam/v1");
  }

  listUsers(params?: { page?: number; size?: number; search?: string; department?: string; isActive?: boolean }) {
    return this.get<PageResponse<UserDto>>("/users", {
      page: params?.page ?? 0,
      size: params?.size ?? 20,
      search: params?.search,
      department: params?.department,
      isActive: params?.isActive,
    });
  }

  getUser(id: string) {
    return this.get<UserDto>(`/users/${id}`);
  }

  createUser(request: CreateUserRequest) {
    return this.post<UserDto>("/users", request);
  }

  updateUser(id: string, request: UpdateUserRequest) {
    return this.put<UserDto>(`/users/${id}`, request);
  }

  deleteUser(id: string) {
    return this.delete(`/users/${id}`);
  }

  resetPassword(id: string, request: ResetPasswordRequest) {
    return this.post<{ message: string }>(`/users/${id}/reset-password`, request);
  }

  assignRole(userId: string, roleId: string) {
    return this.post<UserDto>(`/users/${userId}/roles`, { roleId });
  }

  removeRole(userId: string, roleId: string) {
    return this.delete(`/users/${userId}/roles/${roleId}`);
  }

  getUserSessions(userId: string) {
    return this.get<SessionDto[]>(`/users/${userId}/sessions`);
  }
}

export const userApi = new UserApi();
