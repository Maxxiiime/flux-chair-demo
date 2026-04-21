import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import * as THREE from "three";
import { animate } from "framer-motion";

interface FadeTransitionProps {
    componentId: string;
    componentsMap: Record<string, React.FC>;
}

export const FadeTransition: React.FC<FadeTransitionProps> = ({
    componentId,
    componentsMap,
}) => {
    const Component = componentsMap[componentId];
    const [transitions, setTransitions] = useState<{ id: string; Comp: React.FC | null; key: number }[]>([
        { id: componentId, Comp: Component || null, key: 0 },
    ]);
    const refs = useRef<{ [key: number]: THREE.Group | null }>({});

    useEffect(() => {
        setTransitions((prev) => {
            const last = prev[prev.length - 1];
            if (last.id === componentId) return prev;
            const Comp = componentsMap[componentId] || null;
            return [...prev, { id: componentId, Comp, key: last.key + 1 }];
        });
    }, [componentId, componentsMap]);

    useLayoutEffect(() => {
        if (transitions.length > 1) {
            const prevTransition = transitions[transitions.length - 2];
            const currTransition = transitions[transitions.length - 1];

            const prevGroup = refs.current[prevTransition.key];
            const currGroup = refs.current[currTransition.key];

            const box = new THREE.Box3();
            if (prevGroup) box.expandByObject(prevGroup);
            if (currGroup) box.expandByObject(currGroup);

            const minY = box.min.y === Infinity ? -0.5 : box.min.y;
            const maxY = box.max.y === -Infinity ? 1.5 : box.max.y;

            // Initialization at minY ensures the object is completely clipped on the very first frame
            const newClipPlane = new THREE.Plane(new THREE.Vector3(0, -1, 0), minY);
            // The old object will be visible above the plane (it shrinks from bottom to top as currentY goes up)
            const oldClipPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -minY);

            const setClipping = (group: THREE.Group | null | undefined, plane: THREE.Plane, remove: boolean = false) => {
                if (!group) return;
                group.traverse((child) => {
                    if (child instanceof THREE.Mesh && child.material) {
                        const mat = child.material as THREE.Material;
                        if (remove) {
                            mat.clippingPlanes = null;
                        } else {
                            mat.clippingPlanes = [plane];
                            mat.clipShadows = true;
                        }
                        mat.needsUpdate = true;
                    }
                });
            };

            setClipping(currGroup, newClipPlane);
            setClipping(prevGroup, oldClipPlane);

            const controls = animate(0, 1, {
                duration: 0.6,
                onUpdate: (latest) => {
                    const currentY = minY + (maxY - minY) * latest;
                    newClipPlane.constant = currentY;
                    oldClipPlane.constant = -currentY;
                },
                onComplete: () => {
                    setClipping(currGroup, newClipPlane, true);
                    setClipping(prevGroup, oldClipPlane, true);
                    setTransitions((prev) => prev.filter((t) => t.key === currTransition.key));
                },
            });

            return () => {
                controls.stop();
                setClipping(currGroup, newClipPlane, true);
                setClipping(prevGroup, oldClipPlane, true);
            };
        } else if (transitions.length === 1) {
            const currGroup = refs.current[transitions[0].key];
            const setOpacity = (group: THREE.Group | null | undefined, opacity: number, transitionComplete: boolean = false) => {
                if (!group) return;
                group.traverse((child) => {
                    if (child instanceof THREE.Mesh && child.material) {
                        const mat = child.material as THREE.Material;
                        mat.opacity = opacity;
                        if (transitionComplete && opacity === 1) {
                            mat.transparent = false;
                            mat.needsUpdate = true;
                        }
                    }
                });
            };
            setOpacity(currGroup, 1, true);
        }
    }, [transitions]);

    return (
        <group>
            {transitions.map(({ key, Comp }) => (
                <group key={key} ref={(el) => (refs.current[key] = el)}>
                    {Comp && <Comp />}
                </group>
            ))}
        </group>
    );
};
