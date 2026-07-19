import { NavMenu } from "./NavMenu";
import { NodeLabelFormatSelector } from "./NodeLabelFormatSelector";
import type { NodeLabelFormat } from "../node-label-format";

interface FormatMenuProps {
  labelFormat: NodeLabelFormat;
  onLabelFormatChange: (format: NodeLabelFormat) => void;
}

export function FormatMenu({
  labelFormat,
  onLabelFormatChange,
}: FormatMenuProps) {
  return (
    <NavMenu label="Formato">
      <NodeLabelFormatSelector
        value={labelFormat}
        onChange={onLabelFormatChange}
      />
    </NavMenu>
  );
}
