import cytoscape, { type Core } from "cytoscape";
import type { IGraphRenderer } from "./graph-renderer.interface";
import type { ILayoutTarget } from "../layout-controller.interface";
import type {
  IExportSource,
  ImageFormat,
} from "../export-controller.interface";
import type { IGraphData } from "../../graph-logic/graph-types";
import { STYLE_CONFIG } from "./style-config";
import { resolveOverlaps } from "./overlap-resolver";

export class CytoscapeRenderer
  implements IGraphRenderer, ILayoutTarget, IExportSource
{
  private instance: Core;
  private currentLayoutName = "cose";
  private spacingFactor = 1;
  private baseNodeSize = 30;

  constructor(container?: HTMLElement) {
    this.instance = container
      ? cytoscape({ container, style: STYLE_CONFIG })
      : cytoscape({ headless: true, style: STYLE_CONFIG });
  }

  render(data: IGraphData): void {
    this.instance.elements().remove();
    this.instance.add(this.toElements(data));
    this.runLayout(true);
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

  selectNode(nodeId: string): void {
    this.instance.nodes().unselect();
    const nodo = this.instance.getElementById(nodeId);
    if (nodo.nonempty()) nodo.select();
  }

  onSelectionChange(
    handler: (selection: { nodeIds: string[]; edgeIds: string[] }) => void,
  ): void {
    this.instance.on("select unselect", () => {
      handler({
        nodeIds: this.instance.nodes(":selected").map((n) => n.id()),
        edgeIds: this.instance.edges(":selected").map((e) => e.id()),
      });
    });
  }

  onNodeDoubleClick(handler: (nodeId: string) => void): void {
    this.instance.on("dbltap", "node", (event) => handler(event.target.id()));
  }

  applyLayoutName(algorithmName: string): void {
    this.currentLayoutName = algorithmName;
    this.runLayout(false);
  }

  setSpacingFactor(spacingFactor: number): void {
    this.spacingFactor = spacingFactor;
    this.runLayout(false);
  }

  toDataUrl(format: ImageFormat): string {
    if (format === "png") return this.instance.png({ full: true });
    throw new Error("Formato SVG pendiente de implementar");
  }

  private runLayout(shouldFitWhenDone: boolean): void {
    const opciones =
      this.currentLayoutName === "cose"
        ? {
            name: "cose",
            fit: false,
            boundingBox: this.getContainerBoundingBox(),
            nodeDimensionsIncludeLabels: true,
            idealEdgeLength: this.baseNodeSize * 2 * this.spacingFactor,
            nodeRepulsion: 4096 * this.spacingFactor * this.spacingFactor,
          }
        : {
            name: this.currentLayoutName,
            fit: false,
            spacingFactor: this.spacingFactor,
          };

    const layout = this.instance.layout(opciones as cytoscape.LayoutOptions);
    layout.one("layoutstop", () => {
      resolveOverlaps(
        this.instance,
        this.baseNodeSize * this.spacingFactor * 0.5,
      );
      if (shouldFitWhenDone) this.fitToScreen();
    });
    layout.run();
  }

  private getContainerBoundingBox() {
    const contenedor = this.instance.container();
    if (!contenedor) return undefined;
    return {
      x1: 0,
      y1: 0,
      w: contenedor.clientWidth,
      h: contenedor.clientHeight,
    };
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
