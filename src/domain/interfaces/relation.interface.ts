import type { IOntEntity } from "./ont-entity.interface";

export const RelationKind = {
  SUBCLASS_OF: "SUBCLASS_OF",
  TYPE_OF: "TYPE_OF",
  OBJECT_PROPERTY: "OBJECT_PROPERTY",
} as const;

export type RelationKind = (typeof RelationKind)[keyof typeof RelationKind];

export interface IRelation {
  readonly source: IOntEntity;
  readonly target: IOntEntity;
  readonly propertyId: string;
  readonly kind: RelationKind;
}
