export interface MaterialDef {
    name: string;
    type: 'chair' | 'leg';
    color?: string;
    metalness?: number;
    roughness?: number;
    sheen?: number;
    sheenColor?: string;
    sheenRoughness?: number;
    textures?: {
        map: string | null;
        aoMap: string | null;
        normalMap: string | null;
        roughnessMap: string | null;
        metalnessMap: string | null;
        displacementMap: string | null;
    };
}

export const CATALOGUE_MATERIAUX: Record<string, MaterialDef> = {
    green55: {
        name: 'Green 55',
        type: 'chair',
        sheen: 0.6,
        sheenColor: '#ffffff',
        sheenRoughness: 0.2,
        roughness: 0.9,
        metalness: 0,
        textures: {
            map: '/textures/GREEN_55/TEXTAFOAM_0242_BOARD-GREEN-55_COL_4K.jpg',
            aoMap: '/textures/GREEN_55/TEXTAFOAM_0242_BOARD-GREEN-55_AO_4K.jpg',
            normalMap: '/textures/GREEN_55/TEXTAFOAM_0242_BOARD-GREEN-55_NRM_4K.jpg',
            roughnessMap: '/textures/GREEN_55/TEXTAFOAM_0242_BOARD-GREEN-55_ROUGH_4K.jpg',
            metalnessMap: '/textures/GREEN_55/TEXTAFOAM_0242_BOARD-GREEN-55_METAL_4K.jpg',
            displacementMap: '/textures/GREEN_55/TEXTAFOAM_0242_BOARD-GREEN-55_DISP_4K.jpg',
        },
    },
    natural01: {
        name: 'Natural 01',
        type: 'chair',
        sheen: 0.6,
        sheenColor: '#ffffff',
        sheenRoughness: 0.2,
        textures: {
            map: '/textures/NATURAL_01/TEXTAFOAM_0261_BOARD-NATURAL-01_COL_4K.jpg',
            aoMap: '/textures/NATURAL_01/TEXTAFOAM_0261_BOARD-NATURAL-01_AO_4K.jpg',
            normalMap: '/textures/NATURAL_01/TEXTAFOAM_0261_BOARD-NATURAL-01_NRM_4K.jpg',
            roughnessMap: '/textures/NATURAL_01/TEXTAFOAM_0261_BOARD-NATURAL-01_ROUGH_4K.jpg',
            metalnessMap: '/textures/NATURAL_01/TEXTAFOAM_0261_BOARD-NATURAL-01_METAL_4K.jpg',
            displacementMap: '/textures/NATURAL_01/TEXTAFOAM_0261_BOARD-NATURAL-01_DISP_4K.jpg',
        },
    },
    red35: {
        name: 'Red 35',
        type: 'chair',
        sheen: 0.6,
        sheenColor: '#5c0000',
        sheenRoughness: 0.2,
        roughness: 0.9,
        metalness: 0,
        textures: {
            map: '/textures/RED-35/TEXTAFOAM_0275_BOARD-RED-35_COL_4K.jpg',
            aoMap: '/textures/RED-35/TEXTAFOAM_0275_BOARD-RED-35_AO_4K.jpg',
            normalMap: '/textures/RED-35/TEXTAFOAM_0275_BOARD-RED-35_NRM_4K.jpg',
            roughnessMap: '/textures/RED-35/TEXTAFOAM_0275_BOARD-RED-35_ROUGH_4K.jpg',
            metalnessMap: '/textures/RED-35/TEXTAFOAM_0275_BOARD-RED-35_METAL_4K.jpg',
            displacementMap: '/textures/RED-35/TEXTAFOAM_0275_BOARD-RED-35_DISP_4K.jpg',
        },
    },
    yellowPastel195: {
        name: 'Yellow Pastel 195',
        type: 'chair',
        sheen: 0.6,
        sheenColor: '#ffffff',
        sheenRoughness: 0.2,
        textures: {
            map: '/textures/YELLOW_PASTEL_195/TEXTAFOAM_0247_BOARD-YELLOW-PASTEL-195_COL_4K.jpg',
            aoMap: '/textures/YELLOW_PASTEL_195/TEXTAFOAM_0247_BOARD-YELLOW-PASTEL-195_AO_4K.jpg',
            normalMap: '/textures/YELLOW_PASTEL_195/TEXTAFOAM_0247_BOARD-YELLOW-PASTEL-195_NRM_4K.jpg',
            roughnessMap: '/textures/YELLOW_PASTEL_195/TEXTAFOAM_0247_BOARD-YELLOW-PASTEL-195_ROUGH_4K.jpg',
            metalnessMap: '/textures/YELLOW_PASTEL_195/TEXTAFOAM_0247_BOARD-YELLOW-PASTEL-195_METAL_4K.jpg',
            displacementMap: '/textures/YELLOW_PASTEL_195/TEXTAFOAM_0247_BOARD-YELLOW-PASTEL-195_DISP_4K.jpg',
        },
    },
    black_wood: {
        name: 'Black Wood',
        type: 'leg',
        metalness: 0.0,
        roughness: 0.95,
        textures: {
            map: '/textures/WOOD/black.webp',
            aoMap: null,
            normalMap: null,
            roughnessMap: '/textures/WOOD/roughness.webp',
            metalnessMap: null,
            displacementMap: null,
        },
    },
    natural_wood: {
        name: 'Natural Wood',
        type: 'leg',
        metalness: 0.0,
        roughness: 0.95,
        textures: {
            map: '/textures/WOOD/natural.webp',
            aoMap: null,
            normalMap: null,
            roughnessMap: '/textures/WOOD/roughness.webp',
            metalnessMap: null,
            displacementMap: null,
        },
    },
    brown_wood: {
        name: 'Brown Wood',
        type: 'leg',
        metalness: 0.0,
        roughness: 1.0,
        textures: {
            map: '/textures/WOOD/brown.webp',
            aoMap: null,
            normalMap: null,
            roughnessMap: '/textures/WOOD/roughness.webp',
            metalnessMap: null,
            displacementMap: null,
        },
    },
    black_metal: {
        name: 'Black Metal',
        type: 'leg',
        color: '#1C1C1C',
        metalness: 0.85,
        roughness: 0.2,
    },
    beige_metal: {
        name: 'Beige Metal',
        type: 'leg',
        color: '#cac6b2',
        metalness: 0.4,
        roughness: 0.3,
    },
    brown_metal: {
        name: 'Brown Metal',
        type: 'leg',
        color: '#886f49',
        metalness: 0.6,
        roughness: 0.3,
    },
};

export default CATALOGUE_MATERIAUX;
