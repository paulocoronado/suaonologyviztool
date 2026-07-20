import type { FunctionComponent } from "react";
import type { IDockviewPanelProps } from "dockview-react";
import { GraphSectionPanel } from "../components/panels/GraphSectionPanel";
import { DetailSectionPanel } from "../components/panels/DetailSectionPanel";
import { ElementDescriptionSectionPanel } from "../components/panels/ElementDescriptionSectionPanel";

export interface PanelDefinition {
  id: string;
  title: string;
  component: FunctionComponent<IDockviewPanelProps>;
}

export const PANEL_REGISTRY: PanelDefinition[] = [
  { id: "grafo", title: "Grafo", component: GraphSectionPanel },
  { id: "detalle", title: "Panel de detalle", component: DetailSectionPanel },
  {
    id: "descripcion",
    title: "Descripción del elemento",
    component: ElementDescriptionSectionPanel,
  },
];
