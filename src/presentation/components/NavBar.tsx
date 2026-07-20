import { FileMenu } from "./FileMenu";
import { ViewMenu } from "./ViewMenu";
import { FormatMenu } from "./FormatMenu";
import { SpacingMenu } from "./SpacingMenu";
import { SectionsMenu } from "./SectionsMenu";
import { ExportMenu } from "./ExportMenu";
import { SearchBar } from "./SearchBar";
import type { LayoutKind } from "../layout-controller.interface";
import type { NodeLabelFormat } from "../node-label-format";
import type { NodeVisibilityMode } from "../../graph-logic/graph-types";

interface NavBarProps {
  fileName: string | null;
  hasData: boolean;
  labelFormat: NodeLabelFormat;
  visibilityMode: NodeVisibilityMode;
  visiblePanelIds: string[];
  onFileSelected: (file: File) => void;
  onVisibilityChange: (mode: NodeVisibilityMode) => void;
  onLayoutChange: (kind: LayoutKind) => void;
  onLabelFormatChange: (format: NodeLabelFormat) => void;
  onSpacingChange: (factor: number) => void;
  onFitToScreen: () => void;
  onToggleSection: (id: string, visible: boolean) => void;
  onResetLayout: () => void;
  onSearch: (query: string) => void;
  onExportPng: () => void;
  onExportPdf: () => void;
  backgroundColor: string;
  onBackgroundColorChange: (color: string) => void;
}

export function NavBar(props: NavBarProps) {
  return (
    <header className="flex items-center justify-between bg-indigo-950 px-6 py-3 text-white shadow">
      <div className="flex items-center gap-2">
        <span className="text-xl text-indigo-300">◈</span>
        <span className="text-base font-semibold tracking-wide">
          Visualizador de ontologías
        </span>
      </div>
      <div className="flex items-center gap-2">
        {props.hasData && <SearchBar onSearch={props.onSearch} />}
        <FileMenu
          fileName={props.fileName}
          onFileSelected={props.onFileSelected}
        />
        {props.hasData && (
          <>
            <ViewMenu
              visibilityMode={props.visibilityMode}
              onVisibilityChange={props.onVisibilityChange}
              onLayoutChange={props.onLayoutChange}
              onFitToScreen={props.onFitToScreen}
            />
            <FormatMenu
              labelFormat={props.labelFormat}
              onLabelFormatChange={props.onLabelFormatChange}
            />
            <SpacingMenu onSpacingChange={props.onSpacingChange} />
            <SectionsMenu
              visiblePanelIds={props.visiblePanelIds}
              onToggleSection={props.onToggleSection}
              onResetLayout={props.onResetLayout}
              backgroundColor={props.backgroundColor}
              onBackgroundColorChange={props.onBackgroundColorChange}
            />
            <ExportMenu
              onExportPng={props.onExportPng}
              onExportPdf={props.onExportPdf}
            />
          </>
        )}
      </div>
    </header>
  );
}
