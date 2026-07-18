import { describe, it, expect } from "vitest";
import { Individual } from "../../src/domain/individual";
import { OntClass } from "../../src/domain/ont-class";
import { Relation } from "../../src/domain/relation";
import { RelationKind } from "../../src/domain/interfaces/relation.interface";

describe("Individual", () => {
  it("conserva más de un tipo cuando hay multi-instanciación", () => {
    const ind = new Individual("i1", "CrearAppsIA");
    const c1 = new OntClass("c1", "Competencia");
    const c2 = new OntClass("c2", "HabilidadDigital");
    ind.addType(c1);
    ind.addType(c2);
    expect(ind.types).toHaveLength(2);
  });

  it("getRelationsTo filtra solo las relaciones hacia el individuo indicado", () => {
    const origen = new Individual("i1", "CrearAppsIA");
    const destinoA = new Individual("i2", "PensamientoComputacional");
    const destinoB = new Individual("i3", "Programacion");
    origen.addRelation(
      new Relation(origen, destinoA, "requiere", RelationKind.OBJECT_PROPERTY),
    );
    origen.addRelation(
      new Relation(origen, destinoB, "requiere", RelationKind.OBJECT_PROPERTY),
    );
    expect(origen.getRelationsTo("i2")).toHaveLength(1);
    expect(origen.getRelationsTo("i2")[0].target.id).toBe("i2");
  });
});
