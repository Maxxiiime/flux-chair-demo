import { useGLTF } from '@react-three/drei'
import { useLegMaterial } from '@/hooks/useMaterial'
import CustomMeshBase from '../CustomMesh'
import CustomMeshDebug from '../CustomMeshDebug'

//const CustomMesh = import.meta.env.DEV ? CustomMeshDebug : CustomMeshBase;
const CustomMesh = CustomMeshDebug;

export function Model() {
  const { nodes } = useGLTF('/model/Chairs/Venus_draai.glb') as any
  const legMaterial = useLegMaterial()

  return (
    <group dispose={null}>
      <CustomMesh
        geometry={nodes.leg_1001.geometry}
        materialData={legMaterial}
        position={[0.005, 0.359, -0.001]}
        mode={2}
      />

      <CustomMesh
        geometry={nodes.Mesh091.geometry}
        materialData={legMaterial}
        position={[0.006, 0.001, -0.005]}
        mode={2}
      />

      <CustomMesh
        geometry={nodes.Mesh091_1.geometry}
        materialData={legMaterial}
        position={[0.006, 0.001, -0.005]}
        mode={2}

      />

      <CustomMesh
        geometry={nodes.pipe001.geometry}
        materialData={legMaterial}
        position={[0.005, 0.359, -0.001]}
        mode={2}
      />
    </group>
  )
}

useGLTF.preload('/model/Chairs/Venus_draai.glb')
