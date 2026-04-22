import { useGLTF } from '@react-three/drei'
import { useLegMaterial } from '@/hooks/useMaterial'
import CustomMeshBase from '../CustomMesh'
import CustomMeshDebug from '../CustomMeshDebug'

const CustomMesh = import.meta.env.DEV ? CustomMeshDebug : CustomMeshBase;
export function Model() {
  const { nodes } = useGLTF('/model/Iras_draai.glb') as any
  const legMaterial = useLegMaterial()

  return (
    <group dispose={null}>
        <CustomMesh
          geometry={nodes.leg013.geometry}
          materialData={legMaterial}
          position={[0, 0.098, 0]}
          mode={2}
        />
        <CustomMesh
          geometry={nodes.plastic_support009.geometry}
          materialData={legMaterial}
          position={[0, 0.098, 0]}
          mode={2}
        />
        <CustomMesh
          geometry={nodes.pipe001.geometry}
          materialData={legMaterial}
          position={[0, 0.098, 0]}
          mode={2}
          delay={0.4}
          duration={0.2}
        />
    </group>
  )
}

useGLTF.preload('/model/Iras_draai.glb')
