
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import * as THREE from "three";
import { animate, type AnimationPlaybackControls } from "framer-motion";

interface MeshTransitionProps {
    componentId: string;
    componentsMap: Record<string, React.FC>;
    variant?: "chair" | "leg";
    duration?: number;
}

interface TransitionItem {
    id: string;
    Comp: React.FC | null;
    key: number;
}

const stopAll = (controls: AnimationPlaybackControls[]) => {
    controls.forEach((control) => control.stop());
};

const runChairExitAnimation = (
    group: THREE.Group,
    to: { x: number; y: number },
    phaseDuration: number,
): AnimationPlaybackControls[] => {
    group.position.set(0, 0, 0);

    const riseControl = animate(0, to.y, {
        duration: phaseDuration,
        ease: [0.22, 1, 0.36, 1],
        onUpdate: (latest) => {
            group.position.y = latest;
        },
    });

    const slideControl = animate(0, to.x, {
        duration: phaseDuration,
        delay: phaseDuration,
        ease: [0.22, 1, 0.36, 1],
        onUpdate: (latest) => {
            group.position.x = latest;
            group.position.y = to.y;
        },
    });

    return [riseControl, slideControl];
};

const runChairEnterAnimation = (
    group: THREE.Group,
    from: { x: number; y: number },
    phaseDuration: number,
): AnimationPlaybackControls[] => {
    group.position.set(from.x, from.y, 0);

    const arriveControl = animate(from.x, 0, {
        duration: phaseDuration,
        ease: [0.22, 1, 0.36, 1],
        onUpdate: (latest) => {
            group.position.x = latest;
            group.position.y = from.y;
        },
    });

    const descendControl = animate(from.y, 0, {
        duration: phaseDuration,
        delay: phaseDuration,
        ease: [0.22, 1, 0.36, 1],
        onUpdate: (latest) => {
            group.position.y = latest;
        },
    });

    return [arriveControl, descendControl];
};

const runGroupAnimation = (
    group: THREE.Group,
    from: { x: number; y: number },
    to: { x: number; y: number },
    duration: number,
): AnimationPlaybackControls[] => {
    group.position.set(from.x, from.y, 0);

    const xControl = animate(from.x, to.x, {
        duration,
        ease: [0.22, 1, 0.36, 1],
        onUpdate: (latest) => {
            group.position.x = latest;
        },
    });

    const yControl = animate(from.y, to.y, {
        duration,
        ease: [0.22, 1, 0.36, 1],
        onUpdate: (latest) => {
            group.position.y = latest;
        },
    });

    return [xControl, yControl];
};

const getOffsets = (variant: "chair" | "leg") => {
    if (variant === "chair") {
        return {
            enterFrom: { x: 1.3, y: 0.9 },
            exitTo: { x: -1.3, y: 0.9 },
        };
    }

    return {
        enterFrom: { x: 1.2, y: 0 },
        exitTo: { x: -1.2, y: 0 },
    };
};

export default function MeshTransition({
    componentId,
    componentsMap,
    variant = "chair",
    duration = 0.6,
}: MeshTransitionProps) {
    const Component = componentsMap[componentId] || null;
    const [transitions, setTransitions] = useState<TransitionItem[]>([
        { id: componentId, Comp: Component, key: 0 },
    ]);
    const refs = useRef<Record<number, THREE.Group | null>>({});

    useEffect(() => {
        setTransitions((prev) => {
            const last = prev[prev.length - 1];
            if (last.id === componentId) return prev;

            return [
                ...prev,
                {
                    id: componentId,
                    Comp: componentsMap[componentId] || null,
                    key: last.key + 1,
                },
            ];
        });
    }, [componentId, componentsMap]);

    useLayoutEffect(() => {
        if (transitions.length < 2) {
            const current = transitions[0];
            const currentGroup = refs.current[current.key];
            if (currentGroup) currentGroup.position.set(0, 0, 0);
            return;
        }

        const previous = transitions[transitions.length - 2];
        const current = transitions[transitions.length - 1];

        const previousGroup = refs.current[previous.key];
        const currentGroup = refs.current[current.key];

        if (!previousGroup && !currentGroup) return;

        const { enterFrom, exitTo } = getOffsets(variant);
        const controls: AnimationPlaybackControls[] = [];
        const totalDuration = variant === "chair" ? duration * 2 : duration;

        if (previousGroup) {
            if (variant === "chair") {
                controls.push(...runChairExitAnimation(previousGroup, exitTo, duration));
            } else {
                controls.push(
                    ...runGroupAnimation(
                        previousGroup,
                        { x: 0, y: 0 },
                        exitTo,
                        duration,
                    ),
                );
            }
        }

        if (currentGroup) {
            if (variant === "chair") {
                controls.push(...runChairEnterAnimation(currentGroup, enterFrom, duration));
            } else {
                controls.push(
                    ...runGroupAnimation(
                        currentGroup,
                        enterFrom,
                        { x: 0, y: 0 },
                        duration,
                    ),
                );
            }
        }

        const cleanupTimer = window.setTimeout(() => {
            setTransitions((prev) => prev.filter((item) => item.key === current.key));
        }, totalDuration * 1000);

        return () => {
            window.clearTimeout(cleanupTimer);
            stopAll(controls);
        };
    }, [duration, transitions, variant]);

    return (
        <group>
            {transitions.map(({ key, Comp }) => (
                <group key={key} ref={(el) => (refs.current[key] = el)}>
                    {Comp && <Comp />}
                </group>
            ))}
        </group>
    );
}