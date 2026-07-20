import type { IGraphData, NodeVisibilityMode } from "../graph-types";

export interface IFilterService {
  filterByVisibility(mode: NodeVisibilityMode): IGraphData;
  filterByBranch(classId: string): IGraphData;
}
