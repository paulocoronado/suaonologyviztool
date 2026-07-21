export const LabelPosition = {
  CENTER: "center",
  TOP: "top",
  BOTTOM: "bottom",
  LEFT: "left",
  RIGHT: "right",
} as const;

export type LabelPosition = (typeof LabelPosition)[keyof typeof LabelPosition];

export interface LabelAlignment {
  halign: "left" | "center" | "right";
  valign: "top" | "center" | "bottom";
}

const ALINEACIONES: Record<LabelPosition, LabelAlignment> = {
  center: { halign: "center", valign: "center" },
  top: { halign: "center", valign: "top" },
  bottom: { halign: "center", valign: "bottom" },
  left: { halign: "left", valign: "center" },
  right: { halign: "right", valign: "center" },
};

export function resolveLabelAlignment(position: LabelPosition): LabelAlignment {
  return ALINEACIONES[position];
}
