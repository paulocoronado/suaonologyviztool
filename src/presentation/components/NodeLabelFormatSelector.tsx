import {
  NodeLabelFormat,
  type NodeLabelFormat as TNodeLabelFormat,
} from "../node-label-format";

interface NodeLabelFormatSelectorProps {
  value: TNodeLabelFormat;
  onChange: (format: TNodeLabelFormat) => void;
}

const OPCIONES: Array<{ value: TNodeLabelFormat; label: string }> = [
  { value: NodeLabelFormat.RDFS_LABEL, label: "Etiqueta (rdfs:label)" },
  { value: NodeLabelFormat.LOCAL_NAME, label: "Nombre corto" },
  { value: NodeLabelFormat.FULL_URI, label: "URI completa" },
];

export function NodeLabelFormatSelector({
  value,
  onChange,
}: NodeLabelFormatSelectorProps) {
  return (
    <fieldset className="flex flex-col gap-2 text-sm text-gray-700">
      <legend className="mb-1 text-xs font-medium text-gray-500">
        Etiqueta de los nodos
      </legend>
      {OPCIONES.map((opcion) => (
        <label key={opcion.value} className="flex items-center gap-2">
          <input
            type="radio"
            name="node-label-format"
            checked={value === opcion.value}
            onChange={() => onChange(opcion.value)}
          />
          {opcion.label}
        </label>
      ))}
    </fieldset>
  );
}
