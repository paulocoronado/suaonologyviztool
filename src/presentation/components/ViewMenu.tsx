import { NavMenu } from "./NavMenu";
import { NodeVisibilityFilter } from "./NodeVisibilityFilter";
import { LayoutSwitcher } from "./LayoutSwitcher";
import type { LayoutKind } from "../layout-controller.interface";
import type { NodeVisibilityMode } from "../../graph-logic/graph-types";

interface ViewMenuProps {
  visibilityMode: NodeVisibilityMode;
  onVisibilityChange: (mode: NodeVisibilityMode) => void;
  onLayoutChange: (kind: LayoutKind) => void;
  onFitToScreen: () => void;
}

export function ViewMenu({
  visibilityMode,
  onVisibilityChange,
  onLayoutChange,
  onFitToScreen,
}: ViewMenuProps) {
  return (
    <NavMenu label="Vista">
      <div className="flex flex-col gap-4">
        <NodeVisibilityFilter
          value={visibilityMode}
          onChange={onVisibilityChange}
        />
        <LayoutSwitcher onChange={onLayoutChange} />
        <button
          onClick={onFitToScreen}
          className="rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
        >
          Ajustar a pantalla
        </button>
      </div>
    </NavMenu>
  );
}
