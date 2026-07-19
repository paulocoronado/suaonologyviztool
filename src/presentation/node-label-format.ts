import { shortenUri } from "./uri-format";
import type { IGraphNode } from "../graph-logic/graph-types";

export const NodeLabelFormat = {
  RDFS_LABEL: "RDFS_LABEL",
  LOCAL_NAME: "LOCAL_NAME",
  FULL_URI: "FULL_URI",
} as const;

export type NodeLabelFormat =
  (typeof NodeLabelFormat)[keyof typeof NodeLabelFormat];

export function resolveNodeLabel(
  node: IGraphNode,
  format: NodeLabelFormat,
): string {
  if (format === NodeLabelFormat.RDFS_LABEL)
    return node.rdfsLabel ?? shortenUri(node.id);
  if (format === NodeLabelFormat.LOCAL_NAME) return shortenUri(node.id);
  return node.id;
}
