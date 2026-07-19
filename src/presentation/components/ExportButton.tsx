interface ExportButtonProps {
  onExportPng: () => void;
  onExportPdf: () => void;
}

export function ExportButton({ onExportPng, onExportPdf }: ExportButtonProps) {
  return (
    <div>
      <button onClick={onExportPng}>Exportar PNG</button>
      <button onClick={onExportPdf}>Exportar PDF</button>
    </div>
  );
}
