import type { IOntologyModel } from "../../domain/interfaces/ontology-model.interface";
import type { IGraphData } from "../graph-types";

export interface IGraphModelBuilder {
  build(model: IOntologyModel): IGraphData;
}
