import { useTerraceStore } from "../store/useTerraceStore";
import Walls from "../components/Walls";
import Measurements from "../components/Measurements";
import { useLoader } from "@react-three/fiber";
import { TextureLoader, RepeatWrapping, Vector2 } from "three";
import { useState } from "react";

export default function TerraceModel() {
  const { shape, dimensions, material, showMeasurements } = useTerraceStore();
  const { mainWidth, mainDepth, extensionWidth, extensionDepth } = dimensions;

  const texture = useLoader(
    TextureLoader,
    `${import.meta.env.BASE_URL}textures/floors/${material}`
  );

  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;

  const textureScale = new Vector2(1, 1);

  const renderSquareShape = () => {
    texture.repeat.set(mainWidth * textureScale.x, mainDepth * textureScale.y);
    return (
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[mainWidth, 0.1, mainDepth]} />
        <meshStandardMaterial
          map={texture}
          color="#ffffff"
          emissive="#bbbbbb"
          emissiveIntensity={0.03}
        />

        <Walls />
        {showMeasurements && <Measurements />}
      </mesh>
    );
  };

  const renderLShape = () => {
    const totalWidth = mainWidth + extensionWidth;
    const totalDepth = Math.max(mainDepth, extensionDepth);

    return (
      <group>
        {/* Główna część */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[mainWidth, 0.1, mainDepth]} />
          <meshStandardMaterial
            map={texture.clone()}
            map-repeat={[
              mainWidth * textureScale.x,
              mainDepth * textureScale.y,
            ]}
            color="#ffffff"
            emissive="#bbbbbb"
            emissiveIntensity={0.03}
          />
        </mesh>

        {/* Rozszerzenie (noga L) */}
        <mesh
          position={[
            mainWidth / 2 + extensionWidth / 2,
            0,
            -mainDepth / 2 + extensionDepth / 2,
          ]}
        >
          <boxGeometry args={[extensionWidth, 0.1, extensionDepth]} />
          <meshStandardMaterial
            map={texture.clone()}
            map-repeat={[
              extensionWidth * textureScale.x,
              extensionDepth * textureScale.y,
            ]}
            color="#ffffff"
            emissive="#bbbbbb"
            emissiveIntensity={0.03}
          />
        </mesh>

        <Walls />

        {showMeasurements && <Measurements />}
      </group>
    );
  };

  const renderTShape = () => {
    const totalWidth = Math.max(mainWidth, extensionWidth);
    const totalDepth = mainDepth + extensionDepth;

    return (
      <group>
        {/* Pozioma część T */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[mainWidth, 0.1, mainDepth]} />
          <meshStandardMaterial
            map={texture.clone()}
            map-repeat={[
              mainWidth * textureScale.x,
              mainDepth * textureScale.y,
            ]}
            color="#ffffff"
            emissive="#bbbbbb"
            emissiveIntensity={0.03}
          />
        </mesh>

        {/* Pionowa część T */}
        <mesh position={[0, 0, -(mainDepth / 2 + extensionDepth / 2)]}>
          <boxGeometry args={[extensionWidth, 0.1, extensionDepth]} />
          <meshStandardMaterial
            map={texture.clone()}
            map-repeat={[
              extensionWidth * textureScale.x,
              extensionDepth * textureScale.y,
            ]}
            color="#ffffff"
            emissive="#bbbbbb"
            emissiveIntensity={0.03}
          />
        </mesh>

        <Walls />
        {showMeasurements && <Measurements />}
      </group>
    );
  };

  const renderUShape = () => {
    const totalWidth = mainWidth + 2 * extensionWidth;
    const totalDepth = Math.max(mainDepth, extensionDepth);

    return (
      <group>
        {/* Centralna część U */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[mainWidth, 0.1, mainDepth]} />
          <meshStandardMaterial
            map={texture.clone()}
            map-repeat={[
              mainWidth * textureScale.x,
              mainDepth * textureScale.y,
            ]}
            color="#ffffff"
            emissive="#bbbbbb"
            emissiveIntensity={0.03}
          />
        </mesh>

        {/* Lewe rozszerzenie */}
        <mesh
          position={[
            -(mainWidth / 2 + extensionWidth / 2),
            0,
            -(mainDepth / 2) + extensionDepth / 2,
          ]}
        >
          <boxGeometry args={[extensionWidth, 0.1, extensionDepth]} />
          <meshStandardMaterial
            map={texture.clone()}
            map-repeat={[
              extensionWidth * textureScale.x,
              extensionDepth * textureScale.y,
            ]}
            color="#ffffff"
            emissive="#bbbbbb"
            emissiveIntensity={0.03}
          />
        </mesh>

        {/* Prawe rozszerzenie */}
        <mesh
          position={[
            mainWidth / 2 + extensionWidth / 2,
            0,
            -(mainDepth / 2) + extensionDepth / 2,
          ]}
        >
          <boxGeometry args={[extensionWidth, 0.1, extensionDepth]} />
          <meshStandardMaterial
            map={texture.clone()}
            map-repeat={[
              extensionWidth * textureScale.x,
              extensionDepth * textureScale.y,
            ]}
            color="#ffffff"
            emissive="#bbbbbb"
            emissiveIntensity={0.03}
          />
        </mesh>

        <Walls />

        {showMeasurements && <Measurements />}
      </group>
    );
  };

  const renderShape = () => {
    switch (shape) {
      case "square":
        return renderSquareShape();
      case "L":
        return renderLShape();
      case "T":
        return renderTShape();
      case "U":
        return renderUShape();
      default:
        return renderSquareShape();
    }
  };

  return renderShape();
}
