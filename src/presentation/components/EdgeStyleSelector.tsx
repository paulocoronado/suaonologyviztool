import { EdgeCurveStyle } from "../renderer/edge-curve-style";

interface EdgeStyleSelectorProps {
  value: EdgeCurveStyle;
  onChange: (style: EdgeCurveStyle) => void;
}

const OPCIONES: Array<{ value: EdgeCurveStyle; label: string }> = [
  { value: EdgeCurveStyle.BEZIER, label: "Curva" },
  { value: EdgeCurveStyle.STRAIGHT, label: "Recta" },
  { value: EdgeCurveStyle.TAXI, label: "Ortogonal" },
  { value: EdgeCurveStyle.ROUND_TAXI, label: "Ortogonal redondeada" },
];

export function EdgeStyleSelector({ value, onChange }: EdgeStyleSelectorProps) {
  return (
    <fieldset className="flex flex-col gap-2 text-sm text-gray-700">
      <legend className="mb-1 text-xs font-medium text-gray-500">
        Estilo de línea de las relaciones
      </legend>
      {OPCIONES.map((opcion) => (
        <label key={opcion.value} className="flex items-center gap-2">
          <input
            type="radio"
            name="edge-curve-style"
            checked={value === opcion.value}
            onChange={() => onChange(opcion.value)}
          />
          {opcion.label}
        </label>
      ))}
    </fieldset>
  );
}
