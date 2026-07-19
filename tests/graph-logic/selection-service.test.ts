import { describe, it, expect } from "vitest";
import { SelectionService } from "../../src/graph-logic/selection-service";
import { construirGrafoDePrueba } from "./test-helpers";

describe("SelectionService", () => {
  it("getNeighbors devuelve solo los nodos conectados directamente, no toda la red", () => {
    const servicio = new SelectionService(construirGrafoDePrueba());
    const vecinos = servicio.getNeighbors("c1");
    expect(vecinos.map((n) => n.id)).not.toContain("c1");
    expect(vecinos.length).toBeGreaterThan(0);
  });
});
