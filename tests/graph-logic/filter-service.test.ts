import { describe, it, expect } from "vitest";
import { FilterService } from "../../src/graph-logic/filter-service";
import {
  NodeType,
  NodeVisibilityMode,
} from "../../src/graph-logic/graph-types";
import { construirGrafoDePrueba } from "./test-helpers";

describe("FilterService", () => {
  it("CLASSES_ONLY oculta todos los nodos tipo INDIVIDUAL", () => {
    const servicio = new FilterService(construirGrafoDePrueba());
    const resultado = servicio.filterByVisibility(
      NodeVisibilityMode.CLASSES_ONLY,
    );
    expect(
      resultado.nodes.every((n) => n.nodeType !== NodeType.INDIVIDUAL),
    ).toBe(true);
  });

  it("INDIVIDUALS_ONLY oculta todos los nodos tipo CLASS", () => {
    const servicio = new FilterService(construirGrafoDePrueba());
    const resultado = servicio.filterByVisibility(
      NodeVisibilityMode.INDIVIDUALS_ONLY,
    );
    expect(resultado.nodes.every((n) => n.nodeType !== NodeType.CLASS)).toBe(
      true,
    );
  });

  it("BOTH devuelve el grafo completo sin filtrar", () => {
    const original = construirGrafoDePrueba();
    const servicio = new FilterService(original);
    expect(servicio.filterByVisibility(NodeVisibilityMode.BOTH)).toBe(original);
  });
});
