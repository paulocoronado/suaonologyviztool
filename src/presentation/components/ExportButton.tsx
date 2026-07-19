interface ExportButtonProps {
  onExportPng: () => void;
  onExportPdf: () => void;
}

export function ExportButton({ onExportPng, onExportPdf }: ExportButtonProps) {
  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={onExportPng}
        className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm text-white hover:bg-indigo-500"
      >
        Exportar PNG
      </button>
      <button
        onClick={onExportPdf}
        className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm text-white hover:bg-indigo-500"
      >
        Exportar PDF
      </button>
    </div>
  );
}
