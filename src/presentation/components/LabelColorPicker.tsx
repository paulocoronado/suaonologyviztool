interface LabelColorPickerProps {
  value: string;
  onChange: (color: string) => void;
}

const COLORES_PREDEFINIDOS = [
  "#111827",
  "#374151",
  "#ffffff",
  "#4f46e5",
  "#dc2626",
];

export function LabelColorPicker({ value, onChange }: LabelColorPickerProps) {
  return (
    <fieldset className="flex flex-col gap-2 text-sm text-gray-700">
      <legend className="mb-1 text-xs font-medium text-gray-500">
        Color del texto de las etiquetas
      </legend>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-8 w-8 cursor-pointer rounded border border-gray-300"
        />
        <div className="flex gap-1">
          {COLORES_PREDEFINIDOS.map((color) => (
            <button
              key={color}
              onClick={() => onChange(color)}
              className="h-6 w-6 rounded border border-gray-300"
              style={{ backgroundColor: color }}
              aria-label={`Color ${color}`}
            />
          ))}
        </div>
      </div>
    </fieldset>
  );
}
