import type { IOntEntity } from "./interfaces/ont-entity.interface";
import { RelationKind, type IRelation } from "./interfaces/relation.interface";

export class Relation implements IRelation {
  readonly source: IOntEntity;
  readonly target: IOntEntity;
  readonly propertyId: string;
  readonly kind: RelationKind;

  constructor(
    source: IOntEntity,
    target: IOntEntity,
    propertyId: string,
    kind: RelationKind,
  ) {
    this.source = source;
    this.target = target;
    this.propertyId = propertyId;
    this.kind = kind;
  }
}
