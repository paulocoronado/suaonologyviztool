import type { ISelectionService } from "./interfaces/selection-service.interface";
import type { IGraphData, IGraphNode } from "./graph-types";

export class SelectionService implements ISelectionService {
  private data: IGraphData;
  private selectedId: string | null = null;

  constructor(data: IGraphData) {
    this.data = data;
  }

  select(nodeId: string): void {
    this.selectedId = nodeId;
  }

  getSelectedId(): string | null {
    return this.selectedId;
  }

  getNeighbors(nodeId: string): IGraphNode[] {
    const idsVecinos = new Set<string>();
    for (const arista of this.data.edges) {
      if (arista.sourceId === nodeId) idsVecinos.add(arista.targetId);
      if (arista.targetId === nodeId) idsVecinos.add(arista.sourceId);
    }
    return this.data.nodes.filter((n) => idsVecinos.has(n.id));
  }
}
