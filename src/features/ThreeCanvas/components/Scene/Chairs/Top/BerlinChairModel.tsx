import { useGLTF } from "@react-three/drei";
import { useMaterial } from "@/hooks/useMaterial";
import CustomMeshBase from "../CustomMesh";
import CustomMeshDebug from "../CustomMeshDebug";

//const CustomMesh = import.meta.env.DEV ? CustomMeshDebug : CustomMeshBase;
const CustomMesh = CustomMeshDebug;

export function BerlinChairModel() {
    const { nodes } = useGLTF("/model/Chairs/Berlin.glb") as any;
    const material = useMaterial();

    return (
        <group dispose={null}>
            <CustomMesh 
                geometry={nodes.stitches018.geometry}
                materialData={material}
                position={[0.011, 0.49, -0.063]}
                mode={1}
            />

            <CustomMesh
                geometry={nodes.top027.geometry}
                materialData={material}
                position={[0.012, 0.557, -0.18]}
                mode={1}
            />

            <CustomMesh
                geometry={nodes.zipper.geometry}
                materialData={material}
                position={[0.012, 0.398, -0.173]}
                mode={1}
            />
        </group>
    );
}

useGLTF.preload("/model/Chairs/Berlin.glb");
