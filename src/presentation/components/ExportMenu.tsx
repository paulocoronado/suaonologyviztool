import { NavMenu } from "./NavMenu";
import { ExportButton } from "./ExportButton";

interface ExportMenuProps {
  onExportPng: () => void;
  onExportPdf: () => void;
}

export function ExportMenu({ onExportPng, onExportPdf }: ExportMenuProps) {
  return (
    <NavMenu label="Exportar">
      <ExportButton onExportPng={onExportPng} onExportPdf={onExportPdf} />
    </NavMenu>
  );
}
