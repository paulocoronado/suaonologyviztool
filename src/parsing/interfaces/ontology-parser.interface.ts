import type { IOntologyModel } from "../../domain/interfaces/ontology-model.interface";

export interface IOntologyParser {
  parse(rawText: string): IOntologyModel;
}
