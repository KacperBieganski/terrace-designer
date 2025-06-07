import { useTerraceStore } from "../store/useTerraceStore";
import Walls from "../components/Walls";

export default function TerraceModel() {
  const { width, depth, material } = useTerraceStore();
  let color =
    material === "stone"
      ? "#a9a9a9"
      : material === "concrete"
      ? "#cccccc"
      : "#8B4513";

  return (
    <mesh position={[0, 0, 0]}>
      <boxGeometry args={[width, 0.1, depth]} />
      <meshStandardMaterial color={color} />
      <Walls width={width} depth={depth} />
    </mesh>
  );
}
