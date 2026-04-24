import { useControls } from "leva";
import { useEffect, useMemo } from "react";
import CustomMesh, { MaterialProps } from "./CustomMesh";

type CustomMeshProps = React.ComponentProps<typeof CustomMesh>;

export default function CustomMeshDebug({ materialData, color, textures, mode = 0, ...props }: CustomMeshProps & { mode?: number }) {
	// No debug panel for legs
	if (mode === 2) {
		return <CustomMesh {...props} mode={mode} color={color} textures={textures} materialData={materialData} />;
	}

	return <CustomMeshDebugInner materialData={materialData} color={color} textures={textures} mode={mode} {...props} />;
}

function CustomMeshDebugInner({ materialData, color, textures, mode = 0, ...props }: CustomMeshProps & { mode?: number }) {
	const initialMaterialData: MaterialProps = useMemo(() => {
		return materialData || {
			color: color,
			textures: textures,
			metalness: 0.0,
			roughness: 0.5,
			sheen: 0.2,
			sheenColor: "#5c0000",
			sheenRoughness: 0.6,
		};
	}, [materialData, color, textures]);

	const [{ roughness, metalness, sheen, sheenColor, sheenRoughness, normalScale, textureRepeat }, set] = useControls("Chair Material", () => ({
		roughness: { value: initialMaterialData.roughness ?? 0.5, min: -1, max: 1 },
		metalness: { value: initialMaterialData.metalness ?? 0.0, min: 0, max: 1 },
		sheen: { value: initialMaterialData.sheen ?? 0.2, min: 0, max: 1 },
		sheenColor: { value: initialMaterialData.sheenColor ?? "#5c0000" },
		sheenRoughness: { value: initialMaterialData.sheenRoughness ?? 0.6, min: 0, max: 1 },
		normalScale: { value: 1.0, min: 0, max: 5, step: 0.1 },
		textureRepeat: { value: 4.0, min: 1, max: 10, step: 1 },
	}));

	// Reset Leva controls to material defaults when material changes
	useEffect(() => {
		set({
			roughness: initialMaterialData.roughness ?? 0.5,
			metalness: initialMaterialData.metalness ?? 0.0,
			sheen: initialMaterialData.sheen ?? 0.2,
			sheenColor: initialMaterialData.sheenColor ?? "#5c0000",
			sheenRoughness: initialMaterialData.sheenRoughness ?? 0.6,
		});
	}, [initialMaterialData, set]);

	const overrideMaterialData = useMemo(() => {
		return {
			...initialMaterialData,
			roughness,
			metalness,
			sheen,
			sheenColor,
			sheenRoughness,
		};
	}, [initialMaterialData, roughness, metalness, sheen, sheenColor, sheenRoughness]);

	return <CustomMesh {...props} mode={mode} color={color} textures={textures} materialData={overrideMaterialData} normalScale={normalScale} textureRepeat={textureRepeat} />;
}
