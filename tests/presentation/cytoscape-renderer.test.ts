import { describe, it, expect } from "vitest";
import { CytoscapeRenderer } from "../../src/presentation/renderer/cytoscape-renderer";

describe("CytoscapeRenderer (prueba de humo)", () => {
  it("se instancia en modo headless y renderiza un grafo minimo sin lanzar excepcion", () => {
    const renderer = new CytoscapeRenderer();
    expect(() => renderer.render({ nodes: [], edges: [] })).not.toThrow();
  });
});
