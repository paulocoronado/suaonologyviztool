import { PANEL_REGISTRY } from "../layout/panel-registry";

interface SectionVisibilityListProps {
  visiblePanelIds: string[];
  onToggleSection: (id: string, visible: boolean) => void;
}

export function SectionVisibilityList({
  visiblePanelIds,
  onToggleSection,
}: SectionVisibilityListProps) {
  return (
    <fieldset className="flex flex-col gap-2 text-sm text-gray-700">
      <legend className="mb-1 text-xs font-medium text-gray-500">
        Secciones visibles
      </legend>
      {PANEL_REGISTRY.map((seccion) => (
        <label key={seccion.id} className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={visiblePanelIds.includes(seccion.id)}
            onChange={(e) => onToggleSection(seccion.id, e.target.checked)}
          />
          {seccion.title}
        </label>
      ))}
    </fieldset>
  );
}
