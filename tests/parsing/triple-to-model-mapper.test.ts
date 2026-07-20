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
        subjectType: TermType.NAMED_NODE,
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
        subjectType: TermType.NAMED_NODE,
        objectType: TermType.NAMED_NODE,
      },
      {
        subject: "i1",
        predicate: "rdfs:comment",
        object: "Un comentario cualquiera",
        subjectType: TermType.NAMED_NODE,
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
        subjectType: TermType.NAMED_NODE,
        objectType: TermType.NAMED_NODE,
      },
    ];
    expect(() =>
      new TripleToModelMapper().mapTriplesToModel(triples),
    ).not.toThrow();
  });

  it("ignora las declaraciones de metadatos OWL como rdf:type owl:ObjectProperty", () => {
    const triples = [
      {
        subject: "nutre",
        predicate: RDF_VOCABULARY.TYPE,
        object: "http://www.w3.org/2002/07/owl#ObjectProperty",
        subjectType: TermType.NAMED_NODE,
        objectType: TermType.NAMED_NODE,
      },
    ];
    const modelo = new TripleToModelMapper().mapTriplesToModel(triples);
    expect(modelo.findById("nutre")).toBeUndefined();
  });

  it("ignora un rdfs:subClassOf hacia un nodo en blanco (restriccion anonima)", () => {
    const triples = [
      {
        subject: "c1",
        predicate: RDF_VOCABULARY.SUBCLASS_OF,
        object: "_:b0",
        subjectType: TermType.NAMED_NODE,
        objectType: TermType.BLANK_NODE,
      },
    ];
    const modelo = new TripleToModelMapper().mapTriplesToModel(triples);
    expect(modelo.findById("_:b0")).toBeUndefined();
  });

  it("crea la clase referenciada en rdfs:domain aunque no tenga relacion de subclase", () => {
    const triples = [
      {
        subject: "tienePlano",
        predicate: RDF_VOCABULARY.DOMAIN,
        object: "c1",
        subjectType: TermType.NAMED_NODE,
        objectType: TermType.NAMED_NODE,
      },
    ];
    const modelo = new TripleToModelMapper().mapTriplesToModel(triples);
    expect(modelo.findById("c1")).toBeDefined();
  });

  it("ignora por completo los triples cuyo sujeto es un nodo en blanco (restricciones anonimas)", () => {
    const triples = [
      {
        subject: "_:b0",
        predicate: RDF_VOCABULARY.TYPE,
        object: "http://www.w3.org/2002/07/owl#Restriction",
        subjectType: TermType.BLANK_NODE,
        objectType: TermType.NAMED_NODE,
      },
    ];
    const modelo = new TripleToModelMapper().mapTriplesToModel(triples);
    expect(modelo.findById("_:b0")).toBeUndefined();
    expect(
      modelo.findById("http://www.w3.org/2002/07/owl#Restriction"),
    ).toBeUndefined();
  });

  it("ignora rdfs:range cuando apunta a un tipo de dato XSD, no a una clase", () => {
    const triples = [
      {
        subject: "tieneNombre",
        predicate: RDF_VOCABULARY.RANGE,
        object: "http://www.w3.org/2001/XMLSchema#string",
        subjectType: TermType.NAMED_NODE,
        objectType: TermType.NAMED_NODE,
      },
    ];
    const modelo = new TripleToModelMapper().mapTriplesToModel(triples);
    expect(
      modelo.findById("http://www.w3.org/2001/XMLSchema#string"),
    ).toBeUndefined();
  });
});
