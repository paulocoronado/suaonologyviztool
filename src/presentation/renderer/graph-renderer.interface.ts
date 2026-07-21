import type { NodeShape } from "./node-shape";
import type { LabelPosition } from "./label-position";
import type { IGraphData } from "../../graph-logic/graph-types";
import type { EdgeCurveStyle } from "./edge-curve-style";

export interface IGraphRenderer {
  render(data: IGraphData): void;
  updateData(data: IGraphData): void;
  centerOn(nodeId: string): void;
  fitToScreen(): void;
  selectNode(nodeId: string): void;
  setEdgeCurveStyle(style: EdgeCurveStyle): void;
  setNodeShape(kind: "class" | "individual", shape: NodeShape): void;
  setLabelPosition(position: LabelPosition): void;
  setNodeSize(kind: "class" | "individual", size: number): void;
  setNodeSizeOverride(nodeId: string, size: number): void;
  clearNodeSizeOverride(nodeId: string): void;
  clearAllNodeSizeOverrides(): void;
  onSelectionChange(
    handler: (selection: { nodeIds: string[]; edgeIds: string[] }) => void,
  ): void;
  onNodeDoubleClick(handler: (nodeId: string) => void): void;
  setLabelFontSize(size: number): void;
  setLabelFontColor(color: string): void;
  setLabelWrap(enabled: boolean): void;
  setLabelMaxWidth(width: number): void;
}
