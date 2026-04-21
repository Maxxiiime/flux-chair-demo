import { OrbitControls, Stage, useTexture } from "@react-three/drei";
import { ChairRenderer } from "./Chairs/ChairRenderer";
import { LegRenderer } from "./Chairs/LegRenderer";
import { useConfiguratorStore } from "@/stores/configuratorStore";
import { CHAIR_MODELS } from "@/data/catalog";
import { Suspense } from "react";
import Loader from "../Loader";
import { EffectComposer, N8AO } from "@react-three/postprocessing";
import { PlaneShadow } from "./PlaneShadow";

const BAKED_SHADOWS: Record<string, string> = {
	iras_draai: "/baked/Iras.webp",
	venus_draai: "/baked/Venus.webp",
	malmo: "/baked/Malmo.webp",
};

Object.values(BAKED_SHADOWS).forEach((path) => {
	useTexture.preload(path);
});

const Scene = () => {
	const currentChairId = useConfiguratorStore((state) => state.currentChairId);
	const currentLegId = useConfiguratorStore((state) => state.currentLegId);

	const chairConfig = CHAIR_MODELS[currentChairId];
	const shadowTexturePath = chairConfig?.isModular
		? (currentLegId ? BAKED_SHADOWS[currentLegId] : undefined) ?? BAKED_SHADOWS.iras_draai
		: BAKED_SHADOWS.malmo;

	return (
		<Suspense fallback={<Loader />}>
			<Stage
				environment={{ files: "/hdri/potsdamer_platz_1k.hdr" }}
				adjustCamera={false}
				shadows={false}
				intensity={2}

			>
				<PlaneShadow texturePath={shadowTexturePath} />
				{/* Seat / Complete chair */}
				<ChairRenderer chairId={currentChairId} />

				{/* Legs (only for modular chairs) */}
				<LegRenderer legId={chairConfig?.isModular && currentLegId ? currentLegId : "empty"} />
			</Stage>

			<EffectComposer multisampling={8}>
				<N8AO
					intensity={0.6}
					screenSpaceRadius
				/>
			</EffectComposer>

			<OrbitControls
				makeDefault
				maxDistance={1.8}
				minDistance={0.8}

				maxPolarAngle={51 * Math.PI / 100}

			/>
		</Suspense>
	);
};

export default Scene;

