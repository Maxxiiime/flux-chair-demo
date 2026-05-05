import { useGLTF } from '@react-three/drei'
import { useLegMaterial, useMaterial } from '@/hooks/useMaterial'
import CustomMeshBase from '../../CustomMesh'
import CustomMeshDebug from '../../CustomMeshDebug'

//const CustomMesh = import.meta.env.DEV ? CustomMeshDebug : CustomMeshBase;
const CustomMesh = CustomMeshDebug;

export function FirenzeChairModel() {
  const { nodes } = useGLTF('./model/Chairs/Firenze.glb') as any
  const material = useMaterial()
  const legMaterial = useLegMaterial()

  return (
    <group dispose={null}>
      <CustomMesh
        geometry={nodes.top034.geometry}
        materialData={material}
        mode={1}
        position={[0, 0.522, -0.11]}
      />

      <CustomMesh
        geometry={nodes.leg004.geometry}
        materialData={legMaterial}
        mode={2}
        position={[0.004, 0.39, 0.009]}
        delay={0.6}
        duration={0.2}
      />
    </group>
  )
}

useGLTF.preload('./model/Chairs/Firenze.glb')
