import type { FunctionComponent } from "react";
import {
  DockviewReact,
  type DockviewReadyEvent,
  type IDockviewPanelProps,
} from "dockview-react";
import "dockview-react/dist/styles/dockview.css";
import { PANEL_REGISTRY } from "./panel-registry";

const COMPONENTS: Record<
  string,
  FunctionComponent<IDockviewPanelProps>
> = Object.fromEntries(PANEL_REGISTRY.map((p) => [p.id, p.component]));

interface DockviewLayoutProps {
  onReady: (event: DockviewReadyEvent) => void;
}

export function DockviewLayout({ onReady }: DockviewLayoutProps) {
  return (
    <div className="dockview-theme-light min-h-0 flex-1">
      <DockviewReact components={COMPONENTS} onReady={onReady} />
    </div>
  );
}
