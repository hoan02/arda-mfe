import { BaseApiClient } from "@workspace/shared";
import { PermissionDto } from "../types/permission.types";

class PermissionApi extends BaseApiClient {
  constructor() {
    super("http://localhost:9080/api/iam/v1");
  }

  listPermissions() {
    return this.get<PermissionDto[]>("/permissions");
  }

  getPermissionsByResource() {
    return this.get<Record<string, PermissionDto[]>>("/permissions/by-resource");
  }

  getResources() {
    return this.get<string[]>("/permissions/resources");
  }
}

export const permissionApi = new PermissionApi();
