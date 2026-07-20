import { useState } from "react";

const DEFAULT_BACKGROUND_COLOR = "#f9fafb";

export function useAppearanceSettings() {
  const [graphBackgroundColor, setGraphBackgroundColor] = useState(
    DEFAULT_BACKGROUND_COLOR,
  );

  const resetAppearance = (): void => {
    setGraphBackgroundColor(DEFAULT_BACKGROUND_COLOR);
  };

  return { graphBackgroundColor, setGraphBackgroundColor, resetAppearance };
}
