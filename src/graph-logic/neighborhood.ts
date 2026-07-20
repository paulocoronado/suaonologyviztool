import type { IGraphData, IGraphEdge } from "./graph-types";

export function buildNeighborhood(
  data: IGraphData,
  focalId: string,
): IGraphData {
  const aristasRelacionadas = data.edges.filter(
    (e) => e.sourceId === focalId || e.targetId === focalId,
  );
  const idsVecinos = new Set<string>([focalId]);
  for (const arista of aristasRelacionadas) {
    idsVecinos.add(arista.sourceId);
    idsVecinos.add(arista.targetId);
  }
  const nodes = data.nodes.filter((n) => idsVecinos.has(n.id));
  return { nodes, edges: aristasRelacionadas };
}

export function buildNeighborhoodForEdge(
  data: IGraphData,
  edgeId: string,
): IGraphData {
  const arista = data.edges.find((e: IGraphEdge) => e.id === edgeId);
  if (!arista) return { nodes: [], edges: [] };
  const nodes = data.nodes.filter(
    (n) => n.id === arista.sourceId || n.id === arista.targetId,
  );
  return { nodes, edges: [arista] };
}
