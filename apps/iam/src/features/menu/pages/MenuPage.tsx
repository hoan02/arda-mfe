import { MenuTreeManager } from "../components/MenuTreeManager";
import { MenuUsageGuide } from "../components/MenuUsageGuide";

export function MenuPage() {
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
