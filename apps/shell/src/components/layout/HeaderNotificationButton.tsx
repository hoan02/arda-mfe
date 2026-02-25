import { Bell } from "lucide-react";
import { Button } from "@workspace/ui/components/button";

interface HeaderNotificationButtonProps {
  count?: number;
}

export function HeaderNotificationButton({
  count = 0,
}: HeaderNotificationButtonProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Notifications"
      className="h-8 w-8 relative"
      disabled
    >
      <Bell className="h-4 w-4" />
      {count > 0 && (
        <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-medium text-destructive-foreground">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </Button>
  );
}
