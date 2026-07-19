import { describe, it, expect } from "vitest";
import { CollapseManager } from "../../src/graph-logic/collapse-manager";
import { NodeType } from "../../src/graph-logic/graph-types";
import { construirGrafoDePrueba } from "./test-helpers";

describe("CollapseManager", () => {
  it("al colapsar una clase, sus individuos quedan bajo un único nodo compuesto", () => {
    const manager = new CollapseManager(construirGrafoDePrueba());
    const resultado = manager.collapse("c1");
    const individuosVisibles = resultado.nodes.filter(
      (n) => n.nodeType === NodeType.INDIVIDUAL,
    );
    expect(individuosVisibles).toHaveLength(0);
    expect(resultado.nodes.some((n) => n.id === "c1")).toBe(true);
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
