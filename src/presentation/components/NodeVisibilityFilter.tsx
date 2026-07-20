import { NodeVisibilityMode } from "../../graph-logic/graph-types";

interface NodeVisibilityFilterProps {
  value: NodeVisibilityMode;
  onChange: (mode: NodeVisibilityMode) => void;
}

const OPCIONES: Array<{ value: NodeVisibilityMode; label: string }> = [
  { value: NodeVisibilityMode.BOTH, label: "Clases e individuos" },
  { value: NodeVisibilityMode.CLASSES_ONLY, label: "Solo clases" },
  { value: NodeVisibilityMode.INDIVIDUALS_ONLY, label: "Solo individuos" },
];

export function NodeVisibilityFilter({
  value,
  onChange,
}: NodeVisibilityFilterProps) {
  return (
    <fieldset className="flex flex-col gap-2 text-sm text-gray-700">
      <legend className="mb-1 text-xs font-medium text-gray-500">
        Mostrar en el grafo
      </legend>
      {OPCIONES.map((opcion) => (
        <label key={opcion.value} className="flex items-center gap-2">
          <input
            type="radio"
            name="node-visibility-mode"
            checked={value === opcion.value}
            onChange={() => onChange(opcion.value)}
          />
          {opcion.label}
        </label>
      ))}
    </fieldset>
  );
}
