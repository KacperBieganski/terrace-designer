import React from "react";
import { useLoader } from "@react-three/fiber";
import { TextureLoader, RepeatWrapping, MeshStandardMaterial } from "three";
import { useTerraceStore } from "../store/useTerraceStore";

export default function Walls({ shape, dimensions }) {
  const { walls } = useTerraceStore();
  const texture = useLoader(
    TextureLoader,
    `${import.meta.env.BASE_URL}textures/walls/brick-wall_albedo.webp`
  );
  const thickness = 0.1;

  const createWallMaterial = (repeatX, repeatY) => {
    const tex = texture.clone();
    tex.wrapS = RepeatWrapping;
    tex.wrapT = RepeatWrapping;
    tex.repeat.set(repeatX, repeatY);
    tex.needsUpdate = true;
    return new MeshStandardMaterial({ map: tex });
  };

  const { mainWidth, mainDepth, extensionWidth, extensionDepth } = dimensions;

  const wallsMeshes = [];

  // === SHARED HELPERS ===
  const addWall = (pos, size) => {
    wallsMeshes.push(
      <mesh position={pos} key={`${pos.join("_")}`}>
        <boxGeometry args={size} />
        <primitive object={createWallMaterial(size[0], size[1])} />
      </mesh>
    );
  };

  if (shape === "square") {
    if (walls.left > 0)
      addWall(
        [-mainWidth / 2 - thickness / 2, walls.left / 2, 0],
        [thickness, walls.left, mainDepth]
      );
    if (walls.right > 0)
      addWall(
        [mainWidth / 2 + thickness / 2, walls.right / 2, 0],
        [thickness, walls.right, mainDepth]
      );
    if (walls.front > 0)
      addWall(
        [0, walls.front / 2, mainDepth / 2 + thickness / 2],
        [mainWidth, walls.front, thickness]
      );
    if (walls.back > 0)
      addWall(
        [0, walls.back / 2, -mainDepth / 2 - thickness / 2],
        [mainWidth, walls.back, thickness]
      );
  } else if (shape === "L") {
    const totalWidth = mainWidth + extensionWidth;
    const totalDepth = Math.max(mainDepth, extensionDepth);

    // Lewa ściana
    if (walls.left > 0)
      addWall(
        [-mainWidth / 2 - thickness / 2, walls.left / 2, 0],
        [thickness, walls.left, mainDepth]
      );

    // Tylna ściana główna
    if (walls.back > 0)
      addWall(
        [0, walls.back / 2, -mainDepth / 2 - thickness / 2],
        [mainWidth, walls.back, thickness]
      );

    // Ściana boczna L-nogi
    if (walls.right > 0)
      addWall(
        [
          mainWidth + extensionWidth / 2 - thickness / 2,
          walls.right / 2,
          -mainDepth / 2 + extensionDepth / 2,
        ],
        [thickness, walls.right, extensionDepth]
      );

    // Tylna ściana L-nogi
    if (walls.back > 0)
      addWall(
        [
          mainWidth / 2 + extensionWidth / 2,
          walls.back / 2,
          -mainDepth - extensionDepth / 2 - thickness / 2,
        ],
        [extensionWidth, walls.back, thickness]
      );

    // Czołowa ściana główna (jeśli obecna)
    if (walls.front > 0)
      addWall(
        [0, walls.front / 2, mainDepth / 2 + thickness / 2],
        [mainWidth, walls.front, thickness]
      );
  } else if (shape === "T") {
    const totalDepth = mainDepth + extensionDepth;

    // Lewa i prawa w poziomym segmencie
    if (walls.left > 0)
      addWall(
        [-mainWidth / 2 - thickness / 2, walls.left / 2, 0],
        [thickness, walls.left, mainDepth]
      );
    if (walls.right > 0)
      addWall(
        [mainWidth / 2 + thickness / 2, walls.right / 2, 0],
        [thickness, walls.right, mainDepth]
      );

    // Tył poziomego segmentu
    if (walls.back > 0)
      addWall(
        [0, walls.back / 2, -mainDepth / 2 - thickness / 2],
        [mainWidth, walls.back, thickness]
      );

    // Czoło poziomego segmentu
    if (walls.front > 0)
      addWall(
        [0, walls.front / 2, mainDepth / 2 + thickness / 2],
        [mainWidth, walls.front, thickness]
      );

    // Boczne ściany w pionowej części T
    if (walls.left > 0)
      addWall(
        [
          -extensionWidth / 2 - thickness / 2,
          walls.left / 2,
          -mainDepth / 2 - extensionDepth / 2,
        ],
        [thickness, walls.left, extensionDepth]
      );

    if (walls.right > 0)
      addWall(
        [
          extensionWidth / 2 + thickness / 2,
          walls.right / 2,
          -mainDepth / 2 - extensionDepth / 2,
        ],
        [thickness, walls.right, extensionDepth]
      );

    // Przód/powrót dolnej części T
    if (walls.back > 0)
      addWall(
        [0, walls.back / 2, -mainDepth - extensionDepth / 2 - thickness / 2],
        [extensionWidth, walls.back, thickness]
      );
  } else if (shape === "U") {
    // Centralna część
    if (walls.left > 0)
      addWall(
        [-mainWidth / 2 - thickness / 2, walls.left / 2, 0],
        [thickness, walls.left, mainDepth]
      );
    if (walls.right > 0)
      addWall(
        [mainWidth / 2 + thickness / 2, walls.right / 2, 0],
        [thickness, walls.right, mainDepth]
      );
    if (walls.back > 0)
      addWall(
        [0, walls.back / 2, -mainDepth / 2 - thickness / 2],
        [mainWidth, walls.back, thickness]
      );

    // Lewe rozszerzenie
    if (walls.left > 0)
      addWall(
        [
          -mainWidth / 2 - extensionWidth / 2 - thickness / 2,
          walls.left / 2,
          -(mainDepth / 2) + extensionDepth / 2,
        ],
        [thickness, walls.left, extensionDepth]
      );

    // Prawe rozszerzenie
    if (walls.right > 0)
      addWall(
        [
          mainWidth / 2 + extensionWidth / 2 + thickness / 2,
          walls.right / 2,
          -(mainDepth / 2) + extensionDepth / 2,
        ],
        [thickness, walls.right, extensionDepth]
      );

    // Czoło lewej i prawej odnogi
    if (walls.front > 0) {
      addWall(
        [
          -mainWidth / 2 - extensionWidth / 2,
          walls.front / 2,
          mainDepth / 2 + extensionDepth / 2 + thickness / 2,
        ],
        [extensionWidth, walls.front, thickness]
      );
      addWall(
        [
          mainWidth / 2 + extensionWidth / 2,
          walls.front / 2,
          mainDepth / 2 + extensionDepth / 2 + thickness / 2,
        ],
        [extensionWidth, walls.front, thickness]
      );
    }
  }

  return <group>{wallsMeshes}</group>;
}
