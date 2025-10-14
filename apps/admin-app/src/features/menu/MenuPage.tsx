import { useState } from "react";
import { Button } from "@workspace/ui/components/button";
import { Card } from "@workspace/ui/components/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog";
import { MenuTreeManager } from "./components/MenuTreeManager";
import { MenuDetails } from "./components/MenuDetails";
import { MenuForm } from "./MenuForm";
import { Eye, Edit, Trash2, Plus, HelpCircle } from "lucide-react";

export default function MenuPage() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<any>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [detailsMenu, setDetailsMenu] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMenu, setDialogMenu] = useState<any>(null);
  const [dialogMode, setDialogMode] = useState<"view" | "edit">("view");

  const handleAddMenu = () => {
    setOpen(true);
  };

  const handleFormSuccess = () => {
    setSelected(null);
  };

  const handleViewMenu = (menu: any) => {
    setDialogMenu(menu);
    setDialogMode("view");
    setDialogOpen(true);
  };

  const handleEditMenu = (menu: any) => {
    setDialogMenu(menu);
    setDialogMode("edit");
    setDialogOpen(true);
  };

  const handleDeleteMenu = (menu: any) => {
    if (confirm(`Xóa menu "${menu.label}"?`)) {
      // TODO: Implement delete logic
      console.log("Delete menu:", menu);
    }
  };

  const handleAddSubMenu = (menu: any) => {
    // TODO: Implement add submenu logic
    console.log("Add submenu to:", menu);
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Quản lý Menu</h1>
        <Button onClick={handleAddMenu}>+ Thêm menu</Button>
      </div>
      <div className="flex gap-4">
        <div className="flex-1">
          <MenuTreeManager
            onSelectMenu={(m) => setSelected(m)}
            onViewMenu={handleViewMenu}
            onEditMenu={handleEditMenu}
            onDeleteMenu={handleDeleteMenu}
            onAddSubMenu={handleAddSubMenu}
          />
        </div>
        <div className="w-[500px] lg:w-[600px]">
          {showDetails && detailsMenu ? (
            <MenuDetails menu={detailsMenu} />
          ) : (
            <Card className="p-6 space-y-4">
              <div className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-blue-500" />
                <h2 className="text-lg font-semibold">Hướng dẫn sử dụng</h2>
              </div>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-start gap-3">
                  <Eye className="h-4 w-4 mt-0.5 text-blue-500" />
                  <div>
                    <strong>Xem:</strong> Click vào icon mắt để xem chi tiết
                    menu
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
                    <strong>Thêm menu con:</strong> Click vào icon + để thêm
                    menu con
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Trash2 className="h-4 w-4 mt-0.5 text-red-500" />
                  <div>
                    <strong>Xóa:</strong> Click vào icon thùng rác để xóa menu
                  </div>
                </div>
                <div className="pt-2 border-t">
                  <strong>Lưu ý:</strong> Sử dụng menu dropdown (icon ...) ở
                  cuối mỗi item để thực hiện các thao tác.
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
      <MenuForm
        open={open}
        onClose={() => setOpen(false)}
        menu={null}
        onSuccess={handleFormSuccess}
      />

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="min-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {dialogMode === "view" ? "Xem chi tiết menu" : "Chỉnh sửa menu"}
            </DialogTitle>
          </DialogHeader>
          {dialogMenu && (
            <MenuDetails
              menu={dialogMenu}
              mode={dialogMode}
              onClose={() => setDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
