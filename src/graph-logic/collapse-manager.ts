import type { ICollapseManager } from "./interfaces/collapse-manager.interface";
import { RelationKind } from "../domain/interfaces/relation.interface";
import { NodeType, type IGraphData } from "./graph-types";

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
    const idsOcultos = this.collectHiddenIds();
    const nodes = this.originalData.nodes.filter((n) => !idsOcultos.has(n.id));
    const idsVisibles = new Set(nodes.map((n) => n.id));
    const edges = this.originalData.edges.filter(
      (e) => idsVisibles.has(e.sourceId) && idsVisibles.has(e.targetId),
    );
    return { nodes, edges };
  }

  private collectHiddenIds(): Set<string> {
    const ocultos = new Set<string>();
    for (const classId of this.collapsedGroups) {
      this.collectIndividualIds(classId, ocultos);
      this.collectDescendantClassIds(classId, ocultos);
    }
    return ocultos;
  }

  private collectDescendantClassIds(
    classId: string,
    acumulador: Set<string>,
  ): void {
    const hijos = this.originalData.edges
      .filter(
        (e) => e.kind === RelationKind.SUBCLASS_OF && e.targetId === classId,
      )
      .map((e) => e.sourceId);
    for (const hijo of hijos) {
      if (!acumulador.has(hijo)) {
        acumulador.add(hijo);
        this.collectIndividualIds(hijo, acumulador);
        this.collectDescendantClassIds(hijo, acumulador);
      }
    }
  }

  private collectIndividualIds(classId: string, acumulador: Set<string>): void {
    for (const nodo of this.originalData.nodes) {
      if (
        nodo.nodeType === NodeType.INDIVIDUAL &&
        nodo.parentGroupId === classId
      ) {
        acumulador.add(nodo.id);
      }
    }
  }
}
