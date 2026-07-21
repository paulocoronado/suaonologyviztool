export const NodeShape = {
  ELLIPSE: "ellipse",
  RECTANGLE: "rectangle",
  ROUND_RECTANGLE: "round-rectangle",
  TRIANGLE: "triangle",
  DIAMOND: "diamond",
  HEXAGON: "hexagon",
  PENTAGON: "pentagon",
  STAR: "star",
  TAG: "tag",
} as const;

export type NodeShape = (typeof NodeShape)[keyof typeof NodeShape];
