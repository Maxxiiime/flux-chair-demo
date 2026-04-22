import { useControls } from "leva";
import { useMemo } from "react";
import CustomMesh, { MaterialProps } from "./CustomMesh";

type CustomMeshProps = React.ComponentProps<typeof CustomMesh>;

export default function CustomMeshDebug({ materialData, color, textures, ...props }: CustomMeshProps) {
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

	const { roughness, metalness, sheen, sheenColor, sheenRoughness, normalScale, textureRepeat } = useControls("Material Settings", {
		roughness: { value: initialMaterialData.roughness ?? 0.5, min: 0, max: 1 },
		metalness: { value: initialMaterialData.metalness ?? 0.0, min: 0, max: 1 },
		sheen: { value: initialMaterialData.sheen ?? 0.2, min: 0, max: 1 },
		sheenColor: { value: initialMaterialData.sheenColor ?? "#5c0000" },
		sheenRoughness: { value: initialMaterialData.sheenRoughness ?? 0.6, min: 0, max: 1 },
		normalScale: { value: 1.0, min: 0, max: 5, step: 0.1 },
		textureRepeat: { value: 4.0, min: 1, max: 10, step: 1 },
	});

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

	return <CustomMesh {...props} color={color} textures={textures} materialData={overrideMaterialData} normalScale={normalScale} textureRepeat={textureRepeat} />;
}
