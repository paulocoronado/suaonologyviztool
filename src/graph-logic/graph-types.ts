import type { RelationKind } from "../domain/interfaces/relation.interface";

export const NodeType = { CLASS: "CLASS", INDIVIDUAL: "INDIVIDUAL" } as const;
export type NodeType = (typeof NodeType)[keyof typeof NodeType];

export interface IGraphNode {
  readonly id: string;
  readonly label: string;
  readonly nodeType: NodeType;
  readonly parentGroupId?: string;
  readonly rdfsLabel?: string;
}

export interface IGraphEdge {
  readonly id: string;
  readonly sourceId: string;
  readonly targetId: string;
  readonly kind: RelationKind;
}

export interface IGraphData {
  readonly nodes: IGraphNode[];
  readonly edges: IGraphEdge[];
}
