import { FileMenu } from "./FileMenu";
import { ViewMenu } from "./ViewMenu";
import { ExportMenu } from "./ExportMenu";
import { SearchBar } from "./SearchBar";
import type { LayoutKind } from "../layout-controller.interface";

interface NavBarProps {
  fileName: string | null;
  hasData: boolean;
  onFileSelected: (file: File) => void;
  onToggleIndividuals: (visible: boolean) => void;
  onLayoutChange: (kind: LayoutKind) => void;
  onSearch: (query: string) => void;
  onExportPng: () => void;
  onExportPdf: () => void;
}

export function NavBar(props: NavBarProps) {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between bg-indigo-950 px-6 py-3 text-white shadow">
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
              onToggleIndividuals={props.onToggleIndividuals}
              onLayoutChange={props.onLayoutChange}
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
