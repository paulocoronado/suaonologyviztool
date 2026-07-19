import { describe, it, expect } from "vitest";
import { ParserFactory } from "../../src/parsing/parser-factory";
import { TurtleParser } from "../../src/parsing/turtle-parser";
import { RdfXmlParser } from "../../src/parsing/rdf-xml-parser";
import { JsonLdParser } from "../../src/parsing/json-ld-parser";

describe("ParserFactory", () => {
  it("devuelve un TurtleParser para la extensión .ttl", () => {
    const factory = new ParserFactory();
    expect(factory.getParser("ttl")).toBeInstanceOf(TurtleParser);
  });

  it("devuelve un RdfXmlParser para la extensión .rdf", () => {
    const factory = new ParserFactory();
    expect(factory.getParser("rdf")).toBeInstanceOf(RdfXmlParser);
  });

  it("devuelve un JsonLdParser para la extensión .jsonld", () => {
    const factory = new ParserFactory();
    expect(factory.getParser("jsonld")).toBeInstanceOf(JsonLdParser);
  });

  it("lanza un error legible cuando la extensión no está soportada", () => {
    const factory = new ParserFactory();
    expect(() => factory.getParser("xyz")).toThrow(/formato no soportado/i);
  });
});
