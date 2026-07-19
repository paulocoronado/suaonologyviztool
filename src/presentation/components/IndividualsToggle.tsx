interface IndividualsToggleProps {
  onToggle: (visible: boolean) => void;
}

export function IndividualsToggle({ onToggle }: IndividualsToggleProps) {
  return (
    <label className="flex items-center gap-2 text-sm text-gray-700">
      <input
        type="checkbox"
        defaultChecked
        onChange={(e) => onToggle(e.target.checked)}
      />
      Mostrar individuos
    </label>
  );
}
