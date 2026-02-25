import React from "react";
import { MenuTreeManager } from "../components/MenuTreeManager";
import { MenuUsageGuide } from "../components/MenuUsageGuide";
import { PageHeader } from "@workspace/ui/components/page-header";
import { HelpDrawer } from "@workspace/ui/components/help-drawer";

export function MenuPage() {
  return (
    <div className="space-y-6 p-6">
      <PageHeader
        title="Quản lý Menu"
        description="Cấu hình cây menu điều hướng hiển thị trong hệ thống"
        action={
          <HelpDrawer title="Hướng dẫn quản lý Menu">
            <MenuUsageGuide />
          </HelpDrawer>
        }
      />
      <MenuTreeManager />
    </div>
  );
}
