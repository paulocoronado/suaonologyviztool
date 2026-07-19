import type { IGraphData } from "../graph-types";

export interface IFilterService {
  toggleIndividualsVisibility(visible: boolean): IGraphData;
  filterByBranch(classId: string): IGraphData;
}
