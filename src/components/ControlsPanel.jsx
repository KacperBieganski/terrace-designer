import { useEffect, useState } from "react";
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

  const [textures, setTextures] = useState([]);

  useEffect(() => {
    setTextures([
      "laminate-flooring-brown_albedo.webp",
      "luxury-vinyl-plank_albedo.webp",
      "mahogfloor_basecolor.webp",
      "old-plank-flooring1_basecolor.webp",
      "rich-brown-tile-variation_albedo.webp",
      "tile4b_basecolor.webp",
    ]);
  }, []);

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
                max={20}
                step={0.1}
                value={width}
                onChange={(e) => setWidth(parseFloat(e.target.value))}
              />
              <input
                type="number"
                min={1}
                max={20}
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
                max={20}
                step={0.1}
                value={depth}
                onChange={(e) => setDepth(parseFloat(e.target.value))}
              />
              <input
                type="number"
                min={1}
                max={20}
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
        <div>
          <p>Wybierz materiał:</p>
          <div className="material-grid">
            {textures.map((file) => (
              <img
                key={file}
                src={`/textures/floors/${file}`}
                alt={file}
                onClick={() => setMaterial(file)}
                className={`material-option ${
                  material === file ? "selected" : ""
                }`}
              />
            ))}
          </div>
        </div>
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
