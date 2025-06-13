import { Canvas } from "@react-three/fiber";
import { useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import TerraceModel from "./TerraceModel";
import Environment from "../components/Environment";
import { useTerraceStore } from "../store/useTerraceStore";
import { useEffect } from "react";
import { useThree } from "@react-three/fiber";

function ControlsWithReset({ controlsRef }) {
  const max = 20;

  useFrame(() => {
    if (controlsRef.current) {
      const target = controlsRef.current.target;

      target.x = Math.max(-max, Math.min(max, target.x));
      target.y = Math.max(-max, Math.min(max, target.y));
      target.z = Math.max(-max, Math.min(max, target.z));
      controlsRef.current.update();
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      maxPolarAngle={Math.PI / 2}
      minDistance={5}
      maxDistance={30}
    />
  );
}

function ResizeUpdater() {
  const { gl, camera, size } = useThree();

  useEffect(() => {
    const handleResize = () => {
      const canvasParent = gl.domElement.parentElement;

      if (canvasParent) {
        const width = canvasParent.clientWidth;
        const height = canvasParent.clientHeight;

        gl.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [gl, camera]);

  return null;
}

export default function SceneCanvas() {
  const controlsRef = useRef();
  const { showEnvironment } = useTerraceStore();

  const resetView = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  return (
    <div className="scene-canvas">
      <Canvas shadows camera={{ position: [10, 10, 10], fov: 50 }}>
        <ResizeUpdater />
        <ambientLight intensity={0.6} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        {showEnvironment && <Environment />}
        <TerraceModel />
        <ControlsWithReset controlsRef={controlsRef} />
      </Canvas>

      <button className="reset-view-button" onClick={resetView}>
        Resetuj widok
      </button>
    </div>
  );
}
