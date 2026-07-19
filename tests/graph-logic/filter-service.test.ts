import { describe, it, expect } from "vitest";
import { FilterService } from "../../src/graph-logic/filter-service";
import { NodeType } from "../../src/graph-logic/graph-types";
import { construirGrafoDePrueba } from "./test-helpers";

describe("FilterService", () => {
  it("toggleIndividualsVisibility(false) oculta todos los nodos tipo INDIVIDUAL", () => {
    const servicio = new FilterService(construirGrafoDePrueba());
    const resultado = servicio.toggleIndividualsVisibility(false);
    expect(
      resultado.nodes.every((n) => n.nodeType !== NodeType.INDIVIDUAL),
    ).toBe(true);
  });
});
