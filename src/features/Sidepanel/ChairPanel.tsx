import React, { useEffect } from "react";
import { useAppStore } from "@/stores/appStore";
import { useConfiguratorStore } from "@/stores/configuratorStore";
import { CATALOGUE_MATERIAUX } from "@/data/materials";
import { CHAIR_MODELS, LEG_MODELS } from "@/data/catalog";

const materialEntries = Object.entries(CATALOGUE_MATERIAUX);

const ChairPanel: React.FC = () => {
  const selectedMaterial = useAppStore((s) => s.selectedMaterial);
  const selectedLegMaterial = useAppStore((s) => s.selectedLegMaterial);
  const update = useAppStore((s) => s.update);

  const currentChairId = useConfiguratorStore((s) => s.currentChairId);
  const currentLegId = useConfiguratorStore((s) => s.currentLegId);
  const setChair = useConfiguratorStore((s) => s.setChair);
  const setLegs = useConfiguratorStore((s) => s.setLegs);

  const chairEntries = Object.entries(CHAIR_MODELS);
  const currentChair = CHAIR_MODELS[currentChairId];

  const allowedLegEntries = currentChair?.isModular
    ? currentChair.allowedLegs.map((legId) => [legId, LEG_MODELS[legId]] as const)
    : [];

  const allowedLegMaterialSet = currentChair?.allowedLegMaterials?.length
    ? new Set(currentChair.allowedLegMaterials)
    : null;

  const availableLegMaterialEntries = materialEntries.filter(([key, mat]) => {
    if (mat.type !== "leg") return false;
    if (!allowedLegMaterialSet) return true;
    return allowedLegMaterialSet.has(key);
  });

  useEffect(() => {
    if (!availableLegMaterialEntries.length) return;
    const isCurrentLegMaterialAllowed = availableLegMaterialEntries.some(
      ([key]) => key === selectedLegMaterial
    );

    if (!isCurrentLegMaterialAllowed) {
      update({ selectedLegMaterial: availableLegMaterialEntries[0][0] });
    }
  }, [availableLegMaterialEntries, selectedLegMaterial, update]);

  return (
    <>
      <h3 className="section-title">Chair Model</h3>
      <div className="material-grid">
        {chairEntries.map(([chairId, chair]) => (
          <button
            key={chairId}
            className={`material-swatch ${currentChairId === chairId ? "active" : ""}`}
            onClick={() => setChair(chairId)}
            title={chair.name}
          >
            {chair.previewUrl ? (
              <img src={chair.previewUrl} alt={chair.name} className="swatch-image" />
            ) : (
              <div className="swatch-image" style={{ backgroundColor: "#d9d9d9" }} />
            )}
            <span className="swatch-label">{chair.name}</span>
          </button>
        ))}
      </div>

      <h3 className="section-title">Legs</h3>
      {currentChair?.isModular && allowedLegEntries.length > 0 ? (
        <div className="material-grid">
          {allowedLegEntries.map(([legId, leg]) => (
            <button
              key={legId}
              className={`material-swatch ${currentLegId === legId ? "active" : ""}`}
              onClick={() => setLegs(legId)}
              title={leg.name}
            >
              {leg.previewUrl ? (
                <img src={leg.previewUrl} alt={leg.name} className="swatch-image" />
              ) : (
                <div className="swatch-image" style={{ backgroundColor: "#d9d9d9" }} />
              )}
              <span className="swatch-label">{leg.name}</span>
            </button>
          ))}
        </div>
      ) : (
        (!currentChair?.isModular || allowedLegEntries.length === 0) && (
          <p className="not-allowed-text">This chair does not support leg customization.</p>
        )
      )}

      <h3 className="section-title">Chair Materials</h3>
      <div className="material-grid">
        {materialEntries.filter(([_, mat]) => mat.type === "chair").map(([key, material]) => (
          <button
            key={key}
            className={`material-swatch ${selectedMaterial === key ? "active" : ""}`}
            onClick={() => update({ selectedMaterial: key })}
            title={material.name}
          >
            {material.textures?.map ? (
              <img src={material.textures.map || ""} alt={material.name} className="swatch-image" />
            ) : (
              <div className="swatch-image" style={{ backgroundColor: material.color || "#d9d9d9" }} />
            )}
            <span className="swatch-label">{material.name}</span>
          </button>
        ))}
      </div>

      <h3 className="section-title">Leg Materials</h3>
      <div className="material-grid">
        {availableLegMaterialEntries.map(([key, material]) => (
          <button
            key={key}
            className={`material-swatch ${selectedLegMaterial === key ? "active" : ""}`}
            onClick={() => update({ selectedLegMaterial: key })}
            title={material.name}
          >
            {material.textures?.map ? (
              <img src={material.textures.map || ""} alt={material.name} className="swatch-image" />
            ) : (
              <div className="swatch-image" style={{ backgroundColor: material.color || "#d9d9d9" }} />
            )}
            <span className="swatch-label">{material.name}</span>
          </button>
        ))}
      </div>
    </>
  );
};

export default ChairPanel;
