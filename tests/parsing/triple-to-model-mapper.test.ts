import { describe, it, expect } from "vitest";
import { TripleToModelMapper } from "../../src/parsing/triple-to-model-mapper";
import { TermType } from "../../src/parsing/triple";
import { RDF_VOCABULARY } from "../../src/parsing/rdf-vocabulary";
import { RelationKind } from "../../src/domain/interfaces/relation.interface";
import type { IIndividual } from "../../src/domain/interfaces/individual.interface";

describe("TripleToModelMapper", () => {
  it("mapea un triple rdf:type a una relación TYPE_OF", () => {
    const triples = [
      {
        subject: "i1",
        predicate: RDF_VOCABULARY.TYPE,
        object: "c1",
        objectType: TermType.NAMED_NODE,
      },
    ];
    const modelo = new TripleToModelMapper().mapTriplesToModel(triples);
    const individuo = modelo.findById("i1") as IIndividual;
    expect(individuo.relations[0].kind).toBe(RelationKind.TYPE_OF);
  });

  it("un triple con objeto literal se guarda como dato del individuo, no como relación", () => {
    const triples = [
      {
        subject: "i1",
        predicate: RDF_VOCABULARY.TYPE,
        object: "c1",
        objectType: TermType.NAMED_NODE,
      },
      {
        subject: "i1",
        predicate: "rdfs:comment",
        object: "Un comentario cualquiera",
        objectType: TermType.LITERAL,
      },
    ];
    const modelo = new TripleToModelMapper().mapTriplesToModel(triples);
    const individuo = modelo.findById("i1") as IIndividual;
    expect(individuo.dataValues.get("rdfs:comment")).toBe(
      "Un comentario cualquiera",
    );
    expect(individuo.relations).toHaveLength(1);
  });

  it("ignora silenciosamente un triple que referencia una entidad no reconocida", () => {
    const triples = [
      {
        subject: "i1",
        predicate: "objProp",
        object: "no-existe",
        objectType: TermType.NAMED_NODE,
      },
    ];
    expect(() =>
      new TripleToModelMapper().mapTriplesToModel(triples),
    ).not.toThrow();
  });
});
