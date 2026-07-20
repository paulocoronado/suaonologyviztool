import { describe, it, expect } from "vitest";
import { CytoscapeRenderer } from "../../src/presentation/renderer/cytoscape-renderer";
import { NodeType } from "../../src/graph-logic/graph-types";

describe("CytoscapeRenderer (prueba de humo)", () => {
  it("se instancia en modo headless y renderiza un grafo minimo sin lanzar excepcion", () => {
    const renderer = new CytoscapeRenderer();
    expect(() => renderer.render({ nodes: [], edges: [] })).not.toThrow();
  });

  it("onSelectionChange entrega los ids de los nodos seleccionados", () => {
    const renderer = new CytoscapeRenderer();
    renderer.render({
      nodes: [{ id: "a", label: "A", nodeType: NodeType.CLASS }],
      edges: [],
    });
    let idsRecibidos: string[] = [];
    renderer.onSelectionChange((ids) => {
      idsRecibidos = ids;
    });
    renderer.selectNode("a");
    expect(idsRecibidos).toEqual(["a"]);
  });
});
