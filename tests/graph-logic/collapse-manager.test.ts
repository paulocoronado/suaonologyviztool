import { describe, it, expect } from "vitest";
import { CollapseManager } from "../../src/graph-logic/collapse-manager";
import { construirGrafoDePrueba } from "./test-helpers";

describe("CollapseManager", () => {
  it("al colapsar una clase, tambien se ocultan sus subclases y los individuos de estas", () => {
    const manager = new CollapseManager(construirGrafoDePrueba());
    const resultado = manager.collapse("c1");
    const idsVisibles = resultado.nodes.map((n) => n.id);
    expect(idsVisibles).not.toContain("c2");
    expect(idsVisibles).not.toContain("c3");
  });

  it("al expandir, se restauran subclases e individuos sin duplicar nodos", () => {
    const manager = new CollapseManager(construirGrafoDePrueba());
    manager.collapse("c1");
    const resultado = manager.expand("c1");
    const ids = resultado.nodes.map((n) => n.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids).toContain("i1");
  });
});
