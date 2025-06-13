import { Sky, useGLTF } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import * as THREE from "three";
import { useMemo } from "react";
import { Box3, Vector3 } from "three";

function Ground() {
  const texture = useLoader(
    TextureLoader,
    `${import.meta.env.BASE_URL}textures/grass1-albedo3.webp`
  );

  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(40, 40);

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}

function Trees() {
  const { scene } = useGLTF(`${import.meta.env.BASE_URL}models/Tree.glb`);

  const baseScene = useMemo(() => {
    const cloned = scene.clone(true);
    cloned.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        child.material = child.material.clone();

        if (child.material) {
          child.material.depthWrite = true;
          child.material.side = THREE.DoubleSide;

          if (child.material.color) {
            child.material.color.multiplyScalar(2);
          }

          if (child.material.emissive) {
            child.material.emissive = new THREE.Color(0x222222);
            child.material.emissiveIntensity = 0.8;
          }
        }
      }
    });
    return cloned;
  }, [scene]);

  const positions = useMemo(() => {
    const trees = [];

    const boundingBox = new Box3().setFromObject(baseScene);
    const minY = boundingBox.min.y;
    const count = 150;

    for (let i = 0; i < count; i++) {
      let x, z;

      const edge = Math.floor(Math.random() * 4);
      const offset = 12;

      switch (edge) {
        case 0:
          x = Math.random() * 100 - 50;
          z = 50 - Math.random() * offset;
          break;
        case 1:
          x = Math.random() * 100 - 50;
          z = -50 + Math.random() * offset;
          break;
        case 2:
          x = -50 + Math.random() * offset;
          z = Math.random() * 100 - 50;
          break;
        case 3:
          x = 50 - Math.random() * offset;
          z = Math.random() * 100 - 50;
          break;
      }

      const yRotation = Math.random() * Math.PI * 2;
      const scale = 0.5 + Math.random() * 0.5;
      const y = -minY * scale;

      trees.push({ position: [x, y, z], rotation: [0, yRotation, 0], scale });
    }

    return trees;
  }, [baseScene]);

  return (
    <>
      {positions.map((props, i) => (
        <primitive
          key={i}
          object={baseScene.clone(true)} // Głęboki klon z osobnym materiałem
          position={props.position}
          rotation={props.rotation}
          scale={props.scale}
        />
      ))}
    </>
  );
}

function Fence() {
  const texture = useLoader(
    TextureLoader,
    `${import.meta.env.BASE_URL}textures/fence.webp`
  );
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(20, 1);

  const fenceMaterial = new THREE.MeshStandardMaterial({ map: texture });
  const fenceHeight = 2;
  const groundSize = 100;
  const thickness = 0.1;

  return (
    <>
      {/* Front */}
      <mesh position={[0, fenceHeight / 2, -groundSize / 2]}>
        <boxGeometry args={[groundSize, fenceHeight, thickness]} />
        <primitive object={fenceMaterial} attach="material" />
      </mesh>
      {/* Back */}
      <mesh position={[0, fenceHeight / 2, groundSize / 2]}>
        <boxGeometry args={[groundSize, fenceHeight, thickness]} />
        <primitive object={fenceMaterial} attach="material" />
      </mesh>
      {/* Left */}
      <mesh position={[-groundSize / 2, fenceHeight / 2, 0]}>
        <boxGeometry args={[thickness, fenceHeight, groundSize]} />
        <primitive object={fenceMaterial} attach="material" />
      </mesh>
      {/* Right */}
      <mesh position={[groundSize / 2, fenceHeight / 2, 0]}>
        <boxGeometry args={[thickness, fenceHeight, groundSize]} />
        <primitive object={fenceMaterial} attach="material" />
      </mesh>
    </>
  );
}

export default function Environment() {
  return (
    <>
      <Sky sunPosition={[100, 20, 100]} />
      <Ground />
      <Fence />
      <Trees />
    </>
  );
}
