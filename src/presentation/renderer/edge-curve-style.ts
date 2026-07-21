export const EdgeCurveStyle = {
  BEZIER: "bezier",
  STRAIGHT: "straight",
  TAXI: "taxi",
  ROUND_TAXI: "round-taxi",
} as const;

export type EdgeCurveStyle =
  (typeof EdgeCurveStyle)[keyof typeof EdgeCurveStyle];
