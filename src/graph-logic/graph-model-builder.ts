import type { IOntologyModel } from "../domain/interfaces/ontology-model.interface";
import { RelationKind } from "../domain/interfaces/relation.interface";
import type { IGraphModelBuilder } from "./interfaces/graph-model-builder.interface";
import {
  NodeType,
  type IGraphData,
  type IGraphNode,
  type IGraphEdge,
} from "./graph-types";

export class GraphModelBuilder implements IGraphModelBuilder {
  build(model: IOntologyModel): IGraphData {
    const nodes: IGraphNode[] = [];
    const edges: IGraphEdge[] = [];

    for (const clase of model.getAllClasses()) {
      nodes.push({
        id: clase.id,
        label: clase.label,
        nodeType: NodeType.CLASS,
      });
      for (const padre of clase.superClasses) {
        edges.push({
          id: `${clase.id}->${padre.id}`,
          sourceId: clase.id,
          targetId: padre.id,
          kind: RelationKind.SUBCLASS_OF,
        });
      }
    }

    for (const individuo of model.getAllIndividuals()) {
      nodes.push({
        id: individuo.id,
        label: individuo.label,
        nodeType: NodeType.INDIVIDUAL,
        parentGroupId: individuo.types[0]?.id,
      });
      for (const relacion of individuo.relations) {
        edges.push({
          id: `${relacion.source.id}-${relacion.propertyId}->${relacion.target.id}`,
          sourceId: relacion.source.id,
          targetId: relacion.target.id,
          kind: relacion.kind,
        });
      }
    }

    return { nodes, edges };
  }
}
