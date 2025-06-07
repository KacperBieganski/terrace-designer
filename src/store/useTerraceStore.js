import { create } from "zustand";

export const useTerraceStore = create((set) => ({
  width: 3,
  depth: 2,
  material: "wood",
  walls: {
    left: 0,
    right: 0,
    front: 0,
    back: 0,
  },

  setWidth: (width) => set({ width }),
  setDepth: (depth) => set({ depth }),
  setMaterial: (material) => set({ material }),
  setWallHeight: (side, height) =>
    set((state) => ({
      walls: { ...state.walls, [side]: height },
    })),
}));
