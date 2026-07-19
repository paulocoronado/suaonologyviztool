import { OntClass } from "../../src/domain/ont-class";
import { Individual } from "../../src/domain/individual";
import { OntologyModel } from "../../src/domain/ontology-model";
import { GraphModelBuilder } from "../../src/graph-logic/graph-model-builder";
import type { IGraphData } from "../../src/graph-logic/graph-types";

export function construirGrafoDePrueba(): IGraphData {
  const vehiculo = new OntClass("c1", "Vehiculo");
  const auto = new OntClass("c2", "Auto");
  const sedan = new OntClass("c3", "Sedan");
  vehiculo.addSubclass(auto);
  auto.addSubclass(sedan);

  const i1 = new Individual("i1", "MiAuto");
  const i2 = new Individual("i2", "AutoDeVecino");
  i1.addType(vehiculo);
  i2.addType(vehiculo);
  vehiculo.addIndividual(i1);
  vehiculo.addIndividual(i2);

  const modelo = new OntologyModel(
    new Map([
      ["c1", vehiculo],
      ["c2", auto],
      ["c3", sedan],
    ]),
    new Map([
      ["i1", i1],
      ["i2", i2],
    ]),
  );

  return new GraphModelBuilder().build(modelo);
}
