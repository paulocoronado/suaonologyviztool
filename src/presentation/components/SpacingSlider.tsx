import { useRef, useState, type ChangeEvent } from "react";

interface SpacingSliderProps {
  onCommit: (factor: number) => void;
}

export function SpacingSlider({ onCommit }: SpacingSliderProps) {
  const [factor, setFactor] = useState(1);
  const timeoutRef = useRef<number | null>(null);

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const nuevoFactor = Number(event.target.value);
    setFactor(nuevoFactor);
    if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => onCommit(nuevoFactor), 150);
  };

  return (
    <div className="flex flex-col gap-1 text-sm text-gray-700">
      <label htmlFor="spacing-slider">
        Distancia entre nodos: {factor.toFixed(1)}x
      </label>
      <input
        id="spacing-slider"
        type="range"
        min={0.5}
        max={3}
        step={0.1}
        value={factor}
        onChange={handleInput}
        className="w-48"
      />
    </div>
  );
}
