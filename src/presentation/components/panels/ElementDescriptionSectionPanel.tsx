import { useGraphAppContext } from "../../layout/graph-app-context";
import { ElementDescriptionPanel } from "../ElementDescriptionPanel";

export function ElementDescriptionSectionPanel() {
  const { elementDescriptions, onResizeNode } = useGraphAppContext();
  return (
    <div className="h-full overflow-auto p-3">
      <ElementDescriptionPanel
        descriptions={elementDescriptions}
        onResizeNode={onResizeNode}
      />
    </div>
  );
}
