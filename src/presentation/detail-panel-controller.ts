import type { IOntEntity } from "../domain/interfaces/ont-entity.interface";
import type { IIndividual } from "../domain/interfaces/individual.interface";
import { shortenUri } from "./uri-format";

export interface DetailDataEntry {
  propiedad: string;
  valor: string;
}

export interface DetailView {
  id: string;
  label: string;
  tiposMostrados: string[];
  datos: DetailDataEntry[];
}

interface HasDataValues {
  readonly dataValues: ReadonlyMap<string, unknown>;
}

export class DetailPanelController {
  showDetails(entity: IOntEntity): DetailView {
    const individuo = this.asIndividual(entity);
    const conDatos = this.asEntityWithData(entity);
    return {
      id: entity.id,
      label: entity.label,
      tiposMostrados: individuo ? individuo.types.map((t) => t.label) : [],
      datos: conDatos ? this.formatDataValues(conDatos) : [],
    };
  }

  private asIndividual(entity: IOntEntity): IIndividual | undefined {
    return "types" in entity ? (entity as IIndividual) : undefined;
  }

  private asEntityWithData(entity: IOntEntity): HasDataValues | undefined {
    return "dataValues" in entity ? (entity as HasDataValues) : undefined;
  }

  private formatDataValues(entity: HasDataValues): DetailDataEntry[] {
    return Array.from(entity.dataValues.entries()).map(
      ([propiedad, valor]) => ({
        propiedad: shortenUri(propiedad),
        valor: String(valor),
      }),
    );
  }
}
