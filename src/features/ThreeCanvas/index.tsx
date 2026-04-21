import { Box } from "@chakra-ui/react";
import { Canvas } from "@react-three/fiber";
import Scene from "./components/Scene";
import { Perf } from "r3f-perf";
import * as THREE from "three";
const ThreeCanvas = () => {
    return (
        <Box w="100%" h="100%" zIndex={0} position="relative">
            <Canvas
                camera={{
                    fov: 45,
                    position: [-1, 0.5, 1.5],
                }}
                shadows="soft"
                gl={{
                    toneMapping: THREE.ACESFilmicToneMapping,
                    localClippingEnabled: true,
                }}

            >
                <color attach="background" args={["#F2F2F2"]} />
                <Scene />
                {import.meta.env.MODE === "dev" && <Perf position="top-left" overClock />}
            </Canvas>
        </Box>
    );
};

export default ThreeCanvas;
