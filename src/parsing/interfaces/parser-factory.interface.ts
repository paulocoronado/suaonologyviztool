import type { IOntologyParser } from "./ontology-parser.interface";

export interface IParserFactory {
  getParser(fileExtension: string): IOntologyParser;
}
