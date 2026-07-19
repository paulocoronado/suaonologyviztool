import { describe, it, expect } from "vitest";
import { AppController } from "../../src/app/app-controller";
import type { IParserFactory } from "../../src/parsing/interfaces/parser-factory.interface";
import type { IGraphModelBuilder } from "../../src/graph-logic/interfaces/graph-model-builder.interface";
import { OntologyModel } from "../../src/domain/ontology-model";
import { OntClass } from "../../src/domain/ont-class";

describe("AppController", () => {
  it("findEntityById encuentra una entidad del último modelo procesado", async () => {
    const c1 = new OntClass("c1", "Vehiculo");
    const modeloFalso = new OntologyModel(new Map([["c1", c1]]), new Map());
    const parserFactory: IParserFactory = {
      getParser: () => ({ parse: () => modeloFalso }),
    };
    const graphModelBuilder: IGraphModelBuilder = {
      build: () => ({ nodes: [], edges: [] }),
    };
    const controller = new AppController(parserFactory, graphModelBuilder);

    const archivoFalso = new File(["contenido"], "ejemplo.ttl");
    await controller.handleFile(archivoFalso, "ttl");

    expect(controller.findEntityById("c1")).toBe(c1);
  });
});
