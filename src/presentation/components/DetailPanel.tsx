import type { DetailView } from "../detail-panel-controller";

interface DetailPanelProps {
  views: DetailView[];
}

export function DetailPanel({ views }: DetailPanelProps) {
  if (views.length === 0) return null;
  return (
    <div className="mt-4 flex flex-col gap-3">
      {views.map((view) => (
        <aside
          key={view.id}
          className="rounded-lg border border-gray-200 bg-white p-4"
        >
          <h2 className="text-lg font-semibold text-gray-900">{view.label}</h2>
          {view.tiposMostrados.length > 0 && (
            <p className="mt-1 text-sm text-gray-600">
              Tipos: {view.tiposMostrados.join(", ")}
            </p>
          )}
          {view.datos.length > 0 && (
            <dl className="mt-3 space-y-1">
              {view.datos.map((entrada) => (
                <div key={entrada.propiedad} className="text-sm">
                  <dt className="inline font-medium text-gray-700">
                    {entrada.propiedad}:{" "}
                  </dt>
                  <dd className="inline text-gray-600">{entrada.valor}</dd>
                </div>
              ))}
            </dl>
          )}
          <p className="mt-2 text-xs text-gray-400">Id: {view.id}</p>
        </aside>
      ))}
    </div>
  );
}
