interface IndividualsToggleProps {
  onToggle: (visible: boolean) => void;
}

export function IndividualsToggle({ onToggle }: IndividualsToggleProps) {
  return (
    <label>
      <input
        type="checkbox"
        defaultChecked
        onChange={(e) => onToggle(e.target.checked)}
      />
      Mostrar individuos
    </label>
  );
}
