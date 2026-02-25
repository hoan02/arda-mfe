import { BaseApiClient } from "@workspace/shared";
import {
  GroupDto,
  CreateGroupRequest,
  GroupMember
} from "../types/group.types";

class GroupApi extends BaseApiClient {
  constructor() {
    super("http://localhost:9080/api/iam/v1");
  }

  listGroups() {
    return this.get<GroupDto[]>("/groups");
  }

  getGroup(id: string) {
    return this.get<GroupDto>(`/groups/${id}`);
  }

  createGroup(request: CreateGroupRequest) {
    return this.post<{ id: string; name: string }>("/groups", request);
  }

  updateGroup(id: string, name: string) {
    return this.put(`/groups/${id}`, { name });
  }

  deleteGroup(id: string) {
    return this.delete(`/groups/${id}`);
  }

  getGroupMembers(groupId: string, first = 0, max = 50) {
    return this.get<GroupMember[]>(`/groups/${groupId}/members`, { first, max });
  }

  addGroupMember(groupId: string, userId: string) {
    return this.post(`/groups/${groupId}/members`, { userId });
  }

  removeGroupMember(groupId: string, userId: string) {
    return this.delete(`/groups/${groupId}/members/${userId}`);
  }
}

export const groupApi = new GroupApi();
