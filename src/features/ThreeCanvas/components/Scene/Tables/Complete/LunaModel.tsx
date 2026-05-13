import { useGLTF } from '@react-three/drei'
import { useTableMaterial } from '@/hooks/useMaterial';
import { useConfiguratorStore } from "@/stores/configuratorStore";
import CustomMeshBase from '../../CustomMesh';
import CustomMeshDebug from '../../CustomMeshDebug';

export function LunaModel() {
  const { nodes: nodesTop } = useGLTF('/model/Tables/Luna-model-1-180_micro-cement_TOP.glb') as any;
  const { nodes: nodesBottom } = useGLTF('/model/Tables/Luna-model-1-180_micro-cement_BOTTOM.glb') as any;
  const tableMaterial = useTableMaterial();
  const tableScale = useConfiguratorStore((s) => s.tableScale);

  const CustomMesh = import.meta.env.DEV ? CustomMeshDebug : CustomMeshBase;

  return (
    <group dispose={null} scale={0.7}>
      {/* TOP */}
      <group scale={[tableScale, 1, 1]}>
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
      </group>

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

