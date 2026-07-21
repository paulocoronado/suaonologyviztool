export type LayoutKind =
  | "force-directed"
  | "hierarchical"
  | "grid"
  | "circle"
  | "concentric"
  | "random";
export interface ILayoutTarget {
  applyLayoutName(algorithmName: string): void;
  setSpacingFactor(spacingFactor: number): void;
}

export interface ILayoutController {
  applyLayout(kind: LayoutKind): void;
  setSpacing(factor: number): void;
}
