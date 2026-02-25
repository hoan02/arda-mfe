export interface SessionDto {
  id: string;
  userId: string;
  username: string;
  ipAddress: string;
  start: number;
  lastAccess: number;
  clientId?: string;
}
