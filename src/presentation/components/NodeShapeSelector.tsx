import { NodeShape } from "../renderer/node-shape";

interface NodeShapeSelectorProps {
  label: string;
  value: NodeShape;
  onChange: (shape: NodeShape) => void;
}

const OPCIONES: Array<{ value: NodeShape; label: string }> = [
  { value: NodeShape.ELLIPSE, label: "Elipse" },
  { value: NodeShape.RECTANGLE, label: "Rectángulo" },
  { value: NodeShape.ROUND_RECTANGLE, label: "Rectángulo redondeado" },
  { value: NodeShape.TRIANGLE, label: "Triángulo" },
  { value: NodeShape.DIAMOND, label: "Rombo" },
  { value: NodeShape.HEXAGON, label: "Hexágono" },
  { value: NodeShape.PENTAGON, label: "Pentágono" },
  { value: NodeShape.STAR, label: "Estrella" },
  { value: NodeShape.TAG, label: "Etiqueta" },
];

export function NodeShapeSelector({
  label,
  value,
  onChange,
}: NodeShapeSelectorProps) {
  return (
    <label className="flex flex-col gap-1 text-sm text-gray-700">
      {label}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as NodeShape)}
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
