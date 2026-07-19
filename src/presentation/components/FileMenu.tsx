import { NavMenu } from "./NavMenu";
import { FileUploader } from "./FileUploader";

interface FileMenuProps {
  fileName: string | null;
  onFileSelected: (file: File) => void;
}

export function FileMenu({ fileName, onFileSelected }: FileMenuProps) {
  return (
    <NavMenu label="Archivo">
      <p className="mb-2 text-xs text-gray-500">
        {fileName ? `Cargado: ${fileName}` : "Ningún archivo cargado"}
      </p>
      <FileUploader onFileSelected={onFileSelected} />
    </NavMenu>
  );
}
