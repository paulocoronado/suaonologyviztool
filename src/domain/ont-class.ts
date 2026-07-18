import type { IOntClass } from "./interfaces/ont-class.interface";
import type { IIndividual } from "./interfaces/individual.interface";

export class OntClass implements IOntClass {
  readonly superClasses: IOntClass[] = [];
  readonly subClasses: IOntClass[] = [];
  readonly individuals: IIndividual[] = [];

  readonly id: string;
  readonly label: string;
  readonly comment?: string;

  constructor(id: string, label: string, comment?: string) {
    this.id = id;
    this.label = label;
    this.comment = comment;
  }

  addSubclass(child: IOntClass): void {
    this.subClasses.push(child);
    child.superClasses.push(this);
  }

  addIndividual(individual: IIndividual): void {
    this.individuals.push(individual);
  }

  getAllDescendants(): IOntClass[] {
    const directos = this.subClasses;
    const indirectos = directos.flatMap((hijo) => hijo.getAllDescendants());
    return [...directos, ...indirectos];
  }
}
