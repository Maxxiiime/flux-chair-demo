import create from 'zustand';
import { mountStoreDevtool } from 'simple-zustand-devtools';
import { CHAIR_MODELS } from '@/data/catalog';

const isDevMode = import.meta.env.MODE === 'development';

// ─── Types ───────────────────────────────────────────────

export interface ConfiguratorState {
	currentChairId: string;
	currentLegId: string | null;

	setChair: (chairId: string) => void;
	setLegs: (legId: string) => void;
}

// ─── Store ───────────────────────────────────────────────

const initialChair = CHAIR_MODELS.firenze;
const initialLegId = initialChair.isModular ? initialChair.allowedLegs[1] : null;

export const useConfiguratorStore = create<ConfiguratorState>((set) => ({
	currentChairId: initialChair.id,
	currentLegId: initialLegId,

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
