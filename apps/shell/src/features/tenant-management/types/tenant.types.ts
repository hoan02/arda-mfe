export interface TenantListItem {
  key: string;
  name: string;
  primaryColor?: string;
  logo?: string;
  dbType: "POSTGRES" | "ORACLE";
  status: "ACTIVE" | "INACTIVE" | "TRIAL" | "SUSPENDED";
}

export interface TenantDetail extends TenantListItem {
  jdbcUrl: string;
  dbUsername: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTenantRequest {
  tenantKey: string;
  displayName: string;
  logoUrl?: string;
  primaryColor?: string;
  dbType: "POSTGRES" | "ORACLE";
  jdbcUrl: string;
  dbUsername: string;
  dbPassword: string;
  driverClassName: string;
}

export interface UpdateTenantRequest {
  displayName?: string;
  primaryColor?: string;
  logoUrl?: string;
}

export interface UpdateStatusRequest {
  status: "ACTIVE" | "INACTIVE" | "TRIAL" | "SUSPENDED";
}

export type TenantStatus = "ACTIVE" | "INACTIVE" | "TRIAL" | "SUSPENDED";
export type DbType = "POSTGRES" | "ORACLE";

export interface DbTypeOption {
  label: string;
  value: DbType;
  driverClass: string;
  defaultPort: number;
}

export const DB_TYPE_OPTIONS: DbTypeOption[] = [
  {
    label: "PostgreSQL",
    value: "POSTGRES",
    driverClass: "org.postgresql.Driver",
    defaultPort: 5432,
  },
  {
    label: "Oracle",
    value: "ORACLE",
    driverClass: "oracle.jdbc.OracleDriver",
    defaultPort: 1521,
  },
];

export const STATUS_OPTIONS = [
  { label: "Hoạt động", value: "ACTIVE" as TenantStatus },
  { label: "Không hoạt động", value: "INACTIVE" as TenantStatus },
  { label: "Dùng thử", value: "TRIAL" as TenantStatus },
  { label: "Tạm ngưng", value: "SUSPENDED" as TenantStatus },
];
