import type { IOntEntity } from "./ont-entity.interface";
import type { IOntClass } from "./ont-class.interface";
import type { IRelation } from "./relation.interface";

export interface IIndividual extends IOntEntity {
  readonly types: IOntClass[];
  readonly dataValues: ReadonlyMap<string, unknown>;
  readonly relations: IRelation[];
  addType(type: IOntClass): void;
  addRelation(relation: IRelation): void;
  getRelationsTo(otherId: string): IRelation[];
  setDataValue(propertyId: string, value: unknown): void;
}
