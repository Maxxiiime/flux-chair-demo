import { useGLTF } from "@react-three/drei";
import { useMaterial, useLegMaterial } from "@/hooks/useMaterial";
import CustomMeshBase from "../CustomMesh";
import CustomMeshDebug from "../CustomMeshDebug";

//const CustomMesh = import.meta.env.DEV ? CustomMeshDebug : CustomMeshBase;
const CustomMesh = CustomMeshDebug;

import * as THREE from "three";

export function MalmoChairModel() {
	const { nodes } = useGLTF("/model/Chairs/Malmo_Wood.glb") as any;

	const material = useMaterial();
	const legMaterial = useLegMaterial();

	return (
		<group dispose={null}>
			<CustomMesh
				geometry={nodes.leg018.geometry}
				materialData={legMaterial}
				position={[-0.002, 0.389, -0.094]}
				mode={2}
			/>

			<CustomMesh
				geometry={nodes.top013.geometry}
				materialData={material}
				position={[0, 0.546, -0.011]}
				side={THREE.DoubleSide}
				mode={1}
			/>

			<CustomMesh
				geometry={nodes.plastic_support006.geometry}
				materialData={legMaterial}
				position={[-0.002, 0.002, 0.012]}
				mode={2}
			/>
		</group>
	);
}

useGLTF.preload("/model/Chairs/Malmo_Wood.glb");
