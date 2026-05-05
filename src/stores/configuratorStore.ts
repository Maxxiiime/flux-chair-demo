import create from 'zustand';
import { mountStoreDevtool } from 'simple-zustand-devtools';
import { CHAIR_MODELS, TABLE_MODELS } from '@/data/catalog';

const isDevMode = import.meta.env.MODE === 'development';

// ─── Types ───────────────────────────────────────────────

export interface ConfiguratorState {
	currentCategory: 'chair' | 'table';
	currentChairId: string;
	currentTableId: string;
	currentLegId: string | null;

	setCategory: (category: 'chair' | 'table') => void;
	setChair: (chairId: string) => void;
	setTable: (tableId: string) => void;
	setLegs: (legId: string) => void;
}

// ─── Store ───────────────────────────────────────────────

const initialChair = CHAIR_MODELS.firenze;
const initialTable = TABLE_MODELS.luna;
const initialLegId = initialChair.isModular ? initialChair.allowedLegs[1] : null;

export const useConfiguratorStore = create<ConfiguratorState>((set) => ({
	currentCategory: 'chair',
	currentChairId: initialChair.id,
	currentTableId: initialTable.id,
	currentLegId: initialLegId,

	setCategory: (category: 'chair' | 'table') => {
		set((state) => {
			if (state.currentCategory === category) return state;
			if (category === 'table' && !TABLE_MODELS[state.currentTableId]) {
				return {
					currentCategory: category,
					currentTableId: initialTable.id,
				};
			}

			return { currentCategory: category };
		});
	},

	setChair: (chairId: string) => {
		const chair = CHAIR_MODELS[chairId];
		if (!chair) return;

		set((state) => {
			let newLegId = null;
			if (chair.isModular) {
				newLegId = state.currentLegId && chair.allowedLegs.includes(state.currentLegId) 
					? state.currentLegId 
					: chair.allowedLegs[0];
			}

			return {
				currentChairId: chairId,
				currentLegId: newLegId,
			};
		});
	},

	setTable: (tableId: string) => {
		if (!TABLE_MODELS[tableId]) return;
		set({ currentTableId: tableId });
	},

	setLegs: (legId: string) => {
		set((state) => {
			const chair = CHAIR_MODELS[state.currentChairId];
			// Only allow setting legs on modular chairs with valid leg ids
			if (!chair || !chair.isModular) return state;
			if (!chair.allowedLegs.includes(legId)) return state;

			return { currentLegId: legId };
		});
	},
}));

// ─── Devtools ────────────────────────────────────────────

if (isDevMode) {
	mountStoreDevtool('ConfiguratorStore', useConfiguratorStore);
}
