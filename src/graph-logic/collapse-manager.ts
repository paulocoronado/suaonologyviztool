import type { ICollapseManager } from "./interfaces/collapse-manager.interface";
import { NodeType, type IGraphData, type IGraphNode } from "./graph-types";

export class CollapseManager implements ICollapseManager {
  private originalData: IGraphData;
  private collapsedGroups = new Set<string>();

  constructor(originalData: IGraphData) {
    this.originalData = originalData;
  }

  collapse(classId: string): IGraphData {
    this.collapsedGroups.add(classId);
    return this.getVisibleData();
  }

  expand(classId: string): IGraphData {
    this.collapsedGroups.delete(classId);
    return this.getVisibleData();
  }

  isCollapsed(classId: string): boolean {
    return this.collapsedGroups.has(classId);
  }

  private getVisibleData(): IGraphData {
    const nodes = this.originalData.nodes.filter((n) => this.isNodeVisible(n));
    const idsVisibles = new Set(nodes.map((n) => n.id));
    const edges = this.originalData.edges.filter(
      (e) => idsVisibles.has(e.sourceId) && idsVisibles.has(e.targetId),
    );
    return { nodes, edges };
  }

  private isNodeVisible(node: IGraphNode): boolean {
    if (node.nodeType === NodeType.INDIVIDUAL && node.parentGroupId) {
      return !this.collapsedGroups.has(node.parentGroupId);
    }
    return true;
  }
}
