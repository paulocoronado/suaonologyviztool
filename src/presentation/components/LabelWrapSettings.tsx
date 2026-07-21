import { RangeSlider } from "./RangeSlider";

interface LabelWrapSettingsProps {
  wrap: boolean;
  maxWidth: number;
  onWrapChange: (enabled: boolean) => void;
  onMaxWidthChange: (width: number) => void;
}

export function LabelWrapSettings({
  wrap,
  maxWidth,
  onWrapChange,
  onMaxWidthChange,
}: LabelWrapSettingsProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="flex items-center gap-2 text-sm text-gray-700">
        <input
          type="checkbox"
          checked={wrap}
          onChange={(e) => onWrapChange(e.target.checked)}
        />
        Etiquetas en varias líneas
      </label>
      {wrap && (
        <RangeSlider
          label="Ancho máximo de la etiqueta"
          value={maxWidth}
          min={40}
          max={200}
          step={10}
          unit="px"
          onCommit={onMaxWidthChange}
        />
      )}
    </div>
  );
}
