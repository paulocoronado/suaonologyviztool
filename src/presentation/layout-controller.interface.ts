export type LayoutKind = "hierarchical" | "force-directed";

export interface ILayoutTarget {
  applyLayoutName(algorithmName: string): void;
}

export interface ILayoutController {
  applyLayout(kind: LayoutKind): void;
}
