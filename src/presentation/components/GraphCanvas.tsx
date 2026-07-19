import { useEffect, useRef } from "react";
import { CytoscapeRenderer } from "../renderer/cytoscape-renderer";
import type { IGraphData } from "../../graph-logic/graph-types";

interface GraphCanvasProps {
  data: IGraphData;
  onRendererReady?: (renderer: CytoscapeRenderer) => void;
  onNodeClick?: (nodeId: string) => void;
}

export function GraphCanvas({
  data,
  onRendererReady,
  onNodeClick,
}: GraphCanvasProps) {
  const contenedorRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<CytoscapeRenderer | null>(null);

  useEffect(() => {
    if (contenedorRef.current && !rendererRef.current) {
      rendererRef.current = new CytoscapeRenderer(contenedorRef.current);
      onRendererReady?.(rendererRef.current);
      if (onNodeClick) rendererRef.current.onNodeClick(onNodeClick);
    }
    rendererRef.current?.render(data);
  }, [data, onRendererReady, onNodeClick]);

  return (
    <div
      ref={contenedorRef}
      className="h-[600px] w-full rounded-lg border border-gray-200"
    />
  );
}
