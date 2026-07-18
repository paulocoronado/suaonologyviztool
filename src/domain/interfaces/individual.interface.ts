import type { IOntEntity } from "./ont-entity.interface";
import type { IOntClass } from "./ont-class.interface";

export interface IIndividual extends IOntEntity {
  readonly types: IOntClass[];
}
