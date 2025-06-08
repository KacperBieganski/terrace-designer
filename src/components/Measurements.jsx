import { useMemo } from "react";
import { Line, Text } from "@react-three/drei";
import { useTerraceStore } from "../store/useTerraceStore";

export default function Measurements() {
  const { shape, dimensions } = useTerraceStore();
  const { mainWidth, mainDepth, extensionWidth, extensionDepth } = dimensions;

  const margin = 0.5;
  const arrowSize = 0.1;
  const arrowAngle = Math.PI / 6;

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

  const createArrow = (start, end) => {
    const [x1, y1, z1] = start;
    const [x2, y2, z2] = end;

    const dx = x2 - x1;
    const dz = z2 - z1;
    const len = Math.sqrt(dx * dx + dz * dz);
    if (len === 0) return [];

    const dirX = dx / len;
    const dirZ = dz / len;

    const invDirX = -dirX;
    const invDirZ = -dirZ;

    const rotate = (x, z, theta) => {
      const cos = Math.cos(theta);
      const sin = Math.sin(theta);
      return [x * cos - z * sin, x * sin + z * cos];
    };

    const [ax1, az1] = rotate(invDirX, invDirZ, arrowAngle);
    const [ax2, az2] = rotate(invDirX, invDirZ, -arrowAngle);

    const tip = [x2, y2, z2];
    const wing1 = [x2 + ax1 * arrowSize, y2, z2 + az1 * arrowSize];
    const wing2 = [x2 + ax2 * arrowSize, y2, z2 + az2 * arrowSize];

    return [
      [tip, wing1],
      [tip, wing2],
    ];
  };

  const rawPoints = useMemo(() => {
    switch (shape) {
      case "square":
        return [
          [-mainWidth / 2, 0, -mainDepth / 2],
          [-mainWidth / 2, 0, mainDepth / 2],
          [mainWidth / 2, 0, mainDepth / 2],
          [mainWidth / 2, 0, -mainDepth / 2],
          [-mainWidth / 2, 0, -mainDepth / 2],
        ];

      case "L": {
        const w = mainWidth;
        const d = mainDepth;
        const ew = extensionWidth;
        const ed = extensionDepth;

        return [
          [-w / 2, 0, -d / 2],
          [-w / 2, 0, d / 2],
          [w / 2, 0, d / 2],
          [w / 2, 0, -d / 2 + ed],
          [w / 2 + ew, 0, -d / 2 + ed],
          [w / 2 + ew, 0, -d / 2],
          [-w / 2, 0, -d / 2],
        ];
      }

      case "T": {
        const w = mainWidth;
        const d = mainDepth;
        const ew = extensionWidth;
        const ed = extensionDepth;

        return [
          [-ew / 2, 0, -d / 2 - ed],
          [-ew / 2, 0, -d / 2],
          [-w / 2, 0, -d / 2],
          [-w / 2, 0, d / 2],
          [w / 2, 0, d / 2],
          [w / 2, 0, -d / 2],
          [ew / 2, 0, -d / 2],
          [ew / 2, 0, -d / 2 - ed],
          [-ew / 2, 0, -d / 2 - ed],
        ];
      }

      case "U": {
        const w = mainWidth;
        const d = mainDepth;
        const ew = extensionWidth;
        const ed = extensionDepth;

        return [
          [-w / 2 - ew, 0, -d / 2 + ed],
          [-w / 2, 0, -d / 2 + ed],
          [-w / 2, 0, d / 2],
          [w / 2, 0, d / 2],
          [w / 2, 0, -d / 2 + ed],
          [w / 2 + ew, 0, -d / 2 + ed],
          [w / 2 + ew, 0, -d / 2],
          [-w / 2 - ew, 0, -d / 2],
          [-w / 2 - ew, 0, -d / 2 + ed],
        ];
      }

      default:
        return [];
    }
  }, [shape, mainWidth, mainDepth, extensionWidth, extensionDepth]);

  const segments = useMemo(() => {
    const segs = [];
    for (let i = 0; i < rawPoints.length - 1; i++) {
      const p1 = rawPoints[i];
      const p2 = rawPoints[i + 1];
      const [offsetP1, offsetP2] = offsetSegment(p1, p2, margin);

      const mid = [
        (offsetP1[0] + offsetP2[0]) / 2,
        (offsetP1[1] + offsetP2[1]) / 2 + 0.05,
        (offsetP1[2] + offsetP2[2]) / 2,
      ];

      const dx = p2[0] - p1[0];
      const dz = p2[2] - p1[2];
      const len = Math.sqrt(dx * dx + dz * dz);

      const angle = Math.atan2(dz, dx);

      segs.push({
        line: [offsetP1, offsetP2],
        mid,
        len: len.toFixed(2),
        angle,
      });
    }
    return segs;
  }, [rawPoints]);

  const arrows = useMemo(() => {
    const allArrows = [];
    for (let i = 0; i < rawPoints.length - 1; i++) {
      const p1 = offsetSegment(rawPoints[i], rawPoints[i + 1], margin)[0]; // przesunięty początek
      const p2 = offsetSegment(rawPoints[i], rawPoints[i + 1], margin)[1]; // przesunięty koniec

      allArrows.push(...createArrow(p2, p1));
      allArrows.push(...createArrow(p1, p2));
    }
    return allArrows;
  }, [rawPoints, margin]);

  return (
    <>
      {segments.map((seg, i) => (
        <group key={`seg-${i}`}>
          <Line points={seg.line} color="black" lineWidth={1} />
          <Text
            position={seg.mid}
            fontSize={0.15}
            color="black"
            rotation={[-Math.PI / 2, 0, seg.angle]}
            anchorX="center"
            anchorY="2"
            outlineColor="white"
            outlineWidth={0.005}
          >
            {seg.len} m
          </Text>
        </group>
      ))}

      {arrows.map((arrowSeg, i) => (
        <Line
          key={"arrow-" + i}
          points={arrowSeg}
          color="black"
          lineWidth={1}
        />
      ))}
    </>
  );
}
