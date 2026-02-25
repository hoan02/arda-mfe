import React from "react";
import { Eye, Edit, Trash2, Plus, ArrowUpDown, Info } from "lucide-react";
import { cn } from "@workspace/ui/lib/utils";

interface GuideItemProps {
  icon: React.ElementType;
  title: string;
  description: string;
  colorClass: string;
  bgClass: string;
  borderClass: string;
}

function GuideItem({
  icon: Icon,
  title,
  description,
  colorClass,
  bgClass,
  borderClass,
}: GuideItemProps) {
  return (
    <div
      className={cn(
        "group flex items-center gap-4 p-4 rounded-xl border transition-all duration-200",
        bgClass,
        borderClass,
      )}
    >
      <div
        className={cn(
          "flex h-12 w-12 shrink-0 items-center justify-center rounded-lg transition-transform group-hover:scale-110",
          colorClass,
          "bg-white",
        )}
      >
        <Icon className="h-6 w-6" />
      </div>
      <div className="flex flex-col gap-1">
        <h4 className="font-semibold text-foreground leading-none">{title}</h4>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

export function MenuUsageGuide() {
  const guides = [
    {
      icon: Eye,
      title: "Xem chi tiết",
      description: "Xem toàn bộ cấu hình và thông tin kỹ thuật của mục menu.",
      colorClass: "text-blue-500",
      bgClass: "bg-blue-50/30 hover:bg-blue-50/50",
      borderClass: "border-blue-100",
    },
    {
      icon: Edit,
      title: "Cập nhật",
      description:
        "Thay đổi nhãn hiển thị, icon, màu sắc hoặc đường dẫn liên kết.",
      colorClass: "text-purple-500",
      bgClass: "bg-purple-50/30 hover:bg-purple-50/50",
      borderClass: "border-purple-100",
    },
    {
      icon: Plus,
      title: "Thêm menu con",
      description: "Mở rộng cấu trúc bằng cách thêm các mục mới vào bên dưới.",
      colorClass: "text-emerald-500",
      bgClass: "bg-emerald-50/30 hover:bg-emerald-50/50",
      borderClass: "border-emerald-100",
    },
    {
      icon: ArrowUpDown,
      title: "Sắp xếp",
      description: "Kéo thả linh hoạt để sắp xếp thứ tự menu hiển thị trong cùng 1 cấp.",
      colorClass: "text-amber-500",
      bgClass: "bg-amber-50/30 hover:bg-amber-50/50",
      borderClass: "border-amber-100",
    },
    {
      icon: Trash2,
      title: "Gỡ bỏ",
      description: "Xóa mục menu khỏi hệ thống. Hãy cẩn trọng khi thực hiện.",
      colorClass: "text-rose-500",
      bgClass: "bg-rose-50/30 hover:bg-rose-50/50",
      borderClass: "border-rose-100",
    },
  ];

  return (
    <div className="flex flex-col gap-4 py-2">
      <div className="flex items-center gap-2 mb-2 px-1">
        <div className="h-8 w-1 rounded-full bg-primary/40" />
        <p className="text-sm text-muted-foreground italic">
          Các thao tác quản lý cây menu điều hướng hệ thống:
        </p>
      </div>

      <div className="grid gap-3">
        {guides.map((guide, index) => (
          <GuideItem key={index} {...guide} />
        ))}
      </div>

      <div className="mt-4 flex gap-3 p-4 rounded-xl border border-dashed bg-muted/20">
        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Info className="h-3.5 w-3.5" />
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          <strong className="text-foreground">Mẹo:</strong> Sử dụng menu ngữ
          cảnh (icon <strong>...</strong>) ở cuối mỗi mục trong danh sách để
          truy cập nhanh tất cả các chức năng trên.
        </p>
      </div>
    </div>
  );
}
