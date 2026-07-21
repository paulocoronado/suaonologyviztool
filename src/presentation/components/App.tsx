import { useMemo, useRef, useState } from "react";
import { useAppController } from "../../app/use-app-controller";
import { useGraphInteractions } from "../../app/use-graph-interactions";
import { useDockviewSections } from "../../app/use-dockview-sections";
import { useRendererActions } from "../../app/use-renderer-actions";
import {
  useAppearanceSettings,
  APPEARANCE_DEFAULTS,
} from "../../app/use-appearance-settings";
import { NavBar } from "./NavBar";
import { DockviewLayout } from "../layout/DockviewLayout";
import { GraphAppContext } from "../layout/graph-app-context";
import type { CytoscapeRenderer } from "../renderer/cytoscape-renderer";
import { DetailPanelController } from "../detail-panel-controller";
import { ElementDescriptionController } from "../element-description-controller";
import { NodeLabelFormat, resolveNodeLabel } from "../node-label-format";
import { NodeType, type IGraphEdge } from "../../graph-logic/graph-types";
import type { IOntEntity } from "../../domain/interfaces/ont-entity.interface";
import type { NodeShape } from "../renderer/node-shape";
import type { LabelPosition } from "../renderer/label-position";
import type { EdgeCurveStyle } from "../renderer/edge-curve-style";

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
  const {
    graphBackgroundColor,
    setGraphBackgroundColor,
    classShape,
    setClassShape,
    individualShape,
    setIndividualShape,
    labelPosition,
    setLabelPosition,
    edgeStyle,
    setEdgeStyle,
    resetAppearance,
    classSize,
    setClassSize,
    individualSize,
    setIndividualSize,
  } = useAppearanceSettings();
  const rendererRef = useRef<CytoscapeRenderer | null>(null);
  const {
    changeLayout,
    changeSpacing,
    fitToScreen,
    focusNode,
    exportGraph,
    changeEdgeStyle,
    changeNodeShape,
    changeLabelPosition,
    changeNodeSize,
    resizeNode,
    clearAllNodeResizes,
  } = useRendererActions(rendererRef);
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

  const handleEdgeStyleChange = (style: EdgeCurveStyle) => {
    setEdgeStyle(style);
    changeEdgeStyle(style);
  };

  const handleNodeShapeChange = (
    kind: "class" | "individual",
    shape: NodeShape,
  ) => {
    if (kind === "class") setClassShape(shape);
    else setIndividualShape(shape);
    changeNodeShape(kind, shape);
  };

  const handleLabelPositionChange = (position: LabelPosition) => {
    setLabelPosition(position);
    changeLabelPosition(position);
  };

  const handleResetLayout = () => {
    resetLayout();
    resetAppearance();
    changeEdgeStyle(APPEARANCE_DEFAULTS.edgeStyle);
    changeNodeShape("class", APPEARANCE_DEFAULTS.classShape);
    changeNodeShape("individual", APPEARANCE_DEFAULTS.individualShape);
    changeNodeSize("class", APPEARANCE_DEFAULTS.classSize);
    changeNodeSize("individual", APPEARANCE_DEFAULTS.individualSize);
    changeLabelPosition(APPEARANCE_DEFAULTS.labelPosition);
    clearAllNodeResizes();
  };

  const handleNodeSizeChange = (kind: "class" | "individual", size: number) => {
    if (kind === "class") setClassSize(size);
    else setIndividualSize(size);
    changeNodeSize(kind, size);
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
        labelPosition={labelPosition}
        classShape={classShape}
        individualShape={individualShape}
        edgeStyle={edgeStyle}
        onFileSelected={loadFile}
        onVisibilityChange={changeVisibility}
        onLayoutChange={changeLayout}
        onLabelFormatChange={setLabelFormat}
        onLabelPositionChange={handleLabelPositionChange}
        onNodeShapeChange={handleNodeShapeChange}
        onEdgeStyleChange={handleEdgeStyleChange}
        onSpacingChange={changeSpacing}
        onFitToScreen={fitToScreen}
        onToggleSection={toggleSection}
        onResetLayout={handleResetLayout}
        onBackgroundColorChange={setGraphBackgroundColor}
        onSearch={handleSearch}
        onExportPng={() => exportGraph("png")}
        onExportPdf={() => exportGraph("pdf")}
        classSize={classSize}
        individualSize={individualSize}
        onNodeSizeChange={handleNodeSizeChange}
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
            onResizeNode: resizeNode,
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
