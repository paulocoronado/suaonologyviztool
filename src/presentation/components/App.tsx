import { useRef, useState } from "react";
import { useAppController } from "../../app/use-app-controller";
import { useGraphInteractions } from "../../app/use-graph-interactions";
import { FileUploader } from "./FileUploader";
import { GraphCanvas } from "./GraphCanvas";
import { Toolbar } from "./Toolbar";
import { DetailPanel } from "./DetailPanel";
import type { CytoscapeRenderer } from "../renderer/cytoscape-renderer";
import { LayoutController } from "../layout-controller";
import { ExportController } from "../export-controller";
import {
  DetailPanelController,
  type DetailView,
} from "../detail-panel-controller";
import { NodeType } from "../../graph-logic/graph-types";
import type { LayoutKind } from "../layout-controller.interface";
import styles from "./App.module.css";

const detailPanelController = new DetailPanelController();

export function App() {
  const { graphData, error, loadFile, findEntity } = useAppController();
  const { displayedData, toggleIndividuals, toggleCollapse, search } =
    useGraphInteractions(graphData);
  const rendererRef = useRef<CytoscapeRenderer | null>(null);
  const [detailView, setDetailView] = useState<DetailView | null>(null);

  const showDetailFor = (nodeId: string) => {
    const entidad = findEntity(nodeId);
    if (entidad) setDetailView(detailPanelController.showDetails(entidad));
  };

  const handleNodeClick = (nodeId: string) => {
    const nodo = displayedData?.nodes.find((n) => n.id === nodeId);
    if (!nodo) return;
    if (nodo.nodeType === NodeType.CLASS) toggleCollapse(nodeId);
    else showDetailFor(nodeId);
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
    <div className={styles.container}>
      <h1>Visualizador de ontologías</h1>
      <FileUploader onFileSelected={loadFile} />
      {error && <p className={styles.error}>{error}</p>}
      {displayedData && (
        <>
          <Toolbar
            onToggleIndividuals={toggleIndividuals}
            onSearch={handleSearch}
            onLayoutChange={handleLayoutChange}
            onExportPng={() => handleExport("png")}
            onExportPdf={() => handleExport("pdf")}
          />
          <GraphCanvas
            data={displayedData}
            onRendererReady={(r) => (rendererRef.current = r)}
            onNodeClick={handleNodeClick}
          />
          <DetailPanel view={detailView} />
        </>
      )}
    </div>
  );
}
