import type { IIndividual } from "./interfaces/individual.interface";
import type { IOntClass } from "./interfaces/ont-class.interface";
import type { IRelation } from "./interfaces/relation.interface";

export class Individual implements IIndividual {
  readonly types: IOntClass[] = [];
  readonly dataValues = new Map<string, unknown>();
  readonly relations: IRelation[] = [];

  readonly id: string;
  readonly label: string;
  readonly comment?: string;

  constructor(id: string, label: string, comment?: string) {
    this.id = id;
    this.label = label;
    this.comment = comment;
  }

  addType(type: IOntClass): void {
    this.types.push(type);
  }

  addRelation(relation: IRelation): void {
    this.relations.push(relation);
  }

  getRelationsTo(otherId: string): IRelation[] {
    return this.relations.filter((r) => r.target.id === otherId);
  }
}
