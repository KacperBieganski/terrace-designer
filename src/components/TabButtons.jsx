export default function TabButtons({ activeTab, setActiveTab }) {
  return (
    <div className="tab-buttons">
      <button
        className={activeTab === "shape" ? "active" : ""}
        onClick={() => setActiveTab("shape")}
      >
        Kształt
      </button>
      <button
        className={activeTab === "wymiary" ? "active" : ""}
        onClick={() => setActiveTab("wymiary")}
      >
        Wymiary
      </button>
      <button
        className={activeTab === "material" ? "active" : ""}
        onClick={() => setActiveTab("material")}
      >
        Materiał
      </button>
      <button
        className={activeTab === "wall" ? "active" : ""}
        onClick={() => setActiveTab("wall")}
      >
        Ściany
      </button>
    </div>
  );
}
