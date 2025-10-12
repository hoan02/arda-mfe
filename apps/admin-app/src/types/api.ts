// API Types for Admin Service
export interface ApiResponse<T> {
  data: T;
  message?: string;
  timestamp: string;
}

export interface PagedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  numberOfElements: number;
}

// User API Types
export interface UserDto {
  id: number;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED' | 'PENDING';
  role: 'SUPER_ADMIN' | 'ADMIN' | 'MANAGER' | 'USER';
  lastLogin?: string;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
  updatedBy?: string;
  [key: string]: any; // Index signature for ExportableData constraint
}

export interface CreateUserRequest {
  username: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  role?: 'SUPER_ADMIN' | 'ADMIN' | 'MANAGER' | 'USER';
}

export interface UpdateUserRequest {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  status?: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED' | 'PENDING';
  role?: 'SUPER_ADMIN' | 'ADMIN' | 'MANAGER' | 'USER';
  emailVerified?: boolean;
}

export interface UserFilterRequest {
  search?: string;
  status?: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED' | 'PENDING';
  role?: 'SUPER_ADMIN' | 'ADMIN' | 'MANAGER' | 'USER';
  emailVerified?: boolean;
  createdFrom?: string;
  createdTo?: string;
  lastLoginFrom?: string;
  lastLoginTo?: string;
  page?: number;
  size?: number;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
}

// Dashboard API Types
export interface DashboardOverview {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  suspendedUsers: number;
  pendingUsers: number;
  adminUsers: number;
  managerUsers: number;
  regularUsers: number;
  verifiedUsers: number;
  unverifiedUsers: number;
  lastUpdated: string;
}

export interface UserGrowthStats {
  dailyGrowth: Record<string, number>;
  totalGrowth: number;
  averageDailyGrowth: number;
}

export interface RecentActivity {
  id: number;
  type: string;
  description: string;
  timestamp: string;
  user: string;
}

export interface RecentActivities {
  activities: RecentActivity[];
  totalActivities: number;
}

export interface SystemHealth {
  status: string;
  database: string;
  uptime: string;
  lastCheck: string;
  version: string;
}

// Audit Log API Types
export interface AuditLog {
  id: number;
  actionType: string;
  entityType: string;
  entityId: string;
  entityName: string;
  oldValues?: Record<string, any>;
  newValues?: Record<string, any>;
  userId?: number;
  username?: string;
  ipAddress?: string;
  userAgent?: string;
  createdAt: string;
}

export interface AuditLogFilterRequest {
  actionType?: string;
  entityType?: string;
  userId?: number;
  username?: string;
  createdFrom?: string;
  createdTo?: string;
  page?: number;
  size?: number;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
}

// Health Check Types
export interface HealthStatus {
  status: string;
  message: string;
}

// Error Types
export interface ApiError {
  error: string;
  message: string;
  timestamp: string;
  status: number;
}
