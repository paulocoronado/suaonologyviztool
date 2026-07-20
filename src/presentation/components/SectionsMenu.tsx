import { NavMenu } from "./NavMenu";
import { SectionVisibilityList } from "./SectionVisibilityList";
import { AppearanceSettings } from "./AppearanceSettings";

interface SectionsMenuProps {
  visiblePanelIds: string[];
  onToggleSection: (id: string, visible: boolean) => void;
  onResetLayout: () => void;
  backgroundColor: string;
  onBackgroundColorChange: (color: string) => void;
}

export function SectionsMenu(props: SectionsMenuProps) {
  return (
    <NavMenu label="Configuración">
      <div className="flex flex-col gap-4">
        <SectionVisibilityList
          visiblePanelIds={props.visiblePanelIds}
          onToggleSection={props.onToggleSection}
        />
        <AppearanceSettings
          backgroundColor={props.backgroundColor}
          onBackgroundColorChange={props.onBackgroundColorChange}
        />
        <button
          onClick={props.onResetLayout}
          className="w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
        >
          Reiniciar ventana
        </button>
      </div>
    </NavMenu>
  );
}
