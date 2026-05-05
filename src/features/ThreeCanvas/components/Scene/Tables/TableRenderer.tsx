import React from "react";
import { LunaModel } from "./Complete/LunaModel";

const TABLE_COMPONENTS: Record<string, React.FC> = {
	luna: LunaModel,
};

interface TableRendererProps {
	tableId: string;
}

export const TableRenderer: React.FC<TableRendererProps> = ({ tableId }) => {
	const TableComponent = TABLE_COMPONENTS[tableId];

	if (!TableComponent) return null;

	return <TableComponent />;
};
