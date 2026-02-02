import { useNavigate } from "react-router-dom";
import { PipelineView } from "./Architecture.jsx";

export default function Pipeline() {
  const navigate = useNavigate();

  return (
    <div className="pipeline-page">
      <PipelineView onEngine={() => navigate("/")} />
    </div>
  );
}
