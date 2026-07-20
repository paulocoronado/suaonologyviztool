import type { ElementDescription } from "../element-description-controller";

interface ElementDescriptionPanelProps {
  descriptions: ElementDescription[];
}

export function ElementDescriptionPanel({
  descriptions,
}: ElementDescriptionPanelProps) {
  if (descriptions.length === 0) {
    return (
      <p className="text-sm text-gray-400">
        Selecciona un nodo o una relación para ver su descripción.
      </p>
    );
  }
  return (
    <div className="flex flex-col gap-4">
      {descriptions.map((desc) => (
        <article
          key={desc.id}
          className="rounded-lg border border-gray-200 bg-white p-4"
        >
          <h2 className="text-lg font-semibold text-gray-900">{desc.label}</h2>
          <p className="mt-1 text-sm text-gray-600">{desc.tipoElemento}</p>
          {desc.anotaciones.length > 0 && (
            <>
              <h3 className="mt-3 text-xs font-medium uppercase text-gray-500">
                Anotaciones
              </h3>
              <dl className="space-y-1">
                {desc.anotaciones.map((a) => (
                  <div key={a.propiedad} className="text-sm">
                    <dt className="inline font-medium text-gray-700">
                      {a.propiedad}:{" "}
                    </dt>
                    <dd className="inline text-gray-600">{a.valor}</dd>
                  </div>
                ))}
              </dl>
            </>
          )}

          {desc.propiedadesDatos.length > 0 && (
            <>
              <h3 className="mt-3 text-xs font-medium uppercase text-gray-500">
                Propiedades de datos
              </h3>
              <dl className="space-y-1">
                {desc.propiedadesDatos.map((p) => (
                  <div key={p.propiedad} className="text-sm">
                    <dt className="inline font-medium text-gray-700">
                      {p.propiedad}:{" "}
                    </dt>
                    <dd className="inline text-gray-600">{p.valor}</dd>
                  </div>
                ))}
              </dl>
            </>
          )}

          {desc.propiedadesObjeto.length > 0 && (
            <>
              <h3 className="mt-3 text-xs font-medium uppercase text-gray-500">
                Propiedades de objeto
              </h3>
              <ul className="space-y-1 text-sm text-gray-600">
                {desc.propiedadesObjeto.map((rel) => (
                  <li key={`${rel.predicado}-${rel.destinoId}`}>
                    {rel.predicado} → {rel.destinoLabel}
                  </li>
                ))}
              </ul>
            </>
          )}
        </article>
      ))}
    </div>
  );
}
