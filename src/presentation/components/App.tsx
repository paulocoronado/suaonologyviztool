import { useMemo, useRef, useState } from "react";
import { useAppController } from "../../app/use-app-controller";
import { useGraphInteractions } from "../../app/use-graph-interactions";
import { useDockviewSections } from "../../app/use-dockview-sections";
import { useRendererActions } from "../../app/use-renderer-actions";
import { useAppearanceSettings } from "../../app/use-appearance-settings";
import { NavBar } from "./NavBar";
import { DockviewLayout } from "../layout/DockviewLayout";
import { GraphAppContext } from "../layout/graph-app-context";
import type { CytoscapeRenderer } from "../renderer/cytoscape-renderer";
import { DetailPanelController } from "../detail-panel-controller";
import { ElementDescriptionController } from "../element-description-controller";
import { NodeLabelFormat, resolveNodeLabel } from "../node-label-format";
import { NodeType, type IGraphEdge } from "../../graph-logic/graph-types";
import type { IOntEntity } from "../../domain/interfaces/ont-entity.interface";

const detailPanelController = new DetailPanelController();
const elementDescriptionController = new ElementDescriptionController();

export function App() {
  const {
    graphData,
    fileName,
    error,
    loadFile,
    findEntity,
    isAnnotationProperty,
  } = useAppController();
  const {
    displayedData,
    visibilityMode,
    changeVisibility,
    toggleCollapse,
    search,
  } = useGraphInteractions(graphData);
  const { handleReady, visiblePanelIds, toggleSection, resetLayout } =
    useDockviewSections();
  const { graphBackgroundColor, setGraphBackgroundColor, resetAppearance } =
    useAppearanceSettings();
  const rendererRef = useRef<CytoscapeRenderer | null>(null);
  const { changeLayout, changeSpacing, fitToScreen, focusNode, exportGraph } =
    useRendererActions(rendererRef);
  const [labelFormat, setLabelFormat] = useState<NodeLabelFormat>(
    NodeLabelFormat.RDFS_LABEL,
  );
  const [selection, setSelection] = useState<{
    nodeIds: string[];
    edgeIds: string[];
  }>({ nodeIds: [], edgeIds: [] });
  const [lastRenderedData, setLastRenderedData] = useState(displayedData);

  const dataParaRenderizar = useMemo(() => {
    if (!displayedData) return null;
    return {
      nodes: displayedData.nodes.map((n) => ({
        ...n,
        label: resolveNodeLabel(n, labelFormat),
      })),
      edges: displayedData.edges,
    };
  }, [displayedData, labelFormat]);

  if (dataParaRenderizar !== lastRenderedData) {
    setLastRenderedData(dataParaRenderizar);
    setSelection({ nodeIds: [], edgeIds: [] });
  }

  const detailViews = selection.nodeIds
    .map((id) => findEntity(id))
    .filter((entidad): entidad is IOntEntity => entidad !== undefined)
    .map((entidad) => detailPanelController.showDetails(entidad));

  const elementDescriptions = displayedData
    ? [
        ...selection.nodeIds
          .map((id) => findEntity(id))
          .filter((entidad): entidad is IOntEntity => entidad !== undefined)
          .map((entidad) =>
            elementDescriptionController.describeEntity(
              entidad,
              isAnnotationProperty,
              displayedData,
            ),
          ),
        ...selection.edgeIds
          .map((id) => displayedData.edges.find((e: IGraphEdge) => e.id === id))
          .filter((edge): edge is IGraphEdge => edge !== undefined)
          .map((edge) =>
            elementDescriptionController.describeRelation(edge, displayedData),
          ),
      ]
    : [];

  const handleNodeDoubleClick = (nodeId: string) => {
    const nodo = displayedData?.nodes.find((n) => n.id === nodeId);
    if (nodo?.nodeType === NodeType.CLASS) toggleCollapse(nodeId);
  };

  const handleSearch = (query: string) => {
    const nodo = search(query);
    if (nodo) focusNode(nodo.id);
  };

  const handleResetLayout = () => {
    resetLayout();
    resetAppearance();
  };

  return (
    <div className="flex h-screen flex-col bg-gray-50 font-sans">
      <NavBar
        fileName={fileName}
        hasData={!!dataParaRenderizar}
        labelFormat={labelFormat}
        visibilityMode={visibilityMode}
        visiblePanelIds={visiblePanelIds}
        backgroundColor={graphBackgroundColor}
        onFileSelected={loadFile}
        onVisibilityChange={changeVisibility}
        onLayoutChange={changeLayout}
        onLabelFormatChange={setLabelFormat}
        onSpacingChange={changeSpacing}
        onFitToScreen={fitToScreen}
        onToggleSection={toggleSection}
        onResetLayout={handleResetLayout}
        onBackgroundColorChange={setGraphBackgroundColor}
        onSearch={handleSearch}
        onExportPng={() => exportGraph("png")}
        onExportPdf={() => exportGraph("pdf")}
      />
      {error && <p className="px-6 py-2 text-red-600">{error}</p>}
      {dataParaRenderizar ? (
        <GraphAppContext.Provider
          value={{
            data: dataParaRenderizar,
            detailViews,
            elementDescriptions,
            backgroundColor: graphBackgroundColor,
            onRendererReady: (r) => (rendererRef.current = r),
            onSelectionChange: setSelection,
            onNodeDoubleClick: handleNodeDoubleClick,
          }}
        >
          <DockviewLayout onReady={handleReady} />
        </GraphAppContext.Provider>
      ) : (
        <div className="flex flex-1 items-center justify-center text-gray-400">
          Carga un archivo para comenzar
        </div>
      )}
    </div>
  );
}
