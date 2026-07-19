import type { IGraphData } from "../graph-types";

export interface ICollapseManager {
  collapse(classId: string): IGraphData;
  expand(classId: string): IGraphData;
  isCollapsed(classId: string): boolean;
}
