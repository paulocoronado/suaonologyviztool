import { describe, it, expect } from "vitest";
import { ParserFactory } from "../../src/parsing/parser-factory";
import { TurtleParser } from "../../src/parsing/turtle-parser";

describe("ParserFactory", () => {
  it("devuelve un TurtleParser para la extensión .ttl", () => {
    const factory = new ParserFactory();
    expect(factory.getParser("ttl")).toBeInstanceOf(TurtleParser);
  });

  it("lanza un error legible cuando la extensión no está soportada", () => {
    const factory = new ParserFactory();
    expect(() => factory.getParser("xyz")).toThrow(/formato no soportado/i);
  });
});
