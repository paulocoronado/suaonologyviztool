import cytoscape, { type Core } from "cytoscape";
import type { IGraphRenderer } from "./graph-renderer.interface";
import type { ILayoutTarget } from "../layout-controller.interface";
import type {
  IExportSource,
  ImageFormat,
} from "../export-controller.interface";
import type { IGraphData } from "../../graph-logic/graph-types";
import { STYLE_CONFIG } from "./style-config";

export class CytoscapeRenderer
  implements IGraphRenderer, ILayoutTarget, IExportSource
{
  private instance: Core;

  constructor(container?: HTMLElement) {
    this.instance = container
      ? cytoscape({ container, style: STYLE_CONFIG })
      : cytoscape({ headless: true, style: STYLE_CONFIG });
  }

  render(data: IGraphData): void {
    this.instance.elements().remove();
    this.instance.add(this.toElements(data));
    this.instance.layout({ name: "cose" }).run();
  }

  updateData(data: IGraphData): void {
    this.render(data);
  }

  centerOn(nodeId: string): void {
    const nodo = this.instance.getElementById(nodeId);
    if (nodo.nonempty())
      this.instance.animate({ center: { eles: nodo } }, { duration: 300 });
  }

  fitToScreen(): void {
    this.instance.fit(undefined, 40);
  }

  onNodeClick(handler: (nodeId: string) => void): void {
    this.instance.on("tap", "node", (event) => handler(event.target.id()));
  }

  applyLayoutName(algorithmName: string): void {
    this.instance.layout({ name: algorithmName }).run();
  }

  toDataUrl(format: ImageFormat): string {
    if (format === "png") return this.instance.png({ full: true });
    throw new Error("Formato SVG pendiente de implementar");
  }

  private toElements(data: IGraphData) {
    const nodos = data.nodes.map((n) => ({
      data: { id: n.id, label: n.label, nodeType: n.nodeType },
    }));
    const aristas = data.edges.map((e) => ({
      data: { id: e.id, source: e.sourceId, target: e.targetId },
    }));
    return [...nodos, ...aristas];
  }
}
