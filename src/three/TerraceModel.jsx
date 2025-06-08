import { useTerraceStore } from "../store/useTerraceStore";
import Walls from "../components/Walls";
import { useLoader } from "@react-three/fiber";
import { TextureLoader, RepeatWrapping } from "three";

export default function TerraceModel() {
  const { width, depth, material } = useTerraceStore();

  const texture = useLoader(
    TextureLoader,
    `${import.meta.env.BASE_URL}textures/floors/${material}`
  );

  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.repeat.set(width, depth);

  return (
    <mesh position={[0, 0, 0]}>
      <boxGeometry args={[width, 0.1, depth]} />
      <meshStandardMaterial
        map={texture}
        color="#ffffff"
        emissive="#bbbbbb"
        emissiveIntensity={0.03}
      />
      <Walls width={width} depth={depth} />
    </mesh>
  );
}
