import { describe, it, expect } from "vitest";
import {
  NodeLabelFormat,
  resolveNodeLabel,
} from "../../src/presentation/node-label-format";
import { NodeType } from "../../src/graph-logic/graph-types";

describe("resolveNodeLabel", () => {
  const nodo = {
    id: "http://example.org/onto#Concepto",
    label: "x",
    nodeType: NodeType.CLASS,
    rdfsLabel: "Concepto",
  };

  it("devuelve la URI completa cuando el formato es FULL_URI", () => {
    expect(resolveNodeLabel(nodo, NodeLabelFormat.FULL_URI)).toBe(
      "http://example.org/onto#Concepto",
    );
  });

  it("devuelve el nombre corto cuando el formato es LOCAL_NAME", () => {
    expect(resolveNodeLabel(nodo, NodeLabelFormat.LOCAL_NAME)).toBe("Concepto");
  });

  it("cae al nombre corto si RDFS_LABEL no tiene valor", () => {
    const sinEtiqueta = { ...nodo, rdfsLabel: undefined };
    expect(resolveNodeLabel(sinEtiqueta, NodeLabelFormat.RDFS_LABEL)).toBe(
      "Concepto",
    );
  });
});
