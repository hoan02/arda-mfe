import React from "react";
import { Home } from "lucide-react";

export function AppHeader() {
  return (
    <header className="sticky top-0 z-10 flex h-12 shrink-0 items-center gap-2 bg-background border-b transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-10">
      <div className="flex items-center gap-2 px-4">
        <div className="h-4 w-px bg-sidebar-border" />
      </div>
    </header>
  );
}
