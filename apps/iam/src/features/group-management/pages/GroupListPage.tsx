import { useState } from "react";
import {
  FolderTree,
  Plus,
  Users,
  Trash2,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import {
  useGroups,
  useCreateGroup,
  useDeleteGroup,
  useGroupMembers,
  useAddGroupMember,
  useRemoveGroupMember,
} from "../hooks/use-group-management";
import type { GroupDto } from "../types/group.types";

function GroupNode({
  group,
  level = 0,
  selected,
  onSelect,
}: {
  group: GroupDto;
  level?: number;
  selected: string | null;
  onSelect: (g: GroupDto) => void;
}) {
  const [expanded, setExpanded] = useState(true);
  const hasChildren = group.subGroups && group.subGroups.length > 0;

  return (
    <div>
      <div
        className={`flex items-center gap-2 rounded-md px-3 py-2 cursor-pointer transition-all text-sm ${
          selected === group.id
            ? "bg-primary/10 text-primary font-medium"
            : "hover:bg-muted/50"
        }`}
        style={{ paddingLeft: `${level * 20 + 12}px` }}
        onClick={() => onSelect(group)}
      >
        {hasChildren ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setExpanded(!expanded);
            }}
            className="p-0.5"
          >
            {expanded ? (
              <ChevronDown className="h-3.5 w-3.5" />
            ) : (
              <ChevronRight className="h-3.5 w-3.5" />
            )}
          </button>
        ) : (
          <span className="w-5" />
        )}
        <FolderTree className="h-4 w-4 text-muted-foreground" />
        <span>{group.name}</span>
      </div>
      {expanded &&
        hasChildren &&
        group.subGroups.map((child) => (
          <GroupNode
            key={child.id}
            group={child}
            level={level + 1}
            selected={selected}
            onSelect={onSelect}
          />
        ))}
    </div>
  );
}

export function GroupListPage() {
  const { data: groups, isLoading } = useGroups();
  const createGroup = useCreateGroup();
  const deleteGroup = useDeleteGroup();

  const [selectedGroup, setSelectedGroup] = useState<GroupDto | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");

  const { data: members } = useGroupMembers(selectedGroup?.id ?? null);

  const handleCreate = () => {
    if (!newGroupName.trim()) return;
    createGroup.mutate(
      { name: newGroupName, parentId: selectedGroup?.id },
      {
        onSuccess: () => {
          setShowCreate(false);
          setNewGroupName("");
        },
      },
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Quản lý Nhóm</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Tổ chức người dùng theo nhóm phân cấp
          </p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-4 w-4" />
          {selectedGroup ? "Tạo nhóm con" : "Tạo nhóm"}
        </button>
      </div>

      <div className="grid grid-cols-12 gap-4">
        {/* Tree */}
        <div className="col-span-5 rounded-lg border bg-card p-3 max-h-[70vh] overflow-y-auto">
          {isLoading ? (
            <div className="text-center py-8 text-muted-foreground">
              Đang tải...
            </div>
          ) : groups && groups.length > 0 ? (
            groups.map((group) => (
              <GroupNode
                key={group.id}
                group={group}
                selected={selectedGroup?.id ?? null}
                onSelect={setSelectedGroup}
              />
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <FolderTree className="h-10 w-10 mx-auto mb-2 opacity-20" />
              <p>Chưa có nhóm nào</p>
            </div>
          )}
        </div>

        {/* Members */}
        <div className="col-span-7">
          {selectedGroup ? (
            <div className="rounded-lg border bg-card">
              <div className="border-b px-4 py-3 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{selectedGroup.name}</h3>
                  <p className="text-xs text-muted-foreground">
                    {selectedGroup.path}
                  </p>
                </div>
                <button
                  onClick={() => {
                    if (confirm(`Xóa nhóm "${selectedGroup.name}"?`)) {
                      deleteGroup.mutate(selectedGroup.id);
                      setSelectedGroup(null);
                    }
                  }}
                  className="rounded-md p-1.5 hover:bg-destructive/10 transition-colors"
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </button>
              </div>
              <div className="p-4">
                <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Thành viên ({members?.length ?? 0})
                </h4>
                {members && members.length > 0 ? (
                  <div className="space-y-2">
                    {members.map((m) => (
                      <div
                        key={m.id}
                        className="flex items-center justify-between rounded-md border px-3 py-2 text-sm"
                      >
                        <div className="flex items-center gap-2">
                          <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary">
                            {m.firstName?.[0]?.toUpperCase() ??
                              m.email[0].toUpperCase()}
                          </div>
                          <div>
                            <p className="font-medium">
                              {m.firstName} {m.lastName}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {m.email}
                            </p>
                          </div>
                        </div>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${m.enabled ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                        >
                          {m.enabled ? "Hoạt động" : "Vô hiệu"}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Chưa có thành viên
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
              <div className="text-center">
                <FolderTree className="h-12 w-12 mx-auto mb-2 opacity-20" />
                <p>Chọn một nhóm để xem thành viên</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Create Dialog */}
      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setShowCreate(false)}
          />
          <div className="relative z-50 w-full max-w-sm rounded-lg border bg-card p-6 shadow-xl">
            <h2 className="text-lg font-semibold mb-4">
              {selectedGroup
                ? `Tạo nhóm con của "${selectedGroup.name}"`
                : "Tạo nhóm mới"}
            </h2>
            <div className="space-y-3">
              <input
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Tên nhóm"
                autoFocus
              />
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <button
                onClick={() => setShowCreate(false)}
                className="rounded-md border px-4 py-2 text-sm hover:bg-muted"
              >
                Hủy
              </button>
              <button
                onClick={handleCreate}
                disabled={createGroup.isPending}
                className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
              >
                {createGroup.isPending ? "Đang tạo..." : "Tạo"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
