import type { LayoutKind } from "../layout-controller.interface";

interface LayoutSwitcherProps {
  onChange: (kind: LayoutKind) => void;
}

export function LayoutSwitcher({ onChange }: LayoutSwitcherProps) {
  return (
    <select
      onChange={(e) => onChange(e.target.value as LayoutKind)}
      defaultValue="force-directed"
      className="rounded-md border border-gray-300 px-2 py-1 text-sm text-gray-700"
    >
      <option value="force-directed">Fuerza dirigida</option>
      <option value="hierarchical">Jerárquico</option>
    </select>
  );
}
