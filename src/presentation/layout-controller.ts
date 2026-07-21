import type {
  ILayoutController,
  ILayoutTarget,
  LayoutKind,
} from "./layout-controller.interface";

const ALGORITMOS: Record<LayoutKind, string> = {
  "force-directed": "cose",
  hierarchical: "breadthfirst",
  grid: "grid",
  circle: "circle",
  concentric: "concentric",
  random: "random",
};

export class LayoutController implements ILayoutController {
  private target: ILayoutTarget;

  constructor(target: ILayoutTarget) {
    this.target = target;
  }

  applyLayout(kind: LayoutKind): void {
    this.target.applyLayoutName(ALGORITMOS[kind]);
  }

  setSpacing(factor: number): void {
    this.target.setSpacingFactor(factor);
  }
}
