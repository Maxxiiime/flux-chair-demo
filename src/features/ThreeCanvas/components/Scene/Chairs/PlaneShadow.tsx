import { useGLTF, useTexture } from "@react-three/drei";
import { useMemo, useState, useEffect, Suspense } from "react";
import * as THREE from "three";
import { animate } from "framer-motion";

interface PlaneShadowProps {
	texturePath: string;
}

const ShadowLayer = ({
	texturePath,
	isLatest,
	onFadeOutComplete,
}: {
	texturePath: string;
	isLatest: boolean;
	onFadeOutComplete: (path: string) => void;
}) => {
	const shadowTexture = useTexture(texturePath);
	const alphaMap = useTexture("/alpha.jpg");
	const { scene } = useGLTF("/model/plane.glb");

	// Configure texture properties
	useMemo(() => {
		shadowTexture.colorSpace = THREE.SRGBColorSpace;
		shadowTexture.wrapS = THREE.ClampToEdgeWrapping;
		shadowTexture.wrapT = THREE.ClampToEdgeWrapping;
		shadowTexture.flipY = false;
		alphaMap.repeat.set(1, 1);
	}, [shadowTexture, alphaMap]);

	const shadowMaterial = useMemo(
		() =>
			new THREE.MeshBasicMaterial({
				map: shadowTexture,
				alphaMap: alphaMap,
				transparent: true,
				opacity: 0,
				depthWrite: false,
				depthTest: true,
			}),
		[shadowTexture, alphaMap],
	);

	const shadowModel = useMemo(() => {
		const clonedScene = scene.clone(true);
		clonedScene.traverse((obj) => {
			if ((obj as THREE.Mesh).isMesh) {
				(obj as THREE.Mesh).material = shadowMaterial;
			}
		});
		return clonedScene;
	}, [scene, shadowMaterial]);

	useEffect(() => {
		const targetOpacity = isLatest ? 0.85 : 0;
		const controls = animate(shadowMaterial.opacity, targetOpacity, {
			duration: 0.3,
			ease: "easeInOut",
			onUpdate: (v) => {
				shadowMaterial.opacity = v;
				shadowMaterial.needsUpdate = true;
			},
			onComplete: () => {
				if (!isLatest) {
					onFadeOutComplete(texturePath);
				}
			},
		});

		return () => controls.stop();
	}, [isLatest, shadowMaterial, texturePath, onFadeOutComplete]);

	return <primitive object={shadowModel} position={[0, 0.001, 0]} />;
};

export const PlaneShadow = ({ texturePath }: PlaneShadowProps) => {
	const [layers, setLayers] = useState<string[]>([texturePath]);

	useEffect(() => {
		setLayers((prev) => {
			if (prev.includes(texturePath)) {
				// If it exists, move it to the end (it's the latest)
				return [...prev.filter((p) => p !== texturePath), texturePath];
			}
			return [...prev, texturePath];
		});
	}, [texturePath]);

	const handleFadeOutComplete = (pathToRemove: string) => {
		setLayers((prev) => prev.filter((p) => p !== pathToRemove));
	};

	return (
		<group>
			{layers.map((path) => (
				<Suspense key={path} fallback={null}>
					<ShadowLayer
						texturePath={path}
						isLatest={path === texturePath}
						onFadeOutComplete={handleFadeOutComplete}
					/>
				</Suspense>
			))}
		</group>
	);
};

useGLTF.preload("/model/plane.glb");
