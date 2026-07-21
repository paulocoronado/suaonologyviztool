import { useState, type ChangeEvent } from "react";

interface RangeSliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  onCommit: (value: number) => void;
}

export function RangeSlider({
  label,
  value,
  min,
  max,
  step = 1,
  unit = "",
  onCommit,
}: RangeSliderProps) {
  const [valor, setValor] = useState(value);

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const nuevoValor = Number(event.target.value);
    setValor(nuevoValor);
    onCommit(nuevoValor);
  };

  return (
    <label className="flex flex-col gap-1 text-sm text-gray-700">
      {label}: {valor}
      {unit}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={valor}
        onChange={handleInput}
        className="w-48"
      />
    </label>
  );
}
