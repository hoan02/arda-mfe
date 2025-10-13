import { useState } from "react";
import { Button } from "@workspace/ui/components/button";
import { MenuTreeManager } from "./components/MenuTreeManager";
import { MenuDetails } from "./components/MenuDetails";
import { MenuForm } from "./MenuForm";

export default function MenuPage() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<any>(null);
  const handleAddMenu = () => {
    setOpen(true);
  };

  const handleFormSuccess = () => {
    setSelected(null);
  };

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Quản lý Menu</h1>
        <Button onClick={handleAddMenu}>+ Thêm menu</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MenuTreeManager onSelectMenu={(m) => setSelected(m)} />
        <MenuDetails menu={selected} />
      </div>
      <MenuForm
        open={open}
        onClose={() => setOpen(false)}
        menu={null}
        onSuccess={handleFormSuccess}
      />
    </div>
  );
}
