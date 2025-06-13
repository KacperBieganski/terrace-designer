import { useEffect, useState } from "react";
import { useTerraceStore } from "../store/useTerraceStore";
import DimensionsControls from "./DimensionsControls";

export default function ControlsPanel({ activeTab }) {
  const { material, walls, shape, setMaterial, setWallHeight, setShape } =
    useTerraceStore();

  const [textures, setTextures] = useState([]);
  const showMeasurements = useTerraceStore((state) => state.showMeasurements);
  const setShowMeasurements = useTerraceStore(
    (state) => state.setShowMeasurements
  );

  const showEnvironment = useTerraceStore((state) => state.showEnvironment);
  const setShowEnvironment = useTerraceStore(
    (state) => state.setShowEnvironment
  );

  useEffect(() => {
    setTextures([
      "laminate-flooring-brown_albedo.webp",
      "luxury-vinyl-plank_albedo.webp",
      "mahogfloor_basecolor.webp",
      "old-plank-flooring1_basecolor.webp",
      "rich-brown-tile-variation_albedo.webp",
      "tile4b_basecolor.webp",
      "concrete_tiles_02_diff_1k.webp",
      "patterned_brick_floor_02_diff_1k.webp",
      "wood_floor_deck_diff_1k.webp",
    ]);
  }, []);

  return (
    <div className="controls-panel">
      {activeTab === "shape" && (
        <div>
          <p>Wybierz kształt:</p>
          <div className="shape-grid">
            {["square", "L", "T", "U"].map((shapeOption) => (
              <div
                key={shapeOption}
                className={`shape-option ${
                  shape === shapeOption ? "selected" : ""
                }`}
                onClick={() => setShape(shapeOption)}
              >
                <div className={`shape-preview ${shapeOption}`}></div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "wymiary" && <DimensionsControls />}

      {activeTab === "material" && (
        <div>
          <p>Wybierz materiał:</p>
          <div className="material-grid">
            {textures.map((file) => (
              <img
                key={file}
                src={`${import.meta.env.BASE_URL}textures/floors/${file}`}
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
        <div>
          <p>Wysokości ścian:</p>
          <label>
            {Object.keys(walls).map((key) => (
              <>
                Ściana {parseInt(key) + 1}:{" "}
                <div
                  key={key}
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <input
                    type="range"
                    min={0}
                    max={10}
                    step={0.1}
                    value={walls[key]}
                    onChange={(e) =>
                      setWallHeight(parseInt(key), parseFloat(e.target.value))
                    }
                  />
                  <input
                    type="number"
                    value={walls[key]}
                    step="0.1"
                    min="0"
                    max="10"
                    onChange={(e) =>
                      setWallHeight(parseInt(key), parseFloat(e.target.value))
                    }
                  />
                </div>
              </>
            ))}
          </label>
        </div>
      )}

      <div style={{ position: "absolute", bottom: "35px" }}>
        <label style={{ cursor: "pointer", userSelect: "none" }}>
          <input
            type="checkbox"
            checked={showEnvironment}
            onChange={(e) => setShowEnvironment(e.target.checked)}
            style={{ marginRight: "8px" }}
          />
          Pokaż tło
        </label>
      </div>
      <div style={{ position: "absolute", bottom: "15px" }}>
        <label style={{ cursor: "pointer", userSelect: "none" }}>
          <input
            type="checkbox"
            checked={showMeasurements}
            onChange={(e) => setShowMeasurements(e.target.checked)}
            style={{ marginRight: "8px" }}
          />
          Pokaż wymiary
        </label>
      </div>
    </div>
  );
}
