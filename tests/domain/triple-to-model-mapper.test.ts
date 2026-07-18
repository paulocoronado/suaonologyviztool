import { describe, it, expect } from "vitest";
import { TripleToModelMapper } from "../../src/parsing/triple-to-model-mapper";
import { RelationKind } from "../../src/domain/interfaces/relation.interface";
import type { IIndividual } from "../../src/domain/interfaces/individual.interface";

describe("TripleToModelMapper", () => {
  it("mapea un triple rdf:type a una relación TYPE_OF", () => {
    const triples = [{ subject: "i1", predicate: "rdf:type", object: "c1" }];
    const modelo = new TripleToModelMapper().mapTriplesToModel(triples);
    const individuo = modelo.findById("i1") as IIndividual;
    expect(individuo.relations[0].kind).toBe(RelationKind.TYPE_OF);
  });

  it("reporta un error claro cuando un triple referencia un sujeto inexistente", () => {
    const triples = [
      { subject: "i1", predicate: "objProp", object: "no-existe" },
    ];
    expect(() =>
      new TripleToModelMapper().mapTriplesToModel(triples),
    ).toThrow();
  });
});
