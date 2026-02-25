export interface IamStatsDto {
  totalUsers: number;
  activeUsers: number;
  totalRoles: number;
  totalGroups: number;
  activeSessions: number;
  totalClients: number;
  totalPermissions: number;
  [key: string]: any; // Allow indexing by string for dashboard mapping
}
