import jsPDF from "jspdf";
import type {
  IExportController,
  IExportSource,
  ImageFormat,
} from "./export-controller.interface";

export class ExportController implements IExportController {
  private source: IExportSource;

  constructor(source: IExportSource) {
    this.source = source;
  }

  async exportAsImage(format: ImageFormat): Promise<Blob> {
    const dataUrl = this.source.toDataUrl(format);
    return this.dataUrlToBlob(dataUrl);
  }

  async exportAsPdf(): Promise<Blob> {
    const dataUrl = this.source.toDataUrl("png");
    const pdf = new jsPDF();
    pdf.addImage(dataUrl, "PNG", 10, 10, 190, 0);
    return pdf.output("blob");
  }

  private dataUrlToBlob(dataUrl: string): Blob {
    const [meta, base64] = dataUrl.split(",");
    const mime =
      meta.match(/data:(.*?);base64/)?.[1] ?? "application/octet-stream";
    const binario = atob(base64);
    const bytes = new Uint8Array(binario.length);
    for (let i = 0; i < binario.length; i++) bytes[i] = binario.charCodeAt(i);
    return new Blob([bytes], { type: mime });
  }
}
