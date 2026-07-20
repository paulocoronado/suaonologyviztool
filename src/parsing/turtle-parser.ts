import { Parser as N3Parser } from "n3";
import type { IOntologyModel } from "../domain/interfaces/ontology-model.interface";
import type { IOntologyParser } from "./interfaces/ontology-parser.interface";
import { TripleToModelMapper } from "./triple-to-model-mapper";
import type { Triple } from "./triple";

export class TurtleParser implements IOntologyParser {
  private mapper: TripleToModelMapper;

  constructor(mapper: TripleToModelMapper) {
    this.mapper = mapper;
  }

  async parse(rawText: string): Promise<IOntologyModel> {
    const quads = new N3Parser().parse(rawText);
    const triples: Triple[] = quads.map((q) => ({
      subject: q.subject.value,
      predicate: q.predicate.value,
      object: q.object.value,
      subjectType: q.subject.termType as Triple["subjectType"],
      objectType: q.object.termType as Triple["objectType"],
    }));
    return this.mapper.mapTriplesToModel(triples);
  }
}
