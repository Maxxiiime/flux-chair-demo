// ─── Types ───────────────────────────────────────────────

interface ChairModelBase {
	id: string;
	name: string;
	previewUrl?: string;
	allowedLegMaterials?: string[];
}

interface CompleteChairModel extends ChairModelBase {
	isModular: false;
	modelUrl: string;
}

interface ModularChairModel extends ChairModelBase {
	isModular: true;
	seatUrl: string;
	allowedLegs: string[];
	
}

interface TableModel {
	id: string;
	name: string;
	previewUrl?: string;
	modelUrl: string;
	allowedMaterials?: string[];
}

export type ChairModel = CompleteChairModel | ModularChairModel;

export interface LegModel {
	id: string;
	name: string;
	url: string;
	previewUrl?: string;
}

// ─── Chair Catalog ───────────────────────────────────

export const CHAIR_MODELS: Record<string, ChairModel> = {
	firenze: {
		id: 'firenze',
		name: 'Firenze',
		previewUrl: '/preview/chairs/firenze.webp',
		isModular: true,
		seatUrl: '/model/Firenze.glb',
		allowedLegs: ['iras_draai', 'venus_draai'],
		allowedLegMaterials: ['black_metal', 'brown_metal', 'beige_metal'],
	},
	berlin: {
		id: 'berlin',
		name: 'Berlin',
		previewUrl: '/preview/chairs/Berlin.webp',
		isModular: true,
		seatUrl: '/model/Berlin.glb',
		allowedLegs: ['iras_draai', 'venus_draai'],
		allowedLegMaterials: ['black_metal', 'brown_metal', 'beige_metal'],
	},
	malmo: {
		id: 'malmo',
		name: 'Malmo',
		previewUrl: '/preview/chairs/Malmo.webp',
		isModular: false,
		modelUrl: '/model/Malmo_Wood.glb',
		allowedLegMaterials: ['brown_wood', 'natural_wood', 'black_wood'],
	},
};

// ─── Leg Catalog ─────────────────────────────────────

export const LEG_MODELS: Record<string, LegModel> = {
	iras_draai: {
		id: 'iras_draai',
		name: 'Iras Draai',
		url: '/model/Iras_draai.glb',
		previewUrl: '/preview/legs/Iras_draai.webp',
	},
	venus_draai: {
		id: 'venus_draai',
		name: 'Venus Draai',
		url: '/model/Venus_draai.glb',
		previewUrl: '/preview/legs/Venus_draai.webp',
	},
};


// ─── Table Catalog ─────────────────────────────────────
export const TABLE_MODELS: Record<string, TableModel> = {
	luna: {
		id: 'luna',
		name: 'Luna',
		previewUrl: '/preview/tables/luna_1_180_mortex.webp',
		modelUrl: '/model/Tables/Luna-model-1-180_micro-cement_TOP.glb',
	},
	paerl: {
		id: 'pearl',
		name: 'Pearl',
		previewUrl: '/preview/tables/pearl_2_160_walnut.webp',
		modelUrl: '/model/Tables/Paerl-model-3_160_oak_TOP.glb',
		allowedMaterials: ['bleek', 'donker', 'startdust'],
	},
};
