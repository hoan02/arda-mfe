import React from "react";
import { Users } from "lucide-react";

export function UserListPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4 p-6">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
        <Users className="h-10 w-10 text-muted-foreground" />
      </div>
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Quản lý Người dùng
        </h1>
        <p className="text-muted-foreground text-lg">
          Tính năng đang được phát triển...
        </p>
      </div>
    </div>
  );
}
