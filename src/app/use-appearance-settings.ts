import { useState } from "react";
import { NodeShape } from "../presentation/renderer/node-shape";
import { LabelPosition } from "../presentation/renderer/label-position";
import { EdgeCurveStyle } from "../presentation/renderer/edge-curve-style";

export const APPEARANCE_DEFAULTS = {
  backgroundColor: "#f9fafb",
  classShape: NodeShape.ROUND_RECTANGLE,
  individualShape: NodeShape.ELLIPSE,
  classSize: 30,
  individualSize: 24,
  labelPosition: LabelPosition.CENTER,
  labelFontSize: 12,
  labelFontColor: "#111827",
  edgeStyle: EdgeCurveStyle.BEZIER,
} as const;

export function useAppearanceSettings() {
  const [graphBackgroundColor, setGraphBackgroundColor] = useState<string>(
    APPEARANCE_DEFAULTS.backgroundColor,
  );
  const [classShape, setClassShape] = useState<NodeShape>(
    APPEARANCE_DEFAULTS.classShape,
  );
  const [individualShape, setIndividualShape] = useState<NodeShape>(
    APPEARANCE_DEFAULTS.individualShape,
  );
  const [classSize, setClassSize] = useState<number>(
    APPEARANCE_DEFAULTS.classSize,
  );
  const [individualSize, setIndividualSize] = useState<number>(
    APPEARANCE_DEFAULTS.individualSize,
  );
  const [labelPosition, setLabelPosition] = useState<LabelPosition>(
    APPEARANCE_DEFAULTS.labelPosition,
  );
  const [edgeStyle, setEdgeStyle] = useState<EdgeCurveStyle>(
    APPEARANCE_DEFAULTS.edgeStyle,
  );

  const [labelFontSize, setLabelFontSize] = useState<number>(
    APPEARANCE_DEFAULTS.labelFontSize,
  );
  const [labelFontColor, setLabelFontColor] = useState<string>(
    APPEARANCE_DEFAULTS.labelFontColor,
  );

  const resetAppearance = (): void => {
    setGraphBackgroundColor(APPEARANCE_DEFAULTS.backgroundColor);
    setClassShape(APPEARANCE_DEFAULTS.classShape);
    setIndividualShape(APPEARANCE_DEFAULTS.individualShape);
    setClassSize(APPEARANCE_DEFAULTS.classSize);
    setIndividualSize(APPEARANCE_DEFAULTS.individualSize);
    setLabelPosition(APPEARANCE_DEFAULTS.labelPosition);
    setEdgeStyle(APPEARANCE_DEFAULTS.edgeStyle);
    setLabelFontSize(APPEARANCE_DEFAULTS.labelFontSize);
    setLabelFontColor(APPEARANCE_DEFAULTS.labelFontColor);
  };

  return {
    graphBackgroundColor,
    setGraphBackgroundColor,
    classShape,
    setClassShape,
    individualShape,
    setIndividualShape,
    classSize,
    setClassSize,
    individualSize,
    setIndividualSize,
    labelPosition,
    setLabelPosition,
    edgeStyle,
    setEdgeStyle,
    labelFontSize,
    setLabelFontSize,
    labelFontColor,
    setLabelFontColor,
    resetAppearance,
  };
}
