import type { RefObject } from "react";
import type { CytoscapeRenderer } from "../presentation/renderer/cytoscape-renderer";
import { LayoutController } from "../presentation/layout-controller";
import { ExportController } from "../presentation/export-controller";
import type { LayoutKind } from "../presentation/layout-controller.interface";

export function useRendererActions(
  rendererRef: RefObject<CytoscapeRenderer | null>,
) {
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

  return { changeLayout, changeSpacing, fitToScreen, focusNode, exportGraph };
}
