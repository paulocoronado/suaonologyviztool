import { describe, it, expect } from "vitest";
import { OntClass } from "../../src/domain/ont-class";

describe("OntClass", () => {
  it("acumula todas las subclases al llamar addSubclass", () => {
    const padre = new OntClass("c1", "Vehiculo");
    const hijo = new OntClass("c2", "Auto");
    padre.addSubclass(hijo);
    expect(padre.subClasses).toContain(hijo);
  });

  it("getAllDescendants incluye subclases de subclases, no solo el primer nivel", () => {
    const abuelo = new OntClass("c1", "Vehiculo");
    const padre = new OntClass("c2", "Auto");
    const hijo = new OntClass("c3", "Sedan");
    abuelo.addSubclass(padre);
    padre.addSubclass(hijo);
    expect(abuelo.getAllDescendants()).toEqual(
      expect.arrayContaining([padre, hijo]),
    );
  });
});
