import { LabelPosition } from "../renderer/label-position";

interface LabelPositionSelectorProps {
  value: LabelPosition;
  onChange: (position: LabelPosition) => void;
}

const OPCIONES: Array<{ value: LabelPosition; label: string }> = [
  { value: LabelPosition.CENTER, label: "Centro" },
  { value: LabelPosition.TOP, label: "Arriba" },
  { value: LabelPosition.BOTTOM, label: "Abajo" },
  { value: LabelPosition.LEFT, label: "Izquierda" },
  { value: LabelPosition.RIGHT, label: "Derecha" },
];

export function LabelPositionSelector({
  value,
  onChange,
}: LabelPositionSelectorProps) {
  return (
    <label className="flex flex-col gap-1 text-sm text-gray-700">
      Ubicación de la etiqueta
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as LabelPosition)}
        className="rounded-md border border-gray-300 px-2 py-1 text-sm text-gray-700"
      >
        {OPCIONES.map((opcion) => (
          <option key={opcion.value} value={opcion.value}>
            {opcion.label}
          </option>
        ))}
      </select>
    </label>
  );
}
