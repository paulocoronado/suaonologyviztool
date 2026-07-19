import type { IGraphNode } from "../graph-types";

export interface ISelectionService {
  select(nodeId: string): void;
  getSelectedId(): string | null;
  getNeighbors(nodeId: string): IGraphNode[];
}
