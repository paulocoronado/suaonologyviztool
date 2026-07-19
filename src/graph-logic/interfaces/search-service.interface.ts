import type { IGraphNode } from "../graph-types";

export interface ISearchService {
  findByName(query: string): IGraphNode | null;
}
