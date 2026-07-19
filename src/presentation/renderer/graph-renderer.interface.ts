import type { IGraphData } from "../../graph-logic/graph-types";

export interface IGraphRenderer {
  render(data: IGraphData): void;
  updateData(data: IGraphData): void;
  centerOn(nodeId: string): void;
  fitToScreen(): void;
  onNodeClick(handler: (nodeId: string) => void): void;
}
