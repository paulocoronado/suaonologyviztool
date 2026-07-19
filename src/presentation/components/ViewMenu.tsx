import { NavMenu } from "./NavMenu";
import { IndividualsToggle } from "./IndividualsToggle";
import { LayoutSwitcher } from "./LayoutSwitcher";
import type { LayoutKind } from "../layout-controller.interface";

interface ViewMenuProps {
  onToggleIndividuals: (visible: boolean) => void;
  onLayoutChange: (kind: LayoutKind) => void;
}

export function ViewMenu({
  onToggleIndividuals,
  onLayoutChange,
}: ViewMenuProps) {
  return (
    <NavMenu label="Vista">
      <div className="flex flex-col gap-3">
        <IndividualsToggle onToggle={onToggleIndividuals} />
        <LayoutSwitcher onChange={onLayoutChange} />
      </div>
    </NavMenu>
  );
}
