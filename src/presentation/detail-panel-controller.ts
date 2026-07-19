import type { IOntEntity } from "../domain/interfaces/ont-entity.interface";
import type { IIndividual } from "../domain/interfaces/individual.interface";

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

export class DetailPanelController {
  showDetails(entity: IOntEntity): DetailView {
    const individuo = this.asIndividual(entity);
    return {
      id: entity.id,
      label: entity.label,
      tiposMostrados: individuo ? individuo.types.map((t) => t.label) : [],
      datos: individuo ? this.formatDataValues(individuo) : [],
    };
  }

  private asIndividual(entity: IOntEntity): IIndividual | undefined {
    return "types" in entity ? (entity as IIndividual) : undefined;
  }

  private formatDataValues(individuo: IIndividual): DetailDataEntry[] {
    return Array.from(individuo.dataValues.entries()).map(
      ([propiedad, valor]) => ({
        propiedad: this.acortarUri(propiedad),
        valor: String(valor),
      }),
    );
  }

  private acortarUri(uri: string): string {
    const partes = uri.split(/[#/]/);
    return partes[partes.length - 1] || uri;
  }
}
