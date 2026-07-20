import type { Core, NodeSingular } from "cytoscape";

export function resolveOverlaps(instance: Core, margin: number): void {
  const nodos = instance.nodes();
  const maxIteraciones = 30;

  for (let intento = 0; intento < maxIteraciones; intento++) {
    let huboColision = false;

    nodos.forEach((nodoA, indiceA) => {
      const cajaA = nodoA.boundingBox();
      nodos.forEach((nodoB, indiceB) => {
        if (indiceB <= indiceA) return;
        const cajaB = nodoB.boundingBox();
        const seSuperponen =
          cajaA.x1 - margin < cajaB.x2 &&
          cajaA.x2 + margin > cajaB.x1 &&
          cajaA.y1 - margin < cajaB.y2 &&
          cajaA.y2 + margin > cajaB.y1;

        if (seSuperponen) {
          huboColision = true;
          separateNodes(nodoA, nodoB, margin);
        }
      });
    });

    if (!huboColision) break;
  }
}

function separateNodes(
  nodoA: NodeSingular,
  nodoB: NodeSingular,
  margin: number,
): void {
  const posicionA = nodoA.position();
  const posicionB = nodoB.position();
  const distanciaX = posicionB.x - posicionA.x;
  const distanciaY = posicionB.y - posicionA.y;
  const distancia = Math.hypot(distanciaX, distanciaY) || 1;
  const empujeX = (distanciaX / distancia) * margin;
  const empujeY = (distanciaY / distancia) * margin;

  nodoA.position({ x: posicionA.x - empujeX, y: posicionA.y - empujeY });
  nodoB.position({ x: posicionB.x + empujeX, y: posicionB.y + empujeY });
}
