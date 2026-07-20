import type { IOntologyModel } from "./interfaces/ontology-model.interface";
import type { IOntEntity } from "./interfaces/ont-entity.interface";
import type { IOntClass } from "./interfaces/ont-class.interface";
import type { IIndividual } from "./interfaces/individual.interface";

export class OntologyModel implements IOntologyModel {
  private classes: Map<string, IOntClass>;
  private individuals: Map<string, IIndividual>;
  private annotationPropertyIds: ReadonlySet<string>;

  constructor(
    classes: Map<string, IOntClass>,
    individuals: Map<string, IIndividual>,
    annotationPropertyIds: ReadonlySet<string> = new Set(),
  ) {
    this.classes = classes;
    this.individuals = individuals;
    this.annotationPropertyIds = annotationPropertyIds;
  }

  findById(id: string): IOntEntity | undefined {
    return this.classes.get(id) ?? this.individuals.get(id);
  }

  getRootClasses(): IOntClass[] {
    return this.getAllClasses().filter((c) => c.superClasses.length === 0);
  }

  getAllClasses(): IOntClass[] {
    return Array.from(this.classes.values());
  }

  getAllIndividuals(): IIndividual[] {
    return Array.from(this.individuals.values());
  }

  isAnnotationProperty(propertyId: string): boolean {
    return this.annotationPropertyIds.has(propertyId);
  }
}
