import React from "react";
import { useTerraceStore } from "../store/useTerraceStore";

export default function Walls({ width, depth }) {
  const { walls } = useTerraceStore();
  const wallColor = "#555555";

  // Grubość każdej ściany
  const thickness = 0.1;

  return (
    <group>
      {/* Left wall */}
      {walls.left > 0 && (
        <mesh position={[-width / 2 - thickness / 2, walls.left / 2, 0]}>
          <boxGeometry args={[thickness, walls.left, depth]} />
          <meshStandardMaterial color={wallColor} />
        </mesh>
      )}

      {/* Right wall */}
      {walls.right > 0 && (
        <mesh position={[width / 2 + thickness / 2, walls.right / 2, 0]}>
          <boxGeometry args={[thickness, walls.right, depth]} />
          <meshStandardMaterial color={wallColor} />
        </mesh>
      )}

      {/* Front wall */}
      {walls.front > 0 && (
        <mesh position={[0, walls.front / 2, depth / 2 + thickness / 2]}>
          <boxGeometry args={[width, walls.front, thickness]} />
          <meshStandardMaterial color={wallColor} />
        </mesh>
      )}

      {/* Back wall */}
      {walls.back > 0 && (
        <mesh position={[0, walls.back / 2, -depth / 2 - thickness / 2]}>
          <boxGeometry args={[width, walls.back, thickness]} />
          <meshStandardMaterial color={wallColor} />
        </mesh>
      )}
    </group>
  );
}
