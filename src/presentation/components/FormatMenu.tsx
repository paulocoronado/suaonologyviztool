import { NavMenu } from "./NavMenu";
import { NodeLabelFormatSelector } from "./NodeLabelFormatSelector";
import { LabelPositionSelector } from "./LabelPositionSelector";
import { NodeShapeSelector } from "./NodeShapeSelector";
import { EdgeStyleSelector } from "./EdgeStyleSelector";
import type { NodeLabelFormat } from "../node-label-format";
import type { NodeShape } from "../renderer/node-shape";
import type { LabelPosition } from "../renderer/label-position";
import type { EdgeCurveStyle } from "../renderer/edge-curve-style";
import { RangeSlider } from "./RangeSlider";
import { LabelColorPicker } from "./LabelColorPicker";
import { LabelWrapSettings } from "./LabelWrapSettings";

interface FormatMenuProps {
  labelFormat: NodeLabelFormat;
  onLabelFormatChange: (format: NodeLabelFormat) => void;
  labelPosition: LabelPosition;
  onLabelPositionChange: (position: LabelPosition) => void;
  classShape: NodeShape;
  individualShape: NodeShape;
  onNodeShapeChange: (kind: "class" | "individual", shape: NodeShape) => void;
  edgeStyle: EdgeCurveStyle;
  onEdgeStyleChange: (style: EdgeCurveStyle) => void;
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

export function FormatMenu(props: FormatMenuProps) {
  return (
    <NavMenu label="Formato">
      <div className="flex flex-col gap-4">
        <NodeLabelFormatSelector
          value={props.labelFormat}
          onChange={props.onLabelFormatChange}
        />
        <LabelPositionSelector
          value={props.labelPosition}
          onChange={props.onLabelPositionChange}
        />
        <NodeShapeSelector
          label="Forma de las clases"
          value={props.classShape}
          onChange={(shape) => props.onNodeShapeChange("class", shape)}
        />
        <NodeShapeSelector
          label="Forma de los individuos"
          value={props.individualShape}
          onChange={(shape) => props.onNodeShapeChange("individual", shape)}
        />
        <EdgeStyleSelector
          value={props.edgeStyle}
          onChange={props.onEdgeStyleChange}
        />
        <RangeSlider
          label="Tamaño de las clases"
          value={props.classSize}
          min={10}
          max={200}
          step={2}
          unit="px"
          onCommit={(size) => props.onNodeSizeChange("class", size)}
        />
        <RangeSlider
          label="Tamaño de los individuos"
          value={props.individualSize}
          min={10}
          max={200}
          step={2}
          unit="px"
          onCommit={(size) => props.onNodeSizeChange("individual", size)}
        />
        <RangeSlider
          label="Tamaño de la fuente"
          value={props.labelFontSize}
          min={6}
          max={24}
          step={1}
          unit="px"
          onCommit={props.onLabelFontSizeChange}
        />
        <LabelColorPicker
          value={props.labelFontColor}
          onChange={props.onLabelFontColorChange}
        />
        <LabelWrapSettings
          wrap={props.labelWrap}
          maxWidth={props.labelMaxWidth}
          onWrapChange={props.onLabelWrapChange}
          onMaxWidthChange={props.onLabelMaxWidthChange}
        />
      </div>
    </NavMenu>
  );
}
