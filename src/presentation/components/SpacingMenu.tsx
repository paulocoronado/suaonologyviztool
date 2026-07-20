import { NavMenu } from "./NavMenu";
import { SpacingSlider } from "./SpacingSlider";

interface SpacingMenuProps {
  onSpacingChange: (factor: number) => void;
}

export function SpacingMenu({ onSpacingChange }: SpacingMenuProps) {
  return (
    <NavMenu label="Espaciado">
      <SpacingSlider onCommit={onSpacingChange} />
    </NavMenu>
  );
}
