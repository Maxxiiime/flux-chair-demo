import React from "react";
import { useConfiguratorStore } from "@/stores/configuratorStore";
import { TABLE_MODELS } from "@/data/catalog";

const TablePanel: React.FC = () => {
  const currentTableId = useConfiguratorStore((s) => s.currentTableId);
  const setTable = useConfiguratorStore((s) => s.setTable);

  const tableEntries = Object.entries(TABLE_MODELS);

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
    </>
  );
};

export default TablePanel;
