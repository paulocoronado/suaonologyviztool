import * as jsonld from "jsonld";
import { Parser as N3Parser } from "n3";
import type { IOntologyModel } from "../domain/interfaces/ontology-model.interface";
import type { IOntologyParser } from "./interfaces/ontology-parser.interface";
import { TripleToModelMapper } from "./triple-to-model-mapper";
import type { Triple } from "./triple";

export class JsonLdParser implements IOntologyParser {
  private mapper: TripleToModelMapper;

  constructor(mapper: TripleToModelMapper) {
    this.mapper = mapper;
  }

  async parse(rawText: string): Promise<IOntologyModel> {
    const documento = JSON.parse(rawText);
    const nQuads = (await jsonld.toRDF(documento, {
      format: "application/n-quads",
    })) as string;
    const quads = new N3Parser({ format: "application/n-quads" }).parse(nQuads);
    const triples: Triple[] = quads.map((q) => ({
      subject: q.subject.value,
      predicate: q.predicate.value,
      object: q.object.value,
      objectType: q.object.termType as Triple["objectType"],
    }));
    return this.mapper.mapTriplesToModel(triples);
  }
}
