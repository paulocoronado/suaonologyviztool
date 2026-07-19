import type { IFilterService } from "./interfaces/filter-service.interface";
import { NodeType, type IGraphData } from "./graph-types";

export class FilterService implements IFilterService {
  private originalData: IGraphData;

  constructor(originalData: IGraphData) {
    this.originalData = originalData;
  }

  toggleIndividualsVisibility(visible: boolean): IGraphData {
    if (visible) return this.originalData;
    const nodes = this.originalData.nodes.filter(
      (n) => n.nodeType !== NodeType.INDIVIDUAL,
    );
    return this.withMatchingEdges(nodes);
  }

  filterByBranch(classId: string): IGraphData {
    const idsRama = this.collectBranchIds(classId);
    const nodes = this.originalData.nodes.filter(
      (n) =>
        idsRama.has(n.id) ||
        (n.parentGroupId !== undefined && idsRama.has(n.parentGroupId)),
    );
    return this.withMatchingEdges(nodes);
  }

  private collectBranchIds(classId: string): Set<string> {
    const idsRama = new Set<string>([classId]);
    const pendientes = [classId];
    while (pendientes.length > 0) {
      const actual = pendientes.pop() as string;
      const hijos = this.originalData.edges
        .filter((e) => e.targetId === actual)
        .map((e) => e.sourceId);
      for (const hijo of hijos) {
        if (!idsRama.has(hijo)) {
          idsRama.add(hijo);
          pendientes.push(hijo);
        }
      }
    }
    return idsRama;
  }

  private withMatchingEdges(nodes: IGraphData["nodes"]): IGraphData {
    const idsVisibles = new Set(nodes.map((n) => n.id));
    const edges = this.originalData.edges.filter(
      (e) => idsVisibles.has(e.sourceId) && idsVisibles.has(e.targetId),
    );
    return { nodes, edges };
  }
}
