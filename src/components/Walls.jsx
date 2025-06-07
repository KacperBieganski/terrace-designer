import React, { useMemo } from "react";
import { useLoader } from "@react-three/fiber";
import { TextureLoader, RepeatWrapping, MeshStandardMaterial } from "three";
import { useTerraceStore } from "../store/useTerraceStore";

export default function Walls({ width, depth }) {
  const { walls } = useTerraceStore();
  const baseTexture = useLoader(
    TextureLoader,
    "/textures/walls/brick-wall_albedo.webp"
  );
  const thickness = 0.1;

  const createWallMaterial = (repeatX, repeatY) => {
    const texture = baseTexture.clone();
    texture.wrapS = RepeatWrapping;
    texture.wrapT = RepeatWrapping;
    texture.repeat.set(repeatX, repeatY);
    texture.needsUpdate = true;

    return new MeshStandardMaterial({ map: texture });
  };

  return (
    <group>
      {walls.left > 0 && (
        <mesh position={[-width / 2 - thickness / 2, walls.left / 2, 0]}>
          <boxGeometry args={[thickness, walls.left, depth]} />
          <primitive object={createWallMaterial(depth, walls.left)} />
        </mesh>
      )}

      {walls.right > 0 && (
        <mesh position={[width / 2 + thickness / 2, walls.right / 2, 0]}>
          <boxGeometry args={[thickness, walls.right, depth]} />
          <primitive object={createWallMaterial(depth, walls.right)} />
        </mesh>
      )}

      {walls.front > 0 && (
        <mesh position={[0, walls.front / 2, depth / 2 + thickness / 2]}>
          <boxGeometry args={[width, walls.front, thickness]} />
          <primitive object={createWallMaterial(width, walls.front)} />
        </mesh>
      )}

      {walls.back > 0 && (
        <mesh position={[0, walls.back / 2, -depth / 2 - thickness / 2]}>
          <boxGeometry args={[width, walls.back, thickness]} />
          <primitive object={createWallMaterial(width, walls.back)} />
        </mesh>
      )}
    </group>
  );
}
