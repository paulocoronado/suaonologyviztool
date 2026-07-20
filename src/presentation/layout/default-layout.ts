import type { DockviewApi } from "dockview";
import { PANEL_REGISTRY } from "./panel-registry";

export function buildDefaultLayout(api: DockviewApi): void {
  const [primero, ...resto] = PANEL_REGISTRY;
  const primerPanel = api.addPanel({
    id: primero.id,
    component: primero.id,
    title: primero.title,
  });

  for (const seccion of resto) {
    api.addPanel({
      id: seccion.id,
      component: seccion.id,
      title: seccion.title,
      position: { referencePanel: primerPanel, direction: "right" },
    });
  }
}
