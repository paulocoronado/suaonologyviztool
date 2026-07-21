import { createContext, useContext } from "react";
import type { IGraphData } from "../../graph-logic/graph-types";
import type { DetailView } from "../detail-panel-controller";
import type { CytoscapeRenderer } from "../renderer/cytoscape-renderer";
import type { ElementDescription } from "../element-description-controller";

export interface GraphAppContextValue {
  data: IGraphData | null;
  detailViews: DetailView[];
  elementDescriptions: ElementDescription[];
  backgroundColor: string;
  onRendererReady: (renderer: CytoscapeRenderer) => void;
  onSelectionChange: (selection: {
    nodeIds: string[];
    edgeIds: string[];
  }) => void;
  onNodeDoubleClick: (nodeId: string) => void;
  onResizeNode: (nodeId: string, size: number) => void;
}
export const GraphAppContext = createContext<GraphAppContextValue | null>(null);

export function useGraphAppContext(): GraphAppContextValue {
  const contexto = useContext(GraphAppContext);
  if (!contexto)
    throw new Error(
      "useGraphAppContext debe usarse dentro de GraphAppContext.Provider",
    );
  return contexto;
}
