import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import engines from "../data/engines.v1_0";

export default function Systems() {
  const nav = useNavigate();

  const tabs = useMemo(() => ["All", ...engines.map((e) => e.id)], []);
  const [active, setActive] = useState("All");

  return (
    <div className="systems-page">
      <div className="pageTitleRow">
        <div>
          <div className="pageTitle">Systems</div>
          <div className="pageSub">Open engine systems and engine apps.</div>
        </div>
      </div>

      <div className="tabsRow">
        {tabs.map((t) => (
          <button
            key={t}
            className={`tab ${active === t ? "tab--active" : ""}`}
            onClick={() => {
              setActive(t);
              if (t !== "All") nav(`/systems/${t}`);
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {/* All = 引擎网格（跟你 Architecture All 的“感觉”一致） */}
      {active === "All" && (
        <div className="engineGrid">
          {engines.map((e) => (
            <div
              key={e.id}
              className="engineCard"
              role="button"
              tabIndex={0}
              onClick={() => nav(`/systems/${e.id}`)}
            >
              <div className="engineBadge">{e.id}</div>
              <div className="engineName">{e.key}</div>
              <div className="engineDesc">{e.desc}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
