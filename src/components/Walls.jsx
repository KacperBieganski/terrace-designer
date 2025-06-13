import React from "react";
import { useLoader } from "@react-three/fiber";
import { TextureLoader, RepeatWrapping } from "three";
import { useTerraceStore } from "../store/useTerraceStore";
import { getRawPoints } from "../store/useTerraceStore";

export default function Walls() {
  const { walls, shape, dimensions } = useTerraceStore();
  const baseTexture = useLoader(
    TextureLoader,
    `${import.meta.env.BASE_URL}textures/walls/brick-wall_albedo.webp`
  );

  const offsetSegment = ([x1, y1, z1], [x2, y2, z2], offset) => {
    const dx = x2 - x1;
    const dz = z2 - z1;
    const len = Math.sqrt(dx * dx + dz * dz);
    if (len === 0)
      return [
        [x1, y1, z1],
        [x2, y2, z2],
      ];
    const nx = -dz / len;
    const nz = dx / len;
    return [
      [x1 + nx * offset, y1, z1 + nz * offset],
      [x2 + nx * offset, y2, z2 + nz * offset],
    ];
  };

  const rawPoints = getRawPoints(shape, dimensions);

  return (
    <>
      {rawPoints.slice(0, -1).map((start, i) => {
        const height = walls[i] ?? 0;
        if (height === 0) return null;

        const end = rawPoints[i + 1];
        const [[x1, y1, z1], [x2, y2, z2]] = offsetSegment(start, end, 0.05);
        const dx = x2 - x1;
        const dz = z2 - z1;
        const length = Math.sqrt(dx * dx + dz * dz);
        const angle = Math.atan2(dx, dz);

        // Sklonuj teksturę dla tej ściany
        const texture = baseTexture.clone();
        texture.wrapS = RepeatWrapping;
        texture.wrapT = RepeatWrapping;
        texture.repeat.set(length, height + 0.05);
        texture.needsUpdate = true;

        return (
          <mesh
            key={i}
            position={[
              (x1 + x2) / 2,
              (height + 0.05) / 2 - 0.03,
              (z1 + z2) / 2,
            ]}
            rotation={[0, angle, 0]}
          >
            <boxGeometry args={[0.1, height + 0.05, length]} />
            <meshStandardMaterial map={texture} />
          </mesh>
        );
      })}
    </>
  );
}
