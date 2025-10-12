import { apiClient } from "../../../lib/api-client";
import { CreateUserRequest, UpdateUserRequest, UserDto } from "../../../types/api";

export interface CreateUserData {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  phoneNumber: string;
  status: "ACTIVE" | "INACTIVE" | "PENDING" | "SUSPENDED";
  role: "SUPER_ADMIN" | "ADMIN" | "MANAGER" | "USER";
  emailVerified: boolean;
}

export interface UpdateUserData {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  phoneNumber: string;
  status: "ACTIVE" | "INACTIVE" | "PENDING" | "SUSPENDED";
  role: "SUPER_ADMIN" | "ADMIN" | "MANAGER" | "USER";
  emailVerified: boolean;
}

// Create user
export async function createUser(userData: CreateUserData): Promise<UserDto> {
  const request: CreateUserRequest = {
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    username: userData.username,
    phoneNumber: userData.phoneNumber,
    role: userData.role,
    password: "TempPassword123!", // Default password, should be changed by user
  };

  const response = await apiClient.createUser(request);
  return response;
}

// Update user
export async function updateUser(userId: number, userData: UpdateUserData): Promise<UserDto> {
  const request: UpdateUserRequest = {
    firstName: userData.firstName,
    lastName: userData.lastName,
    phoneNumber: userData.phoneNumber,
    status: userData.status,
    role: userData.role,
    emailVerified: userData.emailVerified,
  };

  const response = await apiClient.updateUser(userId, request);
  return response;
}

// Delete user
export async function deleteUser(userId: number): Promise<void> {
  await apiClient.deleteUser(userId);
}

// Get user by ID
export async function getUserById(userId: number): Promise<UserDto> {
  const response = await apiClient.getUserById(userId);
  return response;
}
