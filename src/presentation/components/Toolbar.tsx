import { IndividualsToggle } from "./IndividualsToggle";
import { SearchBar } from "./SearchBar";
import { LayoutSwitcher } from "./LayoutSwitcher";
import { ExportButton } from "./ExportButton";
import type { LayoutKind } from "../layout-controller.interface";

interface ToolbarProps {
  onToggleIndividuals: (visible: boolean) => void;
  onSearch: (query: string) => void;
  onLayoutChange: (kind: LayoutKind) => void;
  onExportPng: () => void;
  onExportPdf: () => void;
}

export function Toolbar(props: ToolbarProps) {
  return (
    <div>
      <IndividualsToggle onToggle={props.onToggleIndividuals} />
      <SearchBar onSearch={props.onSearch} />
      <LayoutSwitcher onChange={props.onLayoutChange} />
      <ExportButton
        onExportPng={props.onExportPng}
        onExportPdf={props.onExportPdf}
      />
    </div>
  );
}
