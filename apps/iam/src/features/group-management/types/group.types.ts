export interface GroupDto {
  id: string;
  name: string;
  path: string;
  subGroups: GroupDto[];
  memberCount?: number;
}

export interface CreateGroupRequest {
  name: string;
  parentId?: string;
}

export interface GroupMember {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  enabled: boolean;
}
