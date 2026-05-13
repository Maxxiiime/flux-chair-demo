import { useGLTF } from '@react-three/drei'
import { useTableMaterial } from '@/hooks/useMaterial';
import { useConfiguratorStore } from "@/stores/configuratorStore";
import CustomMeshBase from '../../CustomMesh';
import CustomMeshDebug from '../../CustomMeshDebug';

export function PaerlModel() {
  const { nodes: nodesTop } = useGLTF('/model/Tables/Paerl-model-3_160_oak_TOP.glb') as any;
  const { nodes: nodesBottom } = useGLTF('/model/Tables/Paerl-model-3_160_oak_BOTTOM.glb') as any;
  const tableMaterial = useTableMaterial();
  const tableScale = useConfiguratorStore((s) => s.tableScale);

  const CustomMesh = import.meta.env.DEV ? CustomMeshDebug : CustomMeshBase;

  return (
    <group dispose={null} scale={0.7} >
      {/* TOP */}
      <group scale={[tableScale, 1, tableScale]}>
        <CustomMesh
          castShadow
          receiveShadow
          geometry={nodesTop['Paerl-model-3_160_oak_TOP'].geometry}
          materialData={tableMaterial}
          mode={0}
        />
      </group>

      {/* BOTTOM */}
      <CustomMesh
        castShadow
        receiveShadow
        geometry={nodesBottom['Paerl-model-3_160_oak_BOTTOM'].geometry}
        materialData={tableMaterial}
        mode={2}
      />
      <CustomMesh
        castShadow
        receiveShadow
        geometry={nodesBottom['Paerl-model-3_160_oak_LEG'].geometry}
        materialData={tableMaterial}
        mode={2}
      />
    </group>
  )
}

useGLTF.preload('/model/Tables/Paerl-model-3_160_oak_TOP.glb')
useGLTF.preload('/model/Tables/Paerl-model-3_160_oak_BOTTOM.glb')