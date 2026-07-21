import { NavMenu } from "./NavMenu";
import { NodeLabelFormatSelector } from "./NodeLabelFormatSelector";
import { LabelPositionSelector } from "./LabelPositionSelector";
import { NodeShapeSelector } from "./NodeShapeSelector";
import { EdgeStyleSelector } from "./EdgeStyleSelector";
import type { NodeLabelFormat } from "../node-label-format";
import type { NodeShape } from "../renderer/node-shape";
import type { LabelPosition } from "../renderer/label-position";
import type { EdgeCurveStyle } from "../renderer/edge-curve-style";
import { NodeSizeSlider } from "./NodeSizeSlider";

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
        <NodeSizeSlider
          label="Tamaño de las clases"
          value={props.classSize}
          onCommit={(size) => props.onNodeSizeChange("class", size)}
        />
        <NodeSizeSlider
          label="Tamaño de los individuos"
          value={props.individualSize}
          onCommit={(size) => props.onNodeSizeChange("individual", size)}
        />
      </div>
    </NavMenu>
  );
}
