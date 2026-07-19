import { describe, it, expect } from "vitest";
import { SearchService } from "../../src/graph-logic/search-service";
import { construirGrafoDePrueba } from "./test-helpers";

describe("SearchService", () => {
  it("encuentra un nodo por coincidencia exacta de nombre", () => {
    const servicio = new SearchService(construirGrafoDePrueba());
    expect(servicio.findByName("Sedan")?.id).toBe("c3");
  });

  it("devuelve null cuando no hay coincidencia", () => {
    const servicio = new SearchService(construirGrafoDePrueba());
    expect(servicio.findByName("NoExiste")).toBeNull();
  });
});
