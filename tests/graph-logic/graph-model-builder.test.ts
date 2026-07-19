import { describe, it, expect } from "vitest";
import { GraphModelBuilder } from "../../src/graph-logic/graph-model-builder";
import { NodeType } from "../../src/graph-logic/graph-types";
import { OntClass } from "../../src/domain/ont-class";
import { Individual } from "../../src/domain/individual";
import { OntologyModel } from "../../src/domain/ontology-model";

function construirModeloDePrueba() {
  const c1 = new OntClass("c1", "Vehiculo");
  const i1 = new Individual("i1", "MiAuto");
  i1.addType(c1);
  c1.addIndividual(i1);
  return new OntologyModel(new Map([["c1", c1]]), new Map([["i1", i1]]));
}

describe("GraphModelBuilder", () => {
  it("asigna nodeType INDIVIDUAL a los individuos y CLASS a las clases", () => {
    const modelo = construirModeloDePrueba();
    const { nodes } = new GraphModelBuilder().build(modelo);
    const claseNode = nodes.find((n) => n.id === "c1");
    const indNode = nodes.find((n) => n.id === "i1");
    expect(claseNode?.nodeType).toBe(NodeType.CLASS);
    expect(indNode?.nodeType).toBe(NodeType.INDIVIDUAL);
  });
  it("extrae rdfsLabel del dataValues de la clase cuando existe", () => {
    const c1 = new OntClass("c1", "Vehiculo");
    c1.setDataValue("http://www.w3.org/2000/01/rdf-schema#label", "Vehículo");
    const modelo = new OntologyModel(new Map([["c1", c1]]), new Map());
    const { nodes } = new GraphModelBuilder().build(modelo);
    expect(nodes.find((n) => n.id === "c1")?.rdfsLabel).toBe("Vehículo");
  });
});
