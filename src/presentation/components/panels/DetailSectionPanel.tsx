import { useGraphAppContext } from "../../layout/graph-app-context";
import { DetailPanel } from "../DetailPanel";

export function DetailSectionPanel() {
  const { detailViews } = useGraphAppContext();
  return (
    <div className="h-full overflow-auto p-3">
      <DetailPanel views={detailViews} />
    </div>
  );
}
