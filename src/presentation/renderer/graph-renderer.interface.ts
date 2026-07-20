import type { IGraphData } from "../../graph-logic/graph-types";

export interface IGraphRenderer {
  render(data: IGraphData): void;
  updateData(data: IGraphData): void;
  centerOn(nodeId: string): void;
  fitToScreen(): void;
  selectNode(nodeId: string): void;
  onSelectionChange(
    handler: (selection: { nodeIds: string[]; edgeIds: string[] }) => void,
  ): void;
  onNodeDoubleClick(handler: (nodeId: string) => void): void;
}
