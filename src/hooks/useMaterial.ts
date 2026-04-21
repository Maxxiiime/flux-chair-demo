import { useMemo } from 'react';
import * as THREE from 'three';
import { CATALOGUE_MATERIAUX, MaterialDef } from '@/data/materials';
import { useAppStore } from '@/stores/appStore';

const textureLoader = new THREE.TextureLoader();
const textureCache = new Map<string, THREE.Texture>();

export interface ResolvedTextures {
    map: THREE.Texture | null;
    aoMap: THREE.Texture | null;
    normalMap: THREE.Texture | null;
    roughnessMap: THREE.Texture | null;
    metalnessMap: THREE.Texture | null;
}

export interface ResolvedMaterial {
    color?: string;
    textures?: ResolvedTextures;
    metalness?: number;
    roughness?: number;
    sheen?: number;
    sheenColor?: string;
    sheenRoughness?: number;
}

function loadTexture(url: string | null | undefined): THREE.Texture | null {
    if (!url) return null;
    if (textureCache.has(url)) return textureCache.get(url)!;
    const texture = textureLoader.load(url);
    texture.name = url;
    textureCache.set(url, texture);
    return texture;
}

function configureTexture(texture: THREE.Texture | null, isSRGB = false) {
    if (!texture) return;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.flipY = false;
    texture.repeat.set(4, 4);
    

    if (isSRGB) texture.colorSpace = THREE.SRGBColorSpace;

}

function resolveTextures(textures?: MaterialDef['textures']): ResolvedTextures | undefined {
    if (!textures) return undefined;
    return {
        map: loadTexture(textures.map),
        aoMap: loadTexture(textures.aoMap),
        normalMap: loadTexture(textures.normalMap),
        roughnessMap: loadTexture(textures.roughnessMap),
        metalnessMap: loadTexture(textures.metalnessMap),
    };
}

Object.values(CATALOGUE_MATERIAUX).forEach((material) => {
    if (!material.textures) return;
    configureTexture(loadTexture(material.textures.map), true);
    configureTexture(loadTexture(material.textures.aoMap));
    configureTexture(loadTexture(material.textures.normalMap));
    configureTexture(loadTexture(material.textures.roughnessMap));
    configureTexture(loadTexture(material.textures.metalnessMap));
    configureTexture(loadTexture(material.textures.displacementMap));
});

export function useMaterial(): ResolvedMaterial {
    const selectedMaterial = useAppStore((state) => state.selectedMaterial);

    return useMemo(() => {
        const materialData = CATALOGUE_MATERIAUX[selectedMaterial as keyof typeof CATALOGUE_MATERIAUX];
        if (!materialData) return {};

        return {
            color: materialData.color,
            textures: resolveTextures(materialData.textures),
            metalness: materialData.metalness,
            roughness: materialData.roughness,
            sheen: materialData.sheen,
            sheenColor: materialData.sheenColor,
            sheenRoughness: materialData.sheenRoughness,
        };
    }, [selectedMaterial]);
}

export function useLegMaterial(): ResolvedMaterial {
    const selectedLegMaterial = useAppStore((state) => state.selectedLegMaterial);

    return useMemo(() => {
        const materialData = CATALOGUE_MATERIAUX[selectedLegMaterial as keyof typeof CATALOGUE_MATERIAUX];

        return {
            color: materialData.color,
            textures: resolveTextures(materialData.textures),
            metalness: materialData.metalness,
            roughness: materialData.roughness,
            sheen: materialData.sheen,
            sheenColor: materialData.sheenColor,
            sheenRoughness: materialData.sheenRoughness,
        };
    }, [selectedLegMaterial]);
}
