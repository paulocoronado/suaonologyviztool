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
    <label>
      Cargar ontología (.ttl)
      <input
        type="file"
        accept=".ttl,.rdf,.owl,.jsonld"
        onChange={handleChange}
      />
    </label>
  );
}
