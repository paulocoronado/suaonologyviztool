export type ImageFormat = "png" | "svg";

export interface IExportSource {
  toDataUrl(format: ImageFormat): string;
}

export interface IExportController {
  exportAsImage(format: ImageFormat): Promise<Blob>;
  exportAsPdf(): Promise<Blob>;
}
