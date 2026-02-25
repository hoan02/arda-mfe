import React from "react";
import { SidebarTrigger } from "@workspace/ui/components/sidebar";
import { BreadcrumbNav } from "./BreadcrumbNav";
import { HeaderDarkModeToggle } from "./HeaderDarkModeToggle";
import { HeaderLanguageSwitcher } from "./HeaderLanguageSwitcher";
import { HeaderNotificationButton } from "./HeaderNotificationButton";
import { HeaderAccountMenu } from "./HeaderAccountMenu";

export function AppHeader() {
  return (
    <header className="sticky top-0 z-10 flex h-12 shrink-0 items-center gap-2 bg-background border-b transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-10">
      {/* Left: Sidebar trigger + breadcrumb */}
      <div className="flex items-center gap-2 px-2 flex-1 min-w-0">
        <SidebarTrigger />
        <div className="h-4 w-px bg-sidebar-border" />
        <BreadcrumbNav />
      </div>

      {/* Right: Action controls */}
      <div className="flex items-center gap-1 px-2 shrink-0">
        <HeaderDarkModeToggle />
        <HeaderLanguageSwitcher />
        <HeaderNotificationButton />
        <HeaderAccountMenu />
      </div>
    </header>
  );
}
