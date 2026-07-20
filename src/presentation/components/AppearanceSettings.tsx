interface AppearanceSettingsProps {
  backgroundColor: string;
  onBackgroundColorChange: (color: string) => void;
}

const FONDOS_PREDEFINIDOS = ["#ffffff", "#f9fafb", "#111827", "#0f172a"];

export function AppearanceSettings({
  backgroundColor,
  onBackgroundColorChange,
}: AppearanceSettingsProps) {
  return (
    <fieldset className="flex flex-col gap-2 text-sm text-gray-700">
      <legend className="mb-1 text-xs font-medium text-gray-500">
        Fondo del grafo
      </legend>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={backgroundColor}
          onChange={(e) => onBackgroundColorChange(e.target.value)}
          className="h-8 w-8 cursor-pointer rounded border border-gray-300"
        />
        <div className="flex gap-1">
          {FONDOS_PREDEFINIDOS.map((color) => (
            <button
              key={color}
              onClick={() => onBackgroundColorChange(color)}
              className="h-6 w-6 rounded border border-gray-300"
              style={{ backgroundColor: color }}
              aria-label={`Fondo ${color}`}
            />
          ))}
        </div>
      </div>
    </fieldset>
  );
}
