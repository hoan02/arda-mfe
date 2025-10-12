import { BaseApiClient } from "@workspace/shared/lib/base-api-client";
import {
  PagedResponse,
  UserDto,
  CreateUserRequest,
  UpdateUserRequest,
  UserFilterRequest,
  DashboardOverview,
  UserGrowthStats,
  RecentActivities,
  SystemHealth,
  AuditLog,
  AuditLogFilterRequest,
} from '../../../types/api';

export class UserApiClient extends BaseApiClient {
  constructor() {
    super('http://localhost:8000/api/v1');
  }

  // User CRUD operations
  async getUsers(filters: UserFilterRequest = {}): Promise<PagedResponse<UserDto>> {
    return this.get<PagedResponse<UserDto>>('/users', filters);
  }

  async getUserById(id: number): Promise<UserDto> {
    return this.get<UserDto>(`/users/${id}`);
  }

  async getUserByUsername(username: string): Promise<UserDto> {
    return this.get<UserDto>(`/users/username/${username}`);
  }

  async getUserByEmail(email: string): Promise<UserDto> {
    return this.get<UserDto>(`/users/email/${email}`);
  }

  async createUser(userData: CreateUserRequest): Promise<UserDto> {
    return this.post<UserDto>('/users', userData);
  }

  async updateUser(id: number, userData: UpdateUserRequest): Promise<UserDto> {
    return this.put<UserDto>(`/users/${id}`, userData);
  }

  async deleteUser(id: number): Promise<void> {
    return this.delete(`/users/${id}`);
  }

  // User status operations
  async activateUser(id: number): Promise<void> {
    return this.patch(`/users/${id}/activate`);
  }

  async deactivateUser(id: number): Promise<void> {
    return this.patch(`/users/${id}/deactivate`);
  }

  async verifyUserEmail(id: number): Promise<void> {
    return this.patch(`/users/${id}/verify-email`);
  }

  // User statistics
  async getUserStatsCount(): Promise<Record<string, number>> {
    return this.get<Record<string, number>>('/users/stats/count');
  }

  async getUserStatsByStatus(): Promise<Record<string, number>> {
    return this.get<Record<string, number>>('/users/stats/by-status');
  }

  async getUserStatsByRole(): Promise<Record<string, number>> {
    return this.get<Record<string, number>>('/users/stats/by-role');
  }

  async getUsersByIds(ids: number[] | string[]): Promise<UserDto[]> {
    return this.post<UserDto[]>('/users/by-ids', { ids });
  }

  // Dashboard APIs (user-related)
  async getDashboardOverview(): Promise<DashboardOverview> {
    return this.get<DashboardOverview>('/dashboard/overview');
  }

  async getUserGrowthStats(): Promise<UserGrowthStats> {
    return this.get<UserGrowthStats>('/dashboard/user-growth');
  }

  async getRecentActivities(): Promise<RecentActivities> {
    return this.get<RecentActivities>('/dashboard/recent-activities');
  }

  async getSystemHealth(): Promise<SystemHealth> {
    return this.get<SystemHealth>('/dashboard/system-health');
  }

  // Audit Log APIs (user-related)
  async getAuditLogs(filters: AuditLogFilterRequest = {}): Promise<PagedResponse<AuditLog>> {
    return this.get<PagedResponse<AuditLog>>('/audit-logs', filters);
  }

  async getAuditLogById(id: number): Promise<AuditLog> {
    return this.get<AuditLog>(`/audit-logs/${id}`);
  }

  async getAuditLogStats(): Promise<Record<string, number>> {
    return this.get<Record<string, number>>('/audit-logs/stats');
  }
}

// Export singleton instance
export const userApiClient = new UserApiClient();
