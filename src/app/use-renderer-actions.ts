import type { RefObject } from "react";
import type { CytoscapeRenderer } from "../presentation/renderer/cytoscape-renderer";
import { LayoutController } from "../presentation/layout-controller";
import { ExportController } from "../presentation/export-controller";
import type { LayoutKind } from "../presentation/layout-controller.interface";
import type { EdgeCurveStyle } from "../presentation/renderer/edge-curve-style";
import type { NodeShape } from "../presentation/renderer/node-shape";
import type { LabelPosition } from "../presentation/renderer/label-position";

export function useRendererActions(
  rendererRef: RefObject<CytoscapeRenderer | null>,
) {
  const changeEdgeStyle = (style: EdgeCurveStyle): void => {
    rendererRef.current?.setEdgeCurveStyle(style);
  };

  // y en el objeto que retorna:

  const changeLayout = (kind: LayoutKind): void => {
    if (rendererRef.current)
      new LayoutController(rendererRef.current).applyLayout(kind);
  };

  const changeSpacing = (factor: number): void => {
    if (rendererRef.current)
      new LayoutController(rendererRef.current).setSpacing(factor);
  };

  const fitToScreen = (): void => {
    rendererRef.current?.fitToScreen();
  };

  const focusNode = (nodeId: string): void => {
    rendererRef.current?.centerOn(nodeId);
    rendererRef.current?.selectNode(nodeId);
  };

  const exportGraph = async (format: "png" | "pdf"): Promise<void> => {
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

  const changeNodeShape = (
    kind: "class" | "individual",
    shape: NodeShape,
  ): void => {
    rendererRef.current?.setNodeShape(kind, shape);
  };

  const changeLabelPosition = (position: LabelPosition): void => {
    rendererRef.current?.setLabelPosition(position);
  };

  const changeNodeSize = (kind: "class" | "individual", size: number): void => {
    rendererRef.current?.setNodeSize(kind, size);
  };

  const resizeNode = (nodeId: string, size: number): void => {
    rendererRef.current?.setNodeSizeOverride(nodeId, size);
  };

  const clearNodeResize = (nodeId: string): void => {
    rendererRef.current?.clearNodeSizeOverride(nodeId);
  };

  const clearAllNodeResizes = (): void => {
    rendererRef.current?.clearAllNodeSizeOverrides();
  };

  return {
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
    clearNodeResize,
    clearAllNodeResizes,
  };
}
