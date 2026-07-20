import { useGraphAppContext } from "../../layout/graph-app-context";
import { GraphCanvas } from "../GraphCanvas";

export function GraphSectionPanel() {
  const { data, onRendererReady, onSelectionChange, onNodeDoubleClick } =
    useGraphAppContext();
  if (!data) return null;
  return (
    <GraphCanvas
      data={data}
      onRendererReady={onRendererReady}
      onSelectionChange={onSelectionChange}
      onNodeDoubleClick={onNodeDoubleClick}
    />
  );
}
