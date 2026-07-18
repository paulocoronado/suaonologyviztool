import { describe, it, expect } from "vitest";
import { OntologyModel } from "../../src/domain/ontology-model";
import { OntClass } from "../../src/domain/ont-class";
import { Individual } from "../../src/domain/individual";

describe("OntologyModel", () => {
  it("findById encuentra tanto clases como individuos por su id", () => {
    const c1 = new OntClass("c1", "Vehiculo");
    const i1 = new Individual("i1", "MiAuto");
    const modelo = new OntologyModel(
      new Map([["c1", c1]]),
      new Map([["i1", i1]]),
    );
    expect(modelo.findById("c1")).toBe(c1);
    expect(modelo.findById("i1")).toBe(i1);
    expect(modelo.findById("no-existe")).toBeUndefined();
  });

  it("getRootClasses solo devuelve clases sin superclases", () => {
    const raiz = new OntClass("c1", "Vehiculo");
    const hijo = new OntClass("c2", "Auto");
    raiz.addSubclass(hijo);
    const modelo = new OntologyModel(
      new Map([
        ["c1", raiz],
        ["c2", hijo],
      ]),
      new Map(),
    );
    expect(modelo.getRootClasses()).toEqual([raiz]);
  });
});
