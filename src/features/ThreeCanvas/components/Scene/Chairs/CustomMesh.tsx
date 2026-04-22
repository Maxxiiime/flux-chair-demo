import { useRef, useEffect, useState, useMemo } from "react";
import * as THREE from "three";
import { animate } from "framer-motion";
import CSM from "three-custom-shader-material";
import fragmentShader from "../../../shaders/fragment.glsl";
import vertexShader from "../../../shaders/vertex.glsl";

export interface MaterialProps {
	color?: string;
	textures?: {
		map?: THREE.Texture | null;
		aoMap?: THREE.Texture | null;
		normalMap?: THREE.Texture | null;
		roughnessMap?: THREE.Texture | null;
	};
	metalness?: number;
	roughness?: number;
	sheen?: number;
	sheenColor?: string;
	sheenRoughness?: number;
}

type CustomMeshProps = JSX.IntrinsicElements["group"] & {
	side?: THREE.Side;
	geometry: THREE.BufferGeometry;
	mode?: number;
	materialData?: MaterialProps;
	textures?: any;
	color?: string;
	delay?: number;
	duration?: number;
	normalScale?: number;
	textureRepeat?: number;
};

const defaultColor = new THREE.Color("#ffffff");

export default function CustomMesh({
	geometry,
	materialData,
	textures,
	color,
	mode = 0,
	delay = 0,
	duration = 0.6,
	side = THREE.FrontSide,
	normalScale = 1.0,
	textureRepeat,
	...props
}: CustomMeshProps) {
	const materialRef = useRef<any>(null);
	const isTopMaterial = mode === 1|| mode === 0;

	const currMaterialData: MaterialProps = materialData || {
		color: color,
		textures: textures,
		metalness: 0.0,
		roughness: 0.0,
		sheen: 0.0,
		sheenColor: "#ffffff",
		sheenRoughness: 0.0,
	};

	const [prevMaterialData, setPrevMaterialData] = useState<MaterialProps>(currMaterialData);

	const [boundsMinY, boundsMaxY] = useMemo(() => {
		if (!geometry.boundingBox) {
			geometry.computeBoundingBox();
		}

		const minY = geometry.boundingBox?.min.y ?? -0.5;
		const maxY = geometry.boundingBox?.max.y ?? 0.5;
		return [minY, maxY];
	}, [geometry]);

	const uniforms = useMemo(() => {
		const c1 = prevMaterialData.color ? new THREE.Color(prevMaterialData.color) : defaultColor;
		const c2 = currMaterialData.color ? new THREE.Color(currMaterialData.color) : defaultColor;

		return {
			uMode: { value: mode },

			// Current Material
			uDiffuseMap1: { value: prevMaterialData.textures?.map || undefined },
			uHasDiffuseMap1: { value: prevMaterialData.textures?.map ? 1.0 : 0.0 },
			uColor1: { value: c1 },
			uRepeat1: { value: textureRepeat !== undefined ? new THREE.Vector2(textureRepeat, textureRepeat) : (prevMaterialData.textures?.map?.repeat || new THREE.Vector2(1, 1)) },
			uNormalMap1: { value: prevMaterialData.textures?.normalMap || undefined },
			uRoughnessMap1: { value: prevMaterialData.textures?.roughnessMap || undefined },

			// Next Material
			uDiffuseMap2: { value: currMaterialData.textures?.map || undefined },
			uHasDiffuseMap2: { value: currMaterialData.textures?.map ? 1.0 : 0.0 },
			uColor2: { value: c2 },
			uRepeat2: { value: textureRepeat !== undefined ? new THREE.Vector2(textureRepeat, textureRepeat) : (currMaterialData.textures?.map?.repeat || new THREE.Vector2(1, 1)) },
			uNormalMap2: { value: currMaterialData.textures?.normalMap || undefined },
			uRoughnessMap2: { value: currMaterialData.textures?.roughnessMap || undefined },

			uProgress: { value: 0.0 },
			uAnimationStyle: { value: 1.0 },
			uSmoothness: { value: 0.06 },
			uRoughness: { value: currMaterialData.roughness ?? 0.5 },
			uMetalness: { value: currMaterialData.metalness ?? 0.0 },
			uHasNormalMap: { value: currMaterialData.textures?.normalMap ? 1.0 : 0.0 },
			uNormalScale: { value: new THREE.Vector2(normalScale, normalScale) },
			uBoundsMinY: { value: boundsMinY },
			uBoundsMaxY: { value: boundsMaxY },
		};
	}, [prevMaterialData, currMaterialData]);

	useEffect(() => {
		if (materialRef.current) {
			materialRef.current.uniforms.uBoundsMinY.value = boundsMinY;
			materialRef.current.uniforms.uBoundsMaxY.value = boundsMaxY;
		}
	}, [boundsMinY, boundsMaxY]);

	useEffect(() => {
		if (materialRef.current) {
			materialRef.current.uniforms.uNormalScale.value = new THREE.Vector2(normalScale, normalScale);
			if (textureRepeat !== undefined) {
				materialRef.current.uniforms.uRepeat1.value = new THREE.Vector2(textureRepeat, textureRepeat);
				materialRef.current.uniforms.uRepeat2.value = new THREE.Vector2(textureRepeat, textureRepeat);
			}
		}
	}, [normalScale, textureRepeat]);

	useEffect(() => {
		// Trigger Transition
		if (currMaterialData !== prevMaterialData) {
			const nextColor = currMaterialData.color ? new THREE.Color(currMaterialData.color) : defaultColor;

			if (materialRef.current) {
				materialRef.current.uniforms.uDiffuseMap2.value = currMaterialData.textures?.map || undefined;
				materialRef.current.uniforms.uNormalMap2.value = currMaterialData.textures?.normalMap || undefined;
				materialRef.current.uniforms.uRoughnessMap2.value = currMaterialData.textures?.roughnessMap || undefined;
				materialRef.current.uniforms.uHasDiffuseMap2.value = currMaterialData.textures?.map ? 1.0 : 0.0;
				materialRef.current.uniforms.uColor2.value = nextColor;
				materialRef.current.uniforms.uRepeat2.value = textureRepeat !== undefined ? new THREE.Vector2(textureRepeat, textureRepeat) : (currMaterialData.textures?.map?.repeat || new THREE.Vector2(1, 1));
				materialRef.current.uniforms.uHasNormalMap.value = currMaterialData.textures?.normalMap ? 1.0 : 0.0;
				materialRef.current.uniforms.uMode.value = mode;
			}

			const controls = animate(0, 1, {
				duration: duration,
				delay: delay,
				onUpdate: (latestValue) => {
					if (materialRef.current) {
						materialRef.current.uniforms.uProgress.value = latestValue;
					}
				},
				onComplete: () => {
					setPrevMaterialData(currMaterialData);
					if (materialRef.current) {
						materialRef.current.uniforms.uDiffuseMap1.value = currMaterialData.textures?.map || undefined;
						materialRef.current.uniforms.uNormalMap1.value = currMaterialData.textures?.normalMap || undefined;
						materialRef.current.uniforms.uRoughnessMap1.value = currMaterialData.textures?.roughnessMap || undefined;
						materialRef.current.uniforms.uHasDiffuseMap1.value = currMaterialData.textures?.map ? 1.0 : 0.0;
						materialRef.current.uniforms.uColor1.value = nextColor;
						materialRef.current.uniforms.uRepeat1.value = textureRepeat !== undefined ? new THREE.Vector2(textureRepeat, textureRepeat) : (currMaterialData.textures?.map?.repeat || new THREE.Vector2(1, 1));
						materialRef.current.uniforms.uProgress.value = 0;
					}
				},
			});

			return () => controls.stop();
		}
	}, [currMaterialData, prevMaterialData, mode, delay, duration]);

	// Ensure UVs for AO maps
	useEffect(() => {
		if (geometry && geometry.attributes.uv) {
			if (!geometry.attributes.uv1) geometry.setAttribute("uv1", geometry.attributes.uv);
			if (!geometry.attributes.uv2) geometry.setAttribute("uv2", geometry.attributes.uv);

			if (!geometry.attributes.tangent) {
				geometry.computeTangents();
			}
		}
	}, [geometry]);

	return (
		<group {...props}>
			<mesh geometry={geometry} castShadow receiveShadow>
				<CSM
					ref={materialRef}
					vertexShader={vertexShader}
					fragmentShader={fragmentShader}
					uniforms={uniforms}
					// @ts-expect-error defines is supported by Three.js materials but missing in CSM types
					defines={{ USE_TANGENT: "" }}
					baseMaterial={THREE.MeshPhysicalMaterial}
					sheen={isTopMaterial ? currMaterialData.sheen : 0}
					sheenColor={isTopMaterial ? currMaterialData.sheenColor : "#000000"}
					sheenRoughness={isTopMaterial ? currMaterialData.sheenRoughness : 0}
					aoMap={prevMaterialData.textures?.aoMap}
					side={side}
				/>
			</mesh>
		</group>
	);
}
