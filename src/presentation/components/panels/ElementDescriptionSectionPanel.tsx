import { useGraphAppContext } from "../../layout/graph-app-context";
import { ElementDescriptionPanel } from "../ElementDescriptionPanel";

export function ElementDescriptionSectionPanel() {
  const { elementDescriptions } = useGraphAppContext();
  return (
    <div className="h-full overflow-auto p-3">
      <ElementDescriptionPanel descriptions={elementDescriptions} />
    </div>
  );
}
