import { useGLTF } from '@react-three/drei'
import { useTableMaterial } from '@/hooks/useMaterial';
import CustomMeshBase from '../../CustomMesh';
import CustomMeshDebug from '../../CustomMeshDebug';

export function LunaModel() {
  const { nodes: nodesTop } = useGLTF('/model/Tables/Luna-model-1-180_micro-cement_TOP.glb') as any;
  const { nodes: nodesBottom } = useGLTF('/model/Tables/Luna-model-1-180_micro-cement_BOTTOM.glb') as any;
  const tableMaterial = useTableMaterial();

  const CustomMesh = import.meta.env.DEV ? CustomMeshDebug : CustomMeshBase;

  return (
    <group dispose={null} position={[0, -0.1, -0.2]}>
      {/* TOP */}
      <CustomMesh
        castShadow
        receiveShadow
        geometry={nodesTop['Luna-model-1-180_micro-cement_TOP'].geometry}
        materialData={tableMaterial}
        mode={0}
      />
      <CustomMesh
        castShadow
        receiveShadow
        geometry={nodesTop['Luna-model-1-180_micro-cement_TOP001'].geometry}
        materialData={tableMaterial}
        mode={0}
      />
      <CustomMesh
        castShadow
        receiveShadow
        geometry={nodesTop['Luna-model-1-180_micro-cement_TOP002'].geometry}
        materialData={tableMaterial}
        mode={0}
      />

      {/* BOTTOM */}
      <CustomMesh
        castShadow
        receiveShadow
        geometry={nodesBottom['Luna-model-1-180_micro-cement_BOTTOM'].geometry}
        materialData={tableMaterial}
        mode={0}
      />
      <CustomMesh
        castShadow
        receiveShadow
        geometry={nodesBottom['Luna-model-1-180_micro-cement_LEG'].geometry}
        materialData={tableMaterial}
        mode={0}
      />
    </group>
  )
}

useGLTF.preload('/model/Tables/Luna-model-1-180_micro-cement_TOP.glb')
useGLTF.preload('/model/Tables/Luna-model-1-180_micro-cement_BOTTOM.glb')

