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
import type { EdgeCurveStyle } from "../renderer/edge-curve-style";
import type { LabelPosition } from "../renderer/label-position";
import type { NodeShape } from "../renderer/node-shape";

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
  onEdgeStyleChange: (style: EdgeCurveStyle) => void;
  edgeStyle: EdgeCurveStyle;
  labelPosition: LabelPosition;
  classShape: NodeShape;
  individualShape: NodeShape;
  onLabelPositionChange: (position: LabelPosition) => void;
  onNodeShapeChange: (kind: "class" | "individual", shape: NodeShape) => void;
  classSize: number;
  individualSize: number;
  onNodeSizeChange: (kind: "class" | "individual", size: number) => void;
  labelFontSize: number;
  labelFontColor: string;
  onLabelFontSizeChange: (size: number) => void;
  onLabelFontColorChange: (color: string) => void;
  labelWrap: boolean;
  labelMaxWidth: number;
  onLabelWrapChange: (enabled: boolean) => void;
  onLabelMaxWidthChange: (width: number) => void;
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
              labelPosition={props.labelPosition}
              onLabelPositionChange={props.onLabelPositionChange}
              classShape={props.classShape}
              individualShape={props.individualShape}
              onNodeShapeChange={props.onNodeShapeChange}
              edgeStyle={props.edgeStyle}
              onEdgeStyleChange={props.onEdgeStyleChange}
              classSize={props.classSize}
              individualSize={props.individualSize}
              onNodeSizeChange={props.onNodeSizeChange}
              labelFontSize={props.labelFontSize}
              labelFontColor={props.labelFontColor}
              onLabelFontSizeChange={props.onLabelFontSizeChange}
              onLabelFontColorChange={props.onLabelFontColorChange}
              labelWrap={props.labelWrap}
              labelMaxWidth={props.labelMaxWidth}
              onLabelWrapChange={props.onLabelWrapChange}
              onLabelMaxWidthChange={props.onLabelMaxWidthChange}
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
