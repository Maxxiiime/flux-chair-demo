import { useGLTF } from '@react-three/drei'
import { useTableMaterial } from '@/hooks/useMaterial';
import CustomMesh from '../../CustomMesh';

export function LunaModel() {
  const { nodes: nodesTop } = useGLTF('/model/Tables/Luna-model-1-180_micro-cement_TOP.glb') as any;
  const { nodes: nodesBottom } = useGLTF('/model/Tables/Luna-model-1-180_micro-cement_BOTTOM.glb') as any;
  const tableMaterial = useTableMaterial();

  return (
    <group dispose={null}>
      {/* TOP */}
      <CustomMesh
        castShadow
        receiveShadow
        geometry={nodesTop['Luna-model-1-180_micro-cement_TOP'].geometry}
        materialData={tableMaterial}
        mode={1}
      />
      <CustomMesh
        castShadow
        receiveShadow
        geometry={nodesTop['Luna-model-1-180_micro-cement_TOP001'].geometry}
        materialData={tableMaterial}
        mode={1}
      />
      <CustomMesh
        castShadow
        receiveShadow
        geometry={nodesTop['Luna-model-1-180_micro-cement_TOP002'].geometry}
        materialData={tableMaterial}
        mode={1}
      />

      {/* BOTTOM */}
      <CustomMesh
        castShadow
        receiveShadow
        geometry={nodesBottom['Luna-model-1-180_micro-cement_BOTTOM'].geometry}
        materialData={tableMaterial}
        mode={1}
      />
      <CustomMesh
        castShadow
        receiveShadow
        geometry={nodesBottom['Luna-model-1-180_micro-cement_LEG'].geometry}
        materialData={tableMaterial}
        mode={1}
      />
    </group>
  )
}

useGLTF.preload('/model/Tables/Luna-model-1-180_micro-cement_TOP.glb')
useGLTF.preload('/model/Tables/Luna-model-1-180_micro-cement_BOTTOM.glb')

