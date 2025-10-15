import { useState } from "react";
import { Button } from "@workspace/ui/components/button";
import { MenuTreeManager } from "./components/MenuTreeManager";
import { MenuUsageGuide } from "./components/MenuUsageGuide";

export default function MenuPage() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<any>(null);

  const handleAddMenu = () => {
    setOpen(true);
  };

  const handleFormSuccess = () => {
    setSelected(null);
  };

  // Actions and dialogs are handled inside MenuTreeManager now

  return (
    <div className="flex gap-2">
      <div className="flex-1">
        <MenuTreeManager />
      </div>
      <div className="w-[500px] lg:w-[600px]">
        <MenuUsageGuide />
      </div>
    </div>
  );
}
