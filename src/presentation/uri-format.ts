export function shortenUri(uri: string): string {
  const partes = uri.split(/[#/]/);
  return partes[partes.length - 1] || uri;
}
