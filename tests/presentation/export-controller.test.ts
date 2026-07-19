import { describe, it, expect } from "vitest";
import { ExportController } from "../../src/presentation/export-controller";

describe("ExportController (prueba de humo)", () => {
  it("exportAsImage devuelve un Blob sin lanzar excepcion", async () => {
    const fuente = { toDataUrl: () => "data:image/png;base64,AAAA" };
    const controller = new ExportController(fuente);
    await expect(controller.exportAsImage("png")).resolves.toBeInstanceOf(Blob);
  });
});
