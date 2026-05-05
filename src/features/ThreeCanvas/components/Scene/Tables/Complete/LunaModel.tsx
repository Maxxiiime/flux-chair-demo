import { useGLTF } from '@react-three/drei'

export function LunaModel() {
  const { nodes, materials } = useGLTF('/model/Tables/Luna-model-1-180_micro-cement_TOP.glb') as any;
  return (
    <group dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['Luna-model-1-180_micro-cement_TOP'].geometry}
        material={materials.top}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['Luna-model-1-180_micro-cement_TOP001'].geometry}
        material={materials.top}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['Luna-model-1-180_micro-cement_TOP002'].geometry}
        material={materials.top}
      />
    </group>
  )
}

useGLTF.preload('/model/Tables/Luna-model-1-180_micro-cement_TOP.glb')

