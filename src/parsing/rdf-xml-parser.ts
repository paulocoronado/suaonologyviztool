import { RdfXmlParser as StreamingRdfXmlParser } from "rdfxml-streaming-parser";
import { Readable } from "readable-stream";
import type { IOntologyModel } from "../domain/interfaces/ontology-model.interface";
import type { IOntologyParser } from "./interfaces/ontology-parser.interface";
import { TripleToModelMapper } from "./triple-to-model-mapper";
import type { Triple } from "./triple";

export class RdfXmlParser implements IOntologyParser {
  private mapper: TripleToModelMapper;

  constructor(mapper: TripleToModelMapper) {
    this.mapper = mapper;
  }

  async parse(rawText: string): Promise<IOntologyModel> {
    const triples = await this.streamToTriples(rawText);
    return this.mapper.mapTriplesToModel(triples);
  }

  private streamToTriples(rawText: string): Promise<Triple[]> {
    return new Promise((resolve, reject) => {
      const triples: Triple[] = [];
      const streamParser = new StreamingRdfXmlParser();
      const entrada = new Readable({ read: () => {} });
      entrada.push(rawText);
      entrada.push(null);
      entrada.pipe(streamParser);
      streamParser.on("data", (quad) => {
        triples.push({
          subject: quad.subject.value,
          predicate: quad.predicate.value,
          object: quad.object.value,
          objectType: quad.object.termType,
        });
      });
      streamParser.on("error", reject);
      streamParser.on("end", () => resolve(triples));
    });
  }
}
