import type { IParserFactory } from "./interfaces/parser-factory.interface";
import type { IOntologyParser } from "./interfaces/ontology-parser.interface";
import { TurtleParser } from "./turtle-parser";
import { TripleToModelMapper } from "./triple-to-model-mapper";

export class ParserFactory implements IParserFactory {
  getParser(fileExtension: string): IOntologyParser {
    const mapper = new TripleToModelMapper();
    switch (fileExtension) {
      case "ttl":
        return new TurtleParser(mapper);
      default:
        throw new Error(`Formato no soportado: ${fileExtension}`);
    }
  }
}
