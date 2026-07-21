import cytoscape, { type Core } from "cytoscape";
import type { IGraphRenderer } from "./graph-renderer.interface";
import type { ILayoutTarget } from "../layout-controller.interface";
import type {
  IExportSource,
  ImageFormat,
} from "../export-controller.interface";
import { STYLE_CONFIG } from "./style-config";
import { resolveOverlaps } from "./overlap-resolver";
import { EdgeCurveStyle } from "./edge-curve-style";
import { NodeType, type IGraphData } from "../../graph-logic/graph-types";
import { NodeShape } from "./node-shape";
import { LabelPosition, resolveLabelAlignment } from "./label-position";

export class CytoscapeRenderer
  implements IGraphRenderer, ILayoutTarget, IExportSource
{
  private instance: Core;
  private currentLayoutName = "cose";
  private spacingFactor = 1;
  private baseNodeSize = 30;
  private edgeCurveStyle: EdgeCurveStyle = EdgeCurveStyle.BEZIER;
  private classShape: NodeShape = NodeShape.ROUND_RECTANGLE;
  private individualShape: NodeShape = NodeShape.ELLIPSE;
  private labelPosition: LabelPosition = LabelPosition.CENTER;
  private classNodeSize = 30;
  private individualNodeSize = 24;
  private nodeSizeOverrides = new Map<string, number>();
  private labelFontSize = 12;
  private labelFontColor = "#111827";

  constructor(container?: HTMLElement) {
    this.instance = container
      ? cytoscape({ container, style: STYLE_CONFIG })
      : cytoscape({ headless: true, style: STYLE_CONFIG });
  }

  render(data: IGraphData): void {
    this.instance.elements().remove();
    this.instance.add(this.toElements(data));
    this.applyEdgeCurveStyle();
    this.applyNodeAppearance();
    this.runLayout(true);
  }

  setLabelFontSize(size: number): void {
    this.labelFontSize = size;
    this.applyNodeAppearance();
  }

  setLabelFontColor(color: string): void {
    this.labelFontColor = color;
    this.applyNodeAppearance();
  }

  setEdgeCurveStyle(style: EdgeCurveStyle): void {
    this.edgeCurveStyle = style;
    this.applyEdgeCurveStyle();
  }

  private applyEdgeCurveStyle(): void {
    const aristas = this.instance.edges();
    if (this.edgeCurveStyle === EdgeCurveStyle.BEZIER) {
      aristas.style({
        "curve-style": "unbundled-bezier",
        "control-point-distances": [40],
        "control-point-weights": [0.5],
      });
    } else {
      aristas.style({ "curve-style": this.edgeCurveStyle });
    }
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
    const boundingBox = this.getContainerBoundingBox();
    const opciones =
      this.currentLayoutName === "cose"
        ? {
            name: "cose",
            fit: false,
            boundingBox,
            nodeDimensionsIncludeLabels: true,
            idealEdgeLength: this.baseNodeSize * 2 * this.spacingFactor,
            nodeRepulsion: 4096 * this.spacingFactor * this.spacingFactor,
          }
        : {
            name: this.currentLayoutName,
            fit: false,
            boundingBox,
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

  setNodeShape(kind: "class" | "individual", shape: NodeShape): void {
    if (kind === "class") this.classShape = shape;
    else this.individualShape = shape;
    this.applyNodeAppearance();
  }

  setLabelPosition(position: LabelPosition): void {
    this.labelPosition = position;
    this.applyNodeAppearance();
  }

  private applyNodeAppearance(): void {
    const alineacion = resolveLabelAlignment(this.labelPosition);
    this.instance.nodes(`[nodeType = "${NodeType.CLASS}"]`).style({
      shape: this.classShape,
      width: this.classNodeSize,
      height: this.classNodeSize,
    });
    this.instance.nodes(`[nodeType = "${NodeType.INDIVIDUAL}"]`).style({
      shape: this.individualShape,
      width: this.individualNodeSize,
      height: this.individualNodeSize,
    });
    this.instance.nodes().style({
      "text-halign": alineacion.halign,
      "text-valign": alineacion.valign,
      "font-size": this.labelFontSize,
      color: this.labelFontColor,
    });
    this.applyNodeSizeOverrides();
  }

  setNodeSize(kind: "class" | "individual", size: number): void {
    if (kind === "class") this.classNodeSize = size;
    else this.individualNodeSize = size;
    this.applyNodeAppearance();
    resolveOverlaps(
      this.instance,
      this.baseNodeSize * this.spacingFactor * 0.5,
    );
  }

  setNodeSizeOverride(nodeId: string, size: number): void {
    this.nodeSizeOverrides.set(nodeId, size);
    this.applyNodeAppearance();
    resolveOverlaps(
      this.instance,
      this.baseNodeSize * this.spacingFactor * 0.5,
    );
  }

  clearNodeSizeOverride(nodeId: string): void {
    this.nodeSizeOverrides.delete(nodeId);
    this.applyNodeAppearance();
  }

  clearAllNodeSizeOverrides(): void {
    this.nodeSizeOverrides.clear();
    this.applyNodeAppearance();
  }

  private applyNodeSizeOverrides(): void {
    for (const [nodeId, size] of this.nodeSizeOverrides.entries()) {
      const nodo = this.instance.getElementById(nodeId);
      if (nodo.nonempty()) nodo.style({ width: size, height: size });
    }
  }
}
