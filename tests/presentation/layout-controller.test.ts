import { describe, it, expect, vi } from "vitest";
import { LayoutController } from "../../src/presentation/layout-controller";

describe("LayoutController", () => {
  it("delega el nombre correcto de algoritmo segun el tipo de layout", () => {
    const target = { applyLayoutName: vi.fn() };
    const controller = new LayoutController(target);
    controller.applyLayout("hierarchical");
    expect(target.applyLayoutName).toHaveBeenCalledWith("breadthfirst");
  });
});
