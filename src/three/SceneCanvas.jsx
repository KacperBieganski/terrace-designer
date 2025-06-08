import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import TerraceModel from "./TerraceModel";

function ControlsWithReset({ controlsRef }) {
  return <OrbitControls ref={controlsRef} />;
}

export default function SceneCanvas() {
  const controlsRef = useRef();

  const resetView = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  return (
    <div className="scene-canvas" style={{ position: "relative" }}>
      <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <TerraceModel />
        <ControlsWithReset controlsRef={controlsRef} />
      </Canvas>

      <button className="reset-view-button" onClick={resetView}>
        Resetuj widok
      </button>
    </div>
  );
}
