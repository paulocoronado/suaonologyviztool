import { useEffect, useRef } from "react";
import { CytoscapeRenderer } from "../renderer/cytoscape-renderer";
import type { IGraphData } from "../../graph-logic/graph-types";

interface GraphCanvasProps {
  data: IGraphData;
  backgroundColor?: string;
  onRendererReady?: (renderer: CytoscapeRenderer) => void;
  onSelectionChange?: (selection: {
    nodeIds: string[];
    edgeIds: string[];
  }) => void;
  onNodeDoubleClick?: (nodeId: string) => void;
}
export function GraphCanvas({
  data,
  backgroundColor,
  onRendererReady,
  onSelectionChange,
  onNodeDoubleClick,
}: GraphCanvasProps) {
  const contenedorRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<CytoscapeRenderer | null>(null);
  const onSelectionChangeRef = useRef(onSelectionChange);
  const onNodeDoubleClickRef = useRef(onNodeDoubleClick);
  // eslint-disable-next-line react-hooks/refs
  onSelectionChangeRef.current = onSelectionChange;
  // eslint-disable-next-line react-hooks/refs
  onNodeDoubleClickRef.current = onNodeDoubleClick;

  useEffect(() => {
    if (!contenedorRef.current || rendererRef.current) return;
    const renderer = new CytoscapeRenderer(contenedorRef.current);
    rendererRef.current = renderer;
    onRendererReady?.(renderer);
    renderer.onSelectionChange((ids) => onSelectionChangeRef.current?.(ids));
    renderer.onNodeDoubleClick((id) => onNodeDoubleClickRef.current?.(id));
  }, [onRendererReady]);

  useEffect(() => {
    rendererRef.current?.render(data);
  }, [data]);

  return (
    <div
      ref={contenedorRef}
      className="h-full w-full"
      style={{ backgroundColor: backgroundColor ?? "#f9fafb" }}
    />
  );
}
