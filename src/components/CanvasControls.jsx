import { useTerraceStore } from "../store/useTerraceStore";

export default function CanvasControls({ onResetView }) {
  const showMeasurements = useTerraceStore((state) => state.showMeasurements);
  const setShowMeasurements = useTerraceStore(
    (state) => state.setShowMeasurements
  );
  const showEnvironment = useTerraceStore((state) => state.showEnvironment);
  const setShowEnvironment = useTerraceStore(
    (state) => state.setShowEnvironment
  );

  return (
    <>
      <div className="checkbox-section">
        <label style={{ cursor: "pointer", userSelect: "none" }}>
          <input
            type="checkbox"
            checked={showEnvironment}
            onChange={(e) => setShowEnvironment(e.target.checked)}
            style={{ marginRight: "8px" }}
          />
          Pokaż tło
        </label>
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

      <div className="reset-view">
        <button className="reset-view-button" onClick={onResetView}>
          Resetuj widok
        </button>
      </div>
    </>
  );
}
