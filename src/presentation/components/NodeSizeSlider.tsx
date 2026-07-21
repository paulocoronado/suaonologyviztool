import { useState, type ChangeEvent } from "react";

interface NodeSizeSliderProps {
  label: string;
  value: number;
  onCommit: (size: number) => void;
}

export function NodeSizeSlider({
  label,
  value,
  onCommit,
}: NodeSizeSliderProps) {
  const [tamano, setTamano] = useState(value);

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const nuevoTamano = Number(event.target.value);
    setTamano(nuevoTamano);
    onCommit(nuevoTamano);
  };

  return (
    <label className="flex flex-col gap-1 text-sm text-gray-700">
      {label}: {tamano}px
      <input
        type="range"
        min={10}
        max={80}
        step={2}
        value={tamano}
        onChange={handleInput}
        className="w-48"
      />
    </label>
  );
}
