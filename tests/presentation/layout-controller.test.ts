import { describe, it, expect, vi } from "vitest";
import { LayoutController } from "../../src/presentation/layout-controller";

describe("LayoutController", () => {
  it("delega el nombre correcto de algoritmo segun el tipo de layout", () => {
    const target = { applyLayoutName: vi.fn(), setSpacingFactor: vi.fn() };
    const controller = new LayoutController(target);
    controller.applyLayout("hierarchical");
    expect(target.applyLayoutName).toHaveBeenCalledWith("breadthfirst");
  });

  it("delega el factor de espaciado al target", () => {
    const target = { applyLayoutName: vi.fn(), setSpacingFactor: vi.fn() };
    const controller = new LayoutController(target);
    controller.setSpacing(2);
    expect(target.setSpacingFactor).toHaveBeenCalledWith(2);
  });
});
