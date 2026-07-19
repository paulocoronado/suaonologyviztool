import type { DetailView } from "../detail-panel-controller";

interface DetailPanelProps {
  view: DetailView | null;
}

export function DetailPanel({ view }: DetailPanelProps) {
  if (!view) return null;
  return (
    <aside>
      <h2>{view.label}</h2>
      {view.tiposMostrados.length > 0 && (
        <p>Tipos: {view.tiposMostrados.join(", ")}</p>
      )}
      <p>Id: {view.id}</p>
    </aside>
  );
}
