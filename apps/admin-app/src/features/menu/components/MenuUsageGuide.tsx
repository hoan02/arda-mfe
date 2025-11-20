import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Eye, Edit, Trash2, Plus, HelpCircle } from "lucide-react";

export function MenuUsageGuide() {
  const title = "Hướng dẫn sử dụng";
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 text-sm text-muted-foreground">
          <div className="flex items-start gap-3">
            <Eye className="h-4 w-4 mt-0.5 text-blue-500" />
            <div>
              <strong>Xem:</strong> Click vào icon mắt để xem chi tiết menu
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Edit className="h-4 w-4 mt-0.5 text-purple-500" />
            <div>
              <strong>Sửa:</strong> Click vào icon bút để chỉnh sửa menu
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Plus className="h-4 w-4 mt-0.5 text-green-500" />
            <div>
              <strong>Thêm menu con:</strong> Click vào icon + để thêm menu con
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Trash2 className="h-4 w-4 mt-0.5 text-red-500" />
            <div>
              <strong>Xóa:</strong> Click vào icon thùng rác để xóa menu
            </div>
          </div>
          <div className="text-sm text-muted-foreground italic py-2">
            <strong>Lưu ý:</strong> Sử dụng menu dropdown (icon ...) ở cuối mỗi
            item để thực hiện các thao tác.
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
