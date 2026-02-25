import { BaseApiClient } from "@workspace/shared/lib/base-api-client";
import type {
  TenantListItem,
  TenantDetail,
  CreateTenantRequest,
  UpdateTenantRequest,
} from "../types/tenant.types";

class TenantApiClient extends BaseApiClient {
  constructor() {
    super("http://localhost:9080/api/central/v1");
  }

  listTenants() {
    return this.get<TenantListItem[]>("/tenants");
  }

  getTenantDetails(tenantKey: string) {
    return this.get<TenantDetail>(`/tenants/${tenantKey}/details`);
  }

  createTenant(request: CreateTenantRequest) {
    return this.post<{ success: boolean; tenantKey: string }>(
      "/tenants",
      request
    );
  }

  updateTenant(tenantKey: string, request: UpdateTenantRequest) {
    return this.put<TenantDetail>(`/tenants/${tenantKey}`, request);
  }

  updateStatus(tenantKey: string, status: string) {
    return this.patch<TenantDetail>(`/tenants/${tenantKey}/status`, { status });
  }

  deleteTenant(tenantKey: string) {
    return this.delete(`/tenants/${tenantKey}`);
  }
}

export const tenantApiClient = new TenantApiClient();
