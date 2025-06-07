import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import TerraceModel from "./TerraceModel";
import Dimensions from "../components/Dimensions";

export default function SceneCanvas() {
  return (
    <div className="scene-canvas">
      <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <TerraceModel />
        <Dimensions />
        <OrbitControls />
      </Canvas>
    </div>
  );
}
