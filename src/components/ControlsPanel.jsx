import { useTerraceStore } from "../store/useTerraceStore";

export default function ControlsPanel({ activeTab }) {
  const {
    width,
    depth,
    material,
    walls,
    setWidth,
    setDepth,
    setMaterial,
    setWallHeight,
  } = useTerraceStore();

  return (
    <div className="controls-panel">
      {activeTab === "wymiary" && (
        <>
          {/* Szerokość */}
          <label>
            Szerokość (m):
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <input
                type="range"
                min={1}
                max={50}
                step={0.1}
                value={width}
                onChange={(e) => setWidth(parseFloat(e.target.value))}
              />
              <input
                type="number"
                min={1}
                max={50}
                step={0.1}
                value={width}
                onChange={(e) => setWidth(parseFloat(e.target.value))}
                style={{ width: "60px" }}
              />
            </div>
          </label>

          {/* Głębokość */}
          <label>
            Głębokość (m):
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <input
                type="range"
                min={1}
                max={50}
                step={0.1}
                value={depth}
                onChange={(e) => setDepth(parseFloat(e.target.value))}
              />
              <input
                type="number"
                min={1}
                max={50}
                step={0.1}
                value={depth}
                onChange={(e) => setDepth(parseFloat(e.target.value))}
                style={{ width: "60px" }}
              />
            </div>
          </label>
        </>
      )}

      {activeTab === "material" && (
        <label>
          Materiał:
          <select
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
          >
            <option value="wood">Drewno</option>
            <option value="stone">Kamień</option>
            <option value="concrete">Beton</option>
          </select>
        </label>
      )}

      {activeTab === "wall" && (
        <>
          {["left", "right", "front", "back"].map((side) => (
            <label
              key={side}
              style={{ display: "block", marginBottom: "10px" }}
            >
              {side.charAt(0).toUpperCase() + side.slice(1)} (m):
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <input
                  type="range"
                  min={0}
                  max={5}
                  step={0.1}
                  value={walls[side]}
                  onChange={(e) =>
                    setWallHeight(side, parseFloat(e.target.value) || 0)
                  }
                />
                <input
                  type="number"
                  min={0}
                  max={5}
                  step={0.1}
                  value={walls[side]}
                  onChange={(e) =>
                    setWallHeight(side, parseFloat(e.target.value) || 0)
                  }
                  style={{ width: "60px", marginLeft: "10px" }}
                />
              </div>
            </label>
          ))}
        </>
      )}
    </div>
  );
}
