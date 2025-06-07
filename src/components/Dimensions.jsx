import { Text } from "@react-three/drei";
import { useTerraceStore } from "../store/useTerraceStore";
import { useEffect, useRef } from "react";

export default function Dimensions() {
  const { width, depth } = useTerraceStore();

  const widthAttrRef = useRef();
  const depthAttrRef = useRef();

  useEffect(() => {
    if (widthAttrRef.current) {
      const array = widthAttrRef.current.array;
      array[0] = -width / 2;
      array[1] = 0;
      array[2] = 0;
      array[3] = width / 2;
      array[4] = 0;
      array[5] = 0;
      widthAttrRef.current.needsUpdate = true;
    }
  }, [width]);

  useEffect(() => {
    if (depthAttrRef.current) {
      const array = depthAttrRef.current.array;
      array[0] = 0;
      array[1] = 0;
      array[2] = -depth / 2;
      array[3] = 0;
      array[4] = 0;
      array[5] = depth / 2;
      depthAttrRef.current.needsUpdate = true;
    }
  }, [depth]);

  const arrowSize = 0.1;
  const arrowAngle = Math.PI / 6;

  function ArrowHeadHorizontal(x, y, z, direction = 1) {
    const line1 = [
      x,
      y,
      z,
      x - direction * arrowSize * Math.cos(arrowAngle),
      y,
      z + arrowSize * Math.sin(arrowAngle),
    ];
    const line2 = [
      x,
      y,
      z,
      x - direction * arrowSize * Math.cos(arrowAngle),
      y,
      z - arrowSize * Math.sin(arrowAngle),
    ];

    return (
      <>
        <line>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              itemSize={3}
              array={new Float32Array(line1)}
            />
          </bufferGeometry>
          <lineBasicMaterial color="black" />
        </line>
        <line>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              itemSize={3}
              array={new Float32Array(line2)}
            />
          </bufferGeometry>
          <lineBasicMaterial color="black" />
        </line>
      </>
    );
  }

  function ArrowHeadVertical(x, y, z, direction = 1) {
    const line1 = [
      x,
      y,
      z,
      x + arrowSize * Math.sin(arrowAngle),
      y,
      z - direction * arrowSize * Math.cos(arrowAngle),
    ];
    const line2 = [
      x,
      y,
      z,
      x - arrowSize * Math.sin(arrowAngle),
      y,
      z - direction * arrowSize * Math.cos(arrowAngle),
    ];

    return (
      <>
        <line>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              itemSize={3}
              array={new Float32Array(line1)}
            />
          </bufferGeometry>
          <lineBasicMaterial color="black" />
        </line>
        <line>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              itemSize={3}
              array={new Float32Array(line2)}
            />
          </bufferGeometry>
          <lineBasicMaterial color="black" />
        </line>
      </>
    );
  }

  return (
    <group position={[0, 0.06, 0]}>
      {/* Linia szerokości */}
      <group position={[0, 0, -depth / 2 - 0.5]}>
        <line>
          <bufferGeometry>
            <bufferAttribute
              ref={widthAttrRef}
              attach="attributes-position"
              count={2}
              itemSize={3}
              array={new Float32Array([-width / 2, 0, 0, width / 2, 0, 0])}
            />
          </bufferGeometry>
          <lineBasicMaterial color="black" />
        </line>

        <group position={[-width / 2, 0, 0]}>
          {ArrowHeadHorizontal(0, 0, 0, -1)}
        </group>
        <group position={[width / 2, 0, 0]}>
          {ArrowHeadHorizontal(0, 0, 0, 1)}
        </group>

        <Text
          position={[0, 0, -0.07]}
          rotation={[-Math.PI / 2, 0, 0]}
          fontSize={0.1}
          color="black"
          anchorX="center"
          anchorY="middle"
        >
          {width.toFixed(1)} m
        </Text>
      </group>

      {/* Linia głębokości */}
      <group position={[-width / 2 - 0.5, 0, 0]}>
        <line>
          <bufferGeometry>
            <bufferAttribute
              ref={depthAttrRef}
              attach="attributes-position"
              count={2}
              itemSize={3}
              array={new Float32Array([0, 0, -depth / 2, 0, 0, depth / 2])}
            />
          </bufferGeometry>
          <lineBasicMaterial color="black" />
        </line>

        <group position={[0, 0, -depth / 2]}>
          {ArrowHeadVertical(0, 0, 0, -1)}
        </group>
        <group position={[0, 0, depth / 2]}>
          {ArrowHeadVertical(0, 0, 0, 1)}
        </group>

        <Text
          position={[-0.07, 0, 0]}
          rotation={[-Math.PI / 2, 0, 1.55]}
          fontSize={0.1}
          color="black"
          anchorX="center"
          anchorY="middle"
        >
          {depth.toFixed(1)} m
        </Text>
      </group>
    </group>
  );
}
