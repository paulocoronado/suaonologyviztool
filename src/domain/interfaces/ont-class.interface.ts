import type { IOntEntity } from "./ont-entity.interface";
import type { IIndividual } from "./individual.interface";

export interface IOntClass extends IOntEntity {
  readonly superClasses: IOntClass[];
  readonly subClasses: IOntClass[];
  readonly individuals: IIndividual[];
  addSubclass(child: IOntClass): void;
  addIndividual(individual: IIndividual): void;
  getAllDescendants(): IOntClass[];
}
