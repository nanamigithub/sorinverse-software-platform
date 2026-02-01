import { useLocation, useNavigate } from "react-router-dom";

export default function TopNav() {
  const nav = useNavigate();
  const { pathname } = useLocation();

  const isArch = pathname === "/";
  const isPipe = pathname.startsWith("/pipeline");
  const isSys = pathname.startsWith("/systems");

  return (
    <div className="topTabs">
      <button className={`topTab ${isArch ? "active" : ""}`} onClick={() => nav("/")}>
        Architecture
      </button>
      <button className={`topTab ${isPipe ? "active" : ""}`} onClick={() => nav("/pipeline")}>
        Pipeline
      </button>
      <button className={`topTab ${isSys ? "active" : ""}`} onClick={() => nav("/systems")}>
        Systems
      </button>
    </div>
  );
}
