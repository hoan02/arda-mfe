import * as React from "react";
import { cn } from "@workspace/ui/lib/utils";

interface PageHeaderProps {
  title: string;
  description?: string;
  /** Optional action element (e.g. a Button) rendered on the right side */
  action?: React.ReactNode;
  className?: string;
}

/**
 * Reusable page-level header with title, optional description and an optional
 * action slot (e.g. primary CTA button).
 *
 * Usage:
 * ```tsx
 * <PageHeader
 *   title="Quản lý Tenant"
 *   description="Quản lý tất cả các doanh nghiệp trong hệ thống"
 *   action={<Button onClick={...}>Tạo mới</Button>}
 * />
 * ```
 */
function PageHeader({
  title,
  description,
  action,
  className,
}: PageHeaderProps) {
  return (
    <div className={cn("flex items-start justify-between", className)}>
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        {description && (
          <p className="text-muted-foreground mt-1">{description}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

export { PageHeader };
export type { PageHeaderProps };
