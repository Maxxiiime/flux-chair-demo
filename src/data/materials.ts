export interface MaterialDef {
    name: string;
    type: 'chair' | 'leg' | 'table';
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
        color?: string | null;
    };
}

export const CATALOGUE_MATERIAUX: Record<string, MaterialDef> = {
    green55: {
        name: 'Green 55',
        type: 'chair',
        sheen: 1.0,
        sheenColor: '#b1c176',
        sheenRoughness: 0.5,
        roughness: 0.9,
        metalness: 0,
        textures: {
            map: '/textures/TEXTAFOAM/GREEN_55/TEXTAFOAM_0242_BOARD-GREEN-55_COL_4K.jpg',
            aoMap: '/textures/TEXTAFOAM/GREEN_55/TEXTAFOAM_0242_BOARD-GREEN-55_AO_4K.jpg',
            normalMap: '/textures/TEXTAFOAM/GREEN_55/TEXTAFOAM_0242_BOARD-GREEN-55_NRM_4K.jpg',
            roughnessMap: '/textures/TEXTAFOAM/GREEN_55/TEXTAFOAM_0242_BOARD-GREEN-55_ROUGH_4K.jpg',
        },
    },
    natural01: {
        name: 'Natural 01',
        type: 'chair',
        sheen: 0.6,
        sheenColor: '#ffffff',
        sheenRoughness: 0.2,
        textures: {
            map: '/textures/TEXTAFOAM/NATURAL_01/TEXTAFOAM_0261_BOARD-NATURAL-01_COL_4K.jpg',
            aoMap: '/textures/TEXTAFOAM/NATURAL_01/TEXTAFOAM_0261_BOARD-NATURAL-01_AO_4K.jpg',
            normalMap: '/textures/TEXTAFOAM/NATURAL_01/TEXTAFOAM_0261_BOARD-NATURAL-01_NRM_4K.jpg',
            roughnessMap: '/textures/TEXTAFOAM/NATURAL_01/TEXTAFOAM_0261_BOARD-NATURAL-01_ROUGH_4K.jpg',
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
            map: '/textures/TEXTAFOAM/RED-35/TEXTAFOAM_0275_BOARD-RED-35_COL_4K.jpg',
            aoMap: '/textures/TEXTAFOAM/RED-35/TEXTAFOAM_0275_BOARD-RED-35_AO_4K.jpg',
            normalMap: '/textures/TEXTAFOAM/RED-35/TEXTAFOAM_0275_BOARD-RED-35_NRM_4K.jpg',
            roughnessMap: '/textures/TEXTAFOAM/RED-35/TEXTAFOAM_0275_BOARD-RED-35_ROUGH_4K.jpg',
        },
    },
    yellowPastel195: {
        name: 'Yellow Pastel 195',
        type: 'chair',
        sheen: 0.6,
        sheenColor: '#F3F28A',
        sheenRoughness: 0.5,
        textures: {
            map: '/textures/TEXTAFOAM/YELLOW_PASTEL_195/TEXTAFOAM_0247_BOARD-YELLOW-PASTEL-195_COL_4K.jpg',
            aoMap: '/textures/TEXTAFOAM/YELLOW_PASTEL_195/TEXTAFOAM_0247_BOARD-YELLOW-PASTEL-195_AO_4K.jpg',
            normalMap: '/textures/TEXTAFOAM/YELLOW_PASTEL_195/TEXTAFOAM_0247_BOARD-YELLOW-PASTEL-195_NRM_4K.jpg',
            roughnessMap: '/textures/TEXTAFOAM/YELLOW_PASTEL_195/TEXTAFOAM_0247_BOARD-YELLOW-PASTEL-195_ROUGH_4K.jpg',
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
    buffel: {
        name: 'Buffel',
        type: 'table',
        metalness: 0.0,
        roughness: 1.0,
        textures: {
            map: '/textures/mortex/color2.jpg',
            aoMap: null,
            normalMap: 'textures/Tables/micro_cement_normal.jpg',
            roughnessMap: null,
            color: '#A18A6D',
        },
    },
    carbon: {
        name: 'Carbon',
        type: 'table',
        metalness: 0.0,
        roughness: 1.0,
        textures: {
            map: '/textures/mortex/color2.jpg',
            aoMap: null,
            normalMap: 'textures/Tables/micro_cement_normal.jpg',
            roughnessMap: null,
            color: '#555555',
        },
    },
    concrete: {
        name: 'Concrete',
        type: 'table',
        metalness: 0.0,
        roughness: 1.0,
        textures: {
            map: '/textures/mortex/color2.jpg',
            aoMap: null,
            normalMap: 'textures/Tables/micro_cement_normal.jpg',
            roughnessMap: null,
            color: '#fffaf5',
        },
    },
    earth: {
        name: 'Earth',
        type: 'table',
        metalness: 0.0,
        roughness: 1.0,
        textures: {
            map: '/textures/mortex/color2.jpg',
            aoMap: null,
            normalMap: 'textures/Tables/micro_cement_normal.jpg',
            roughnessMap: null,
            color: '#383838',
        },
    },
    olive: {
        name: 'Olive',
        type: 'table',
        metalness: 0.0,
        roughness: 1.0,
        textures: {
            map: '/textures/mortex/color2.jpg',
            aoMap: null,
            normalMap: 'textures/Tables/micro_cement_normal.jpg',
            roughnessMap: null,
            color: '#807E5E',
        },
    },
    sand: {
        name: 'Sand',
        type: 'table',
        metalness: 0.0,
        roughness: 1.0,
        textures: {
            map: '/textures/mortex/color2.jpg',
            aoMap: null,
            normalMap: 'textures/Tables/micro_cement_normal.jpg',
            roughnessMap: null,
            color: '#cec3b7',
        },
    },
    sunflower: {
        name: 'Sunflower',
        type: 'table',
        metalness: 0.0,
        roughness: 1.0,
        textures: {
            map: '/textures/mortex/color2.jpg',
            aoMap: null,
            normalMap: 'textures/Tables/micro_cement_normal.jpg',
            roughnessMap: null,
            color: '#FFAC00',
        },
    },
    sunset: {
        name: 'Sunset',
        type: 'table',
        metalness: 0.0,
        roughness: 1.0,
        textures: {
            map: '/textures/mortex/color2.jpg',
            aoMap: null,
            normalMap: 'textures/Tables/micro_cement_normal.jpg',
            roughnessMap: null,
            color: '#B74600',
        },
    },
    bleek: {
        name: 'Bleek',
        type: 'table',
        metalness: 0.0,
        roughness: 1.0,
        textures: {
            map: '/textures/Table/Wood/color.jpg',
            aoMap: null,
            normalMap: '/textures/Table/Wood/normal.jpg',
            roughnessMap: null,
            color: '#89817b',
        },
    },
    donker: {
        name: 'Donker',
        type: 'table',
        metalness: 0.0,
        roughness: 1.0,
        textures: {
            map: '/textures/Table/Wood/color.jpg',
            aoMap: null,
            normalMap: '/textures/Table/Wood/normal.jpg',
            roughnessMap: null,
            color: '#807065'
        },
    },
    startdust: {
        name: 'Startdust',
        type: 'table',  
        metalness: 0.0,
        roughness: 1.0,
        textures: {
            map: '/textures/Table/Wood/color.jpg',
            aoMap: null,
            normalMap: '/textures/Table/Wood/normal.jpg',
            roughnessMap: null,
            color: '#55514f'
        },
    },

};

export default CATALOGUE_MATERIAUX;
