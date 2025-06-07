import { useState } from "react";
import SceneCanvas from "./three/SceneCanvas";
import ControlsPanel from "./components/ControlsPanel";
import TabButtons from "./components/TabButtons";
import "./App.css";

export default function App() {
  const [activeTab, setActiveTab] = useState("wymiary");

  return (
    <div className="app-wrapper">
      <div className="navigation">
        <TabButtons activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      <div className="app-container">
        <ControlsPanel activeTab={activeTab} />
        <SceneCanvas />
      </div>
    </div>
  );
}
