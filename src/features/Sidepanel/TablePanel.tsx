import React from "react";
import { useConfiguratorStore } from "@/stores/configuratorStore";
import { useAppStore } from "@/stores/appStore";
import { TABLE_MODELS } from "@/data/catalog";
import { CATALOGUE_MATERIAUX } from "@/data/materials";

const TablePanel: React.FC = () => {
  const currentTableId = useConfiguratorStore((s) => s.currentTableId);
  const setTable = useConfiguratorStore((s) => s.setTable);
  const selectedTableMaterial = useAppStore((s) => s.selectedTableMaterial);
  const update = useAppStore((s) => s.update);

  const tableEntries = Object.entries(TABLE_MODELS);
  const tableMaterialEntries = Object.entries(CATALOGUE_MATERIAUX).filter(
    ([_, material]) => material.type === "table"
  );

  return (
    <>
      <h3 className="section-title">Table Model</h3>
      <div className="material-grid">
        {tableEntries.map(([tableId, table]) => (
          <button
            key={tableId}
            className={`material-swatch ${currentTableId === tableId ? "active" : ""}`}
            onClick={() => setTable(tableId)}
            title={table.name}
          >
            {table.previewUrl ? (
              <img src={table.previewUrl} alt={table.name} className="swatch-image" />
            ) : (
              <div className="swatch-image" style={{ backgroundColor: "#d9d9d9" }} />
            )}
            <span className="swatch-label">{table.name}</span>
          </button>
        ))}
      </div>

      <h3 className="section-title">Table Materials</h3>
      <div className="material-grid">
        {tableMaterialEntries.map(([key, material]) => (
          <button
            key={key}
            className={`material-swatch ${selectedTableMaterial === key ? "active" : ""}`}
            onClick={() => update({ selectedTableMaterial: key })}
            title={material.name}
          >
            {(() => {
              const previewSrc = material.type === 'table' ? `/textures/Table/${key}.jpg` : material.textures?.map ?? null;
              return previewSrc ? (
                <img src={previewSrc} alt={material.name} className="swatch-image" />
              ) : (
                <div className="swatch-image" style={{ backgroundColor: material.color || "#d9d9d9" }} />
              );
            })()}
            <span className="swatch-label">{material.name}</span>
          </button>
        ))}
      </div>
    </>
  );
};

export default TablePanel;
