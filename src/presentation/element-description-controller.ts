import type { IOntEntity } from "../domain/interfaces/ont-entity.interface";
import type { IIndividual } from "../domain/interfaces/individual.interface";
import { RelationKind } from "../domain/interfaces/relation.interface";
import type { IGraphData, IGraphEdge } from "../graph-logic/graph-types";
import {
  buildNeighborhood,
  buildNeighborhoodForEdge,
} from "../graph-logic/neighborhood";
import { shortenUri } from "./uri-format";

export interface ElementDataEntry {
  propiedad: string;
  valor: string;
}

export interface ElementRelationEntry {
  predicado: string;
  destinoId: string;
  destinoLabel: string;
}

export interface ElementDescription {
  id: string;
  label: string;
  tipoElemento: string;
  isNode: boolean;
  anotaciones: ElementDataEntry[];
  propiedadesDatos: ElementDataEntry[];
  propiedadesObjeto: ElementRelationEntry[];
  grafico: IGraphData;
}

const PREDICADOS_ANOTACION_CONOCIDOS = new Set([
  "http://www.w3.org/2000/01/rdf-schema#label",
  "http://www.w3.org/2000/01/rdf-schema#comment",
]);

export class ElementDescriptionController {
  describeEntity(
    entity: IOntEntity,
    isAnnotationProperty: (propertyId: string) => boolean,
    graphData: IGraphData,
  ): ElementDescription {
    const esIndividuo = "types" in entity;
    const dataValues =
      "dataValues" in entity
        ? (entity as { dataValues: ReadonlyMap<string, unknown> }).dataValues
        : undefined;
    const { anotaciones, propiedadesDatos } = this.splitDataValues(
      dataValues,
      isAnnotationProperty,
    );

    return {
      id: entity.id,
      label: entity.label,
      tipoElemento: esIndividuo ? "Individuo" : "Clase",
      anotaciones,
      propiedadesDatos,
      propiedadesObjeto: esIndividuo
        ? this.extractObjectProperties(entity as IIndividual)
        : [],
      grafico: buildNeighborhood(graphData, entity.id),
      isNode: true,
    };
  }

  describeRelation(
    edge: IGraphEdge,
    graphData: IGraphData,
  ): ElementDescription {
    const origen = graphData.nodes.find((n) => n.id === edge.sourceId);
    const destino = graphData.nodes.find((n) => n.id === edge.targetId);
    return {
      id: edge.id,
      label: shortenUri(edge.id),
      tipoElemento: `Relación, ${origen?.label ?? edge.sourceId} → ${destino?.label ?? edge.targetId}`,
      anotaciones: [],
      propiedadesDatos: [],
      propiedadesObjeto: [],
      grafico: buildNeighborhoodForEdge(graphData, edge.id),
      isNode: false,
    };
  }

  private splitDataValues(
    dataValues: ReadonlyMap<string, unknown> | undefined,
    isAnnotationProperty: (propertyId: string) => boolean,
  ): { anotaciones: ElementDataEntry[]; propiedadesDatos: ElementDataEntry[] } {
    const anotaciones: ElementDataEntry[] = [];
    const propiedadesDatos: ElementDataEntry[] = [];
    if (!dataValues) return { anotaciones, propiedadesDatos };

    for (const [propiedad, valor] of dataValues.entries()) {
      const entrada = {
        propiedad: shortenUri(propiedad),
        valor: String(valor),
      };
      const esAnotacion =
        PREDICADOS_ANOTACION_CONOCIDOS.has(propiedad) ||
        isAnnotationProperty(propiedad);
      (esAnotacion ? anotaciones : propiedadesDatos).push(entrada);
    }
    return { anotaciones, propiedadesDatos };
  }

  private extractObjectProperties(
    individuo: IIndividual,
  ): ElementRelationEntry[] {
    return individuo.relations
      .filter((r) => r.kind === RelationKind.OBJECT_PROPERTY)
      .map((r) => ({
        predicado: shortenUri(r.propertyId),
        destinoId: r.target.id,
        destinoLabel: r.target.label,
      }));
  }
}
