import type { ISearchService } from "./interfaces/search-service.interface";
import type { IGraphData, IGraphNode } from "./graph-types";

export class SearchService implements ISearchService {
  private data: IGraphData;

  constructor(data: IGraphData) {
    this.data = data;
  }

  findByName(query: string): IGraphNode | null {
    const coincidencia = this.data.nodes.find(
      (n) => n.label.toLowerCase() === query.toLowerCase(),
    );
    return coincidencia ?? null;
  }
}
