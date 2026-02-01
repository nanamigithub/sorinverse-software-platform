import { Routes, Route, Navigate } from "react-router-dom";
import TopNav from "../components/TopNav.jsx";

import Architecture from "../pages/Architecture.jsx";
import Pipeline from "../pages/Pipeline.jsx";
import Systems from "../pages/Systems.jsx";
import EngineHub from "../pages/EngineHub.jsx";

export default function AppShell() {
  return (
    <div className="appShell">
      <header className="appHeader">
        <div className="brand">
          <div className="brandBadge">S</div>
          <div className="brandText">
            <div className="brandTitle">SORINVERSE</div>
            <div className="brandSub">PLATFORM V1.0 · OUTPUT-CENTRIC ARCHITECTURE</div>
          </div>
        </div>

        <TopNav />
      </header>

      <main className="appMain">
        <Routes>
          <Route path="/" element={<Architecture />} />
          <Route path="/pipeline" element={<Pipeline />} />
          <Route path="/systems" element={<Systems />} />
          <Route path="/systems/:engineId" element={<EngineHub />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}
