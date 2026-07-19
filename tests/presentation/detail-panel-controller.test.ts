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

  it("formatea los dataValues del individuo con la parte final de la URI de la propiedad", () => {
    const panel = new DetailPanelController();
    const individuo = new Individual("i1", "MiConcepto");
    individuo.setDataValue(
      "http://www.w3.org/2000/01/rdf-schema#comment",
      "Un comentario",
    );
    const vista = panel.showDetails(individuo);
    expect(vista.datos).toEqual([
      { propiedad: "comment", valor: "Un comentario" },
    ]);
  });
});
