import { useMemo } from "react";
import { useParams } from "react-router-dom";
import engines from "../data/engines.v1_0";
import appsByEngine from "../data/apps.v1_0";

export default function EngineHub() {
  const { engineId } = useParams(); // 例如 "1.1"
  const engine = useMemo(() => engines.find((e) => e.id === engineId), [engineId]);
  const apps = appsByEngine[engineId] || [];

  if (!engine) return <div className="emptyState">Engine not found: {engineId}</div>;

  return (
    <div>
      <div className="pageTitleRow">
        <div>
          <div className="pageTitle">{engine.id} · {engine.key}</div>
          <div className="pageSub">{engine.desc}</div>
        </div>
      </div>

      {apps.length === 0 ? (
        <div className="emptyState">
          No apps yet for this engine. Add items in <code>src/data/apps.v1_0.js</code>
        </div>
      ) : (
        <div className="appsGrid">
          {apps.map((app) => (
            <div key={app.key} className="appCard">
              <div className="appTitle">{app.title}</div>
              <div className="appDesc">{app.desc}</div>
              <div className="appMeta">{app.status || "draft"}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
