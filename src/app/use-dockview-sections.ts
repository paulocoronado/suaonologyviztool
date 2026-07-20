import { useRef, useState } from "react";
import type { DockviewApi, DockviewReadyEvent } from "dockview";
import { PANEL_REGISTRY } from "../presentation/layout/panel-registry";
import { buildDefaultLayout } from "../presentation/layout/default-layout";

export function useDockviewSections() {
  const apiRef = useRef<DockviewApi | null>(null);
  const defaultLayoutRef = useRef<unknown>(null);
  const [visiblePanelIds, setVisiblePanelIds] = useState<string[]>([]);

  const handleReady = (event: DockviewReadyEvent) => {
    apiRef.current = event.api;
    buildDefaultLayout(event.api);
    defaultLayoutRef.current = event.api.toJSON();
    setVisiblePanelIds(event.api.panels.map((p) => p.id));
    event.api.onDidLayoutChange(() => {
      setVisiblePanelIds(event.api.panels.map((p) => p.id));
    });
  };

  const toggleSection = (id: string, visible: boolean): void => {
    const api = apiRef.current;
    if (!api) return;
    if (visible) {
      const definicion = PANEL_REGISTRY.find((p) => p.id === id);
      if (definicion && !api.getPanel(id)) {
        api.addPanel({
          id: definicion.id,
          component: definicion.id,
          title: definicion.title,
        });
      }
    } else {
      const panel = api.getPanel(id);
      if (panel) api.removePanel(panel);
    }
  };

  const resetLayout = (): void => {
    const api = apiRef.current;
    if (api && defaultLayoutRef.current) {
      api.fromJSON(
        defaultLayoutRef.current as Parameters<DockviewApi["fromJSON"]>[0],
      );
    }
  };

  return { handleReady, visiblePanelIds, toggleSection, resetLayout };
}
