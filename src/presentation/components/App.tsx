import { useMemo, useRef, useState } from "react";
import { useAppController } from "../../app/use-app-controller";
import { useGraphInteractions } from "../../app/use-graph-interactions";
import { NavBar } from "./NavBar";
import { GraphCanvas } from "./GraphCanvas";
import { DetailPanel } from "./DetailPanel";
import type { CytoscapeRenderer } from "../renderer/cytoscape-renderer";
import { LayoutController } from "../layout-controller";
import { ExportController } from "../export-controller";
import {
  DetailPanelController,
  type DetailView,
} from "../detail-panel-controller";
import { NodeLabelFormat, resolveNodeLabel } from "../node-label-format";
import { NodeType } from "../../graph-logic/graph-types";
import type { LayoutKind } from "../layout-controller.interface";

const detailPanelController = new DetailPanelController();

export function App() {
  const { graphData, fileName, error, loadFile, findEntity } =
    useAppController();
  const { displayedData, toggleIndividuals, toggleCollapse, search } =
    useGraphInteractions(graphData);
  const rendererRef = useRef<CytoscapeRenderer | null>(null);
  const [detailView, setDetailView] = useState<DetailView | null>(null);
  const [labelFormat, setLabelFormat] = useState<NodeLabelFormat>(
    NodeLabelFormat.RDFS_LABEL,
  );

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

  const showDetailFor = (nodeId: string) => {
    const entidad = findEntity(nodeId);
    if (entidad) setDetailView(detailPanelController.showDetails(entidad));
  };

  const handleNodeClick = (nodeId: string) => {
    const nodo = displayedData?.nodes.find((n) => n.id === nodeId);
    if (!nodo) return;
    showDetailFor(nodeId);
    if (nodo.nodeType === NodeType.CLASS) toggleCollapse(nodeId);
  };

  const handleSearch = (query: string) => {
    const nodo = search(query);
    if (!nodo) return;
    rendererRef.current?.centerOn(nodo.id);
    showDetailFor(nodo.id);
  };

  const handleLayoutChange = (kind: LayoutKind) => {
    if (rendererRef.current)
      new LayoutController(rendererRef.current).applyLayout(kind);
  };

  const handleExport = async (format: "png" | "pdf") => {
    if (!rendererRef.current) return;
    const exportador = new ExportController(rendererRef.current);
    const blob =
      format === "png"
        ? await exportador.exportAsImage("png")
        : await exportador.exportAsPdf();
    const url = URL.createObjectURL(blob);
    const enlace = document.createElement("a");
    enlace.href = url;
    enlace.download = `ontologia.${format}`;
    enlace.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <NavBar
        fileName={fileName}
        hasData={!!dataParaRenderizar}
        labelFormat={labelFormat}
        onFileSelected={loadFile}
        onToggleIndividuals={toggleIndividuals}
        onLayoutChange={handleLayoutChange}
        onLabelFormatChange={setLabelFormat}
        onSearch={handleSearch}
        onExportPng={() => handleExport("png")}
        onExportPdf={() => handleExport("pdf")}
      />
      <main className="p-6">
        {error && <p className="mt-2 text-red-600">{error}</p>}
        {dataParaRenderizar && (
          <>
            <GraphCanvas
              data={dataParaRenderizar}
              onRendererReady={(r) => (rendererRef.current = r)}
              onNodeClick={handleNodeClick}
            />
            <DetailPanel view={detailView} />
          </>
        )}
      </main>
    </div>
  );
}
