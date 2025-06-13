import { create } from "zustand";

// Default dimensions
const DEFAULT_DIMENSIONS = {
  square: { mainWidth: 5, mainDepth: 5 },
  L: { mainWidth: 2.5, mainDepth: 5, extensionWidth: 2.5, extensionDepth: 2.5 },
  T: { mainWidth: 2.5, mainDepth: 2.5, extensionWidth: 5, extensionDepth: 2.5 },
  U: { mainWidth: 2.5, mainDepth: 2.5, extensionWidth: 2.5, extensionDepth: 5 },
};

// Shared utility
export function getRawPoints(shape, d) {
  const { mainWidth, mainDepth, extensionWidth, extensionDepth } = d;
  switch (shape) {
    case "square":
      return [
        [-mainWidth / 2, 0, -mainDepth / 2],
        [-mainWidth / 2, 0, mainDepth / 2],
        [mainWidth / 2, 0, mainDepth / 2],
        [mainWidth / 2, 0, -mainDepth / 2],
        [-mainWidth / 2, 0, -mainDepth / 2],
      ];
    case "L":
      return [
        [-mainWidth / 2, 0, -mainDepth / 2],
        [-mainWidth / 2, 0, mainDepth / 2],
        [mainWidth / 2, 0, mainDepth / 2],
        [mainWidth / 2, 0, -mainDepth / 2 + extensionDepth],
        [mainWidth / 2 + extensionWidth, 0, -mainDepth / 2 + extensionDepth],
        [mainWidth / 2 + extensionWidth, 0, -mainDepth / 2],
        [-mainWidth / 2, 0, -mainDepth / 2],
      ];
    case "T":
      return [
        [-extensionWidth / 2, 0, -mainDepth / 2 - extensionDepth],
        [-extensionWidth / 2, 0, -mainDepth / 2],
        [-mainWidth / 2, 0, -mainDepth / 2],
        [-mainWidth / 2, 0, mainDepth / 2],
        [mainWidth / 2, 0, mainDepth / 2],
        [mainWidth / 2, 0, -mainDepth / 2],
        [extensionWidth / 2, 0, -mainDepth / 2],
        [extensionWidth / 2, 0, -mainDepth / 2 - extensionDepth],
        [-extensionWidth / 2, 0, -mainDepth / 2 - extensionDepth],
      ];
    case "U":
      return [
        [-mainWidth / 2 - extensionWidth, 0, -mainDepth / 2],
        [-mainWidth / 2 - extensionWidth, 0, -mainDepth / 2 + extensionDepth],
        [-mainWidth / 2, 0, -mainDepth / 2 + extensionDepth],
        [-mainWidth / 2, 0, mainDepth / 2],
        [mainWidth / 2, 0, mainDepth / 2],
        [mainWidth / 2, 0, -mainDepth / 2 + extensionDepth],
        [mainWidth / 2 + extensionWidth, 0, -mainDepth / 2 + extensionDepth],
        [mainWidth / 2 + extensionWidth, 0, -mainDepth / 2],
        [-mainWidth / 2 - extensionWidth, 0, -mainDepth / 2],
      ];
    default:
      return [];
  }
}

function initializeWalls(points) {
  const walls = {};
  for (let i = 0; i < points.length - 1; i++) {
    walls[i] = 0; // default height = 0
  }
  return walls;
}

export const useTerraceStore = create((set, get) => ({
  material: "laminate-flooring-brown_albedo.webp",
  shape: "square",
  dimensions: DEFAULT_DIMENSIONS.square,
  walls: initializeWalls(getRawPoints("square", DEFAULT_DIMENSIONS.square)),
  showMeasurements: true,
  showEnvironment: false,

  setMaterial: (material) => set({ material }),

  setWallHeight: (side, height) =>
    set((state) => ({
      walls: { ...state.walls, [side]: height },
    })),

  setShape: (shape) => {
    const dimensions = DEFAULT_DIMENSIONS[shape];
    const points = getRawPoints(shape, dimensions);
    set({
      shape,
      dimensions,
      walls: initializeWalls(points),
    });
  },

  setDimensions: (dimensions) => {
    const shape = get().shape;
    const points = getRawPoints(shape, dimensions);
    const updatedWalls = {};
    const prevWalls = get().walls;
    for (let i = 0; i < points.length - 1; i++) {
      updatedWalls[i] = prevWalls[i] ?? 0;
    }
    set({
      dimensions,
      walls: updatedWalls,
    });
  },

  setShowMeasurements: (value) => set({ showMeasurements: value }),
  setShowEnvironment: (value) => set({ showEnvironment: value }),
}));
