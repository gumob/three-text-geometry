import * as THREE from 'three';
export interface TextMaterialOption {
    opacity?: number;
    alphaTest?: number;
    color?: THREE.Color;
    map?: THREE.Texture;
    transparent?: boolean;
}
export interface MSDFTextMaterialOption extends TextMaterialOption {
    negate?: boolean;
}
export interface MultiPageTextMaterialOption {
    opacity?: number;
    alphaTest?: number;
    color?: THREE.Color;
    textures?: THREE.Texture[];
    transparent?: boolean;
}
//# sourceMappingURL=types.d.ts.map