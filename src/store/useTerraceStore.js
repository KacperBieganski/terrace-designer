import { create } from "zustand";

const DEFAULT_DIMENSIONS = {
  square: {
    mainWidth: 5,
    mainDepth: 5,
  },
  L: {
    mainWidth: 2.5,
    mainDepth: 5,
    extensionWidth: 2.5,
    extensionDepth: 2.5,
  },
  T: {
    mainWidth: 2.5,
    mainDepth: 2.5,
    extensionWidth: 5,
    extensionDepth: 2.5,
  },
  U: {
    mainWidth: 2.5,
    mainDepth: 2.5,
    extensionWidth: 2.5,
    extensionDepth: 5,
  },
};

export const useTerraceStore = create((set) => ({
  material: "laminate-flooring-brown_albedo.webp",
  walls: {
    left: 0,
    right: 0,
    front: 0,
    back: 0,
  },
  shape: "square",
  dimensions: DEFAULT_DIMENSIONS.square,
  showMeasurements: true,
  showEnvironment: false,

  setMaterial: (material) => set({ material }),
  setWallHeight: (side, height) =>
    set((state) => ({
      walls: { ...state.walls, [side]: height },
    })),
  setShape: (shape) =>
    set({
      shape,
      dimensions: DEFAULT_DIMENSIONS[shape],
    }),
  setDimensions: (dimensions) => set({ dimensions }),
  setShowMeasurements: (value) => set({ showMeasurements: value }),
  setShowEnvironment: (value) => set({ showEnvironment: value }),
}));
