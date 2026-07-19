import { describe, it, expect } from "vitest";
import { DetailPanelController } from "../../src/presentation/detail-panel-controller";
import { Individual } from "../../src/domain/individual";
import { OntClass } from "../../src/domain/ont-class";

describe("DetailPanelController", () => {
  it("formatea correctamente un individuo con múltiples tipos", () => {
    const panel = new DetailPanelController();
    const individuo = new Individual("i1", "CrearAppsIA");
    individuo.addType(new OntClass("c1", "Competencia"));
    individuo.addType(new OntClass("c2", "HabilidadDigital"));
    const vista = panel.showDetails(individuo);
    expect(vista.tiposMostrados).toHaveLength(2);
  });
});
