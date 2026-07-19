import type { ChangeEvent } from "react";

interface FileUploaderProps {
  onFileSelected: (file: File) => void;
}

export function FileUploader({ onFileSelected }: FileUploaderProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const archivo = event.target.files?.[0];
    if (archivo) onFileSelected(archivo);
  };

  return (
    <label className="flex flex-col gap-1 text-sm text-gray-700">
      Cargar ontología (.ttl, .rdf, .owl, .jsonld)
      <input
        type="file"
        accept=".ttl,.rdf,.owl,.jsonld"
        onChange={handleChange}
        className="text-xs file:mr-2 file:rounded file:border-0 file:bg-indigo-50 file:px-2 file:py-1 file:text-indigo-700 hover:file:bg-indigo-100"
      />
    </label>
  );
}
