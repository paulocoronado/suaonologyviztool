import type { IOntEntity } from "../domain/interfaces/ont-entity.interface";
import type { IIndividual } from "../domain/interfaces/individual.interface";

export interface DetailView {
  id: string;
  label: string;
  tiposMostrados: string[];
}

export class DetailPanelController {
  showDetails(entity: IOntEntity): DetailView {
    const tipos =
      "types" in entity
        ? (entity as IIndividual).types.map((t) => t.label)
        : [];
    return { id: entity.id, label: entity.label, tiposMostrados: tipos };
  }
}
