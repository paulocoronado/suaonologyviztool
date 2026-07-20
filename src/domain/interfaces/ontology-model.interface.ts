import type { IOntEntity } from "./ont-entity.interface";
import type { IOntClass } from "./ont-class.interface";
import type { IIndividual } from "./individual.interface";
export interface IOntologyModel {
  findById(id: string): IOntEntity | undefined;
  getRootClasses(): IOntClass[];
  getAllClasses(): IOntClass[];
  getAllIndividuals(): IIndividual[];
  isAnnotationProperty(propertyId: string): boolean;
}
