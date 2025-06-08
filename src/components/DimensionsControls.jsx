import { useTerraceStore } from "../store/useTerraceStore";

export default function DimensionsControls() {
  const { shape, dimensions, setDimensions } = useTerraceStore();

  const handleDimensionChange = (field, value) => {
    let newValue = parseFloat(value) || 0;

    switch (shape) {
      case "U":
        if (field === "extensionDepth" && newValue < dimensions.mainDepth) {
          newValue = dimensions.mainDepth;
        }
        if (field === "mainDepth" && newValue > dimensions.extensionDepth) {
          newValue = dimensions.extensionDepth;
        }
        break;

      case "T":
        if (field === "extensionWidth" && newValue < dimensions.mainWidth) {
          newValue = dimensions.mainWidth;
        }
        if (field === "mainWidth" && newValue > dimensions.extensionWidth) {
          newValue = dimensions.extensionWidth;
        }
        break;

      case "L":
        if (field === "extensionDepth" && newValue > dimensions.mainDepth) {
          newValue = dimensions.mainDepth;
        }
        if (field === "mainDepth" && newValue < dimensions.extensionDepth) {
          newValue = dimensions.extensionDepth;
        }
        break;
    }

    setDimensions({
      ...dimensions,
      [field]: newValue,
    });
  };

  return (
    <>
      {shape === "square" && (
        <>
          <p>Dopasuj wymiary:</p>
          <DimensionInput
            label="Szerokość (m)"
            field="mainWidth"
            value={dimensions.mainWidth}
            onChange={handleDimensionChange}
            min={1}
            max={20}
          />
          <DimensionInput
            label="Głębokość (m)"
            field="mainDepth"
            value={dimensions.mainDepth}
            onChange={handleDimensionChange}
            min={1}
            max={20}
          />
        </>
      )}

      {(shape === "L" || shape === "T" || shape === "U") && (
        <>
          <p>Dopasuj wymiary:</p>
          <DimensionInput
            label="Główna szerokość (m)"
            field="mainWidth"
            value={dimensions.mainWidth}
            onChange={handleDimensionChange}
            min={1}
            max={shape === "T" ? dimensions.extensionWidth : 20}
          />
          <DimensionInput
            label="Główna głębokość (m)"
            field="mainDepth"
            value={dimensions.mainDepth}
            onChange={handleDimensionChange}
            min={shape === "L" ? dimensions.extensionDepth : 1}
            max={shape === "U" ? dimensions.extensionDepth : 20}
          />
          <DimensionInput
            label="Szerokość rozszerzenia (m)"
            field="extensionWidth"
            value={dimensions.extensionWidth}
            onChange={handleDimensionChange}
            min={shape === "T" ? dimensions.mainWidth : 1}
            max={20}
          />
          <DimensionInput
            label="Głębokość rozszerzenia (m)"
            field="extensionDepth"
            value={dimensions.extensionDepth}
            onChange={handleDimensionChange}
            min={shape === "U" ? dimensions.mainDepth : 1}
            max={shape === "L" ? dimensions.mainDepth : 20}
          />
        </>
      )}
    </>
  );
}

function DimensionInput({ label, field, value, onChange, min, max }) {
  return (
    <label>
      {label}:
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <input
          type="range"
          min={min}
          max={max}
          step={0.1}
          value={value}
          onChange={(e) => onChange(field, e.target.value)}
        />
        <input
          type="number"
          min={min}
          max={max}
          step={0.1}
          value={value}
          onChange={(e) => onChange(field, e.target.value)}
          style={{ width: "60px" }}
        />
      </div>
    </label>
  );
}
