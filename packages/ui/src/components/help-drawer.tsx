import * as React from "react";
import { HelpCircle } from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@workspace/ui/components/sheet";
import { cn } from "@workspace/ui/lib/utils";

interface HelpDrawerProps {
  /** Title shown in the sheet header */
  title?: string;
  /** Help content rendered inside the sheet */
  children: React.ReactNode;
  /** Trigger button label (sr-only by default, shown as tooltip) */
  triggerLabel?: string;
  className?: string;
}

/**
 * A reusable help drawer that slides in from the right.
 * Designed to be placed in the `action` slot of `<PageHeader>` alongside
 * other actions, or anywhere as a standalone trigger button.
 *
 * Usage:
 * ```tsx
 * <HelpDrawer title="Hướng dẫn sử dụng">
 *   <MyUsageGuideContent />
 * </HelpDrawer>
 * ```
 */
function HelpDrawer({
  title = "Hướng dẫn sử dụng",
  triggerLabel = "Hướng dẫn",
  children,
  className,
}: HelpDrawerProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn("gap-1.5", className)}
          aria-label={triggerLabel}
        >
          <HelpCircle className="h-4 w-4" />
          <span>{triggerLabel}</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-muted-foreground" />
            {title}
          </SheetTitle>
        </SheetHeader>
        <div className="mx-6">{children}</div>
      </SheetContent>
    </Sheet>
  );
}

export { HelpDrawer };
export type { HelpDrawerProps };
