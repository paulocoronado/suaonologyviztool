import { useMemo, useState } from "react";
import { FilterService } from "../graph-logic/filter-service";
import { SearchService } from "../graph-logic/search-service";
import { CollapseManager } from "../graph-logic/collapse-manager";
import {
  NodeVisibilityMode,
  type IGraphData,
  type IGraphNode,
} from "../graph-logic/graph-types";

export function useGraphInteractions(baseData: IGraphData | null) {
  const [overrideData, setOverrideData] = useState<IGraphData | null>(null);
  const [lastBaseData, setLastBaseData] = useState<IGraphData | null>(baseData);
  const [selectedNode, setSelectedNode] = useState<IGraphNode | null>(null);
  const [visibilityMode, setVisibilityMode] = useState<NodeVisibilityMode>(
    NodeVisibilityMode.BOTH,
  );

  if (baseData !== lastBaseData) {
    setLastBaseData(baseData);
    setOverrideData(null);
    setVisibilityMode(NodeVisibilityMode.BOTH);
  }

  const displayedData = overrideData ?? baseData;

  const filterService = useMemo(
    () => (baseData ? new FilterService(baseData) : null),
    [baseData],
  );
  const searchService = useMemo(
    () => (baseData ? new SearchService(baseData) : null),
    [baseData],
  );
  const collapseManager = useMemo(
    () => (baseData ? new CollapseManager(baseData) : null),
    [baseData],
  );

  const changeVisibility = (mode: NodeVisibilityMode): void => {
    setVisibilityMode(mode);
    if (filterService) setOverrideData(filterService.filterByVisibility(mode));
  };

  const search = (query: string): IGraphNode | null => {
    const resultado = searchService?.findByName(query) ?? null;
    setSelectedNode(resultado);
    return resultado;
  };

  const toggleCollapse = (classId: string): void => {
    if (!collapseManager) return;
    const actualizado = collapseManager.isCollapsed(classId)
      ? collapseManager.expand(classId)
      : collapseManager.collapse(classId);
    setOverrideData(actualizado);
  };

  return {
    displayedData,
    selectedNode,
    visibilityMode,
    changeVisibility,
    search,
    toggleCollapse,
  };
}
