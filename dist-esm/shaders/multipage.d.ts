import * as THREE from 'three';
interface BSDFShaderOption {
    opacity?: number;
    alphaTest?: number;
    precision?: string;
    color?: THREE.Color;
    textures?: THREE.Texture[];
}
declare function createMultipageShader(opt: BSDFShaderOption): {
    uniforms: {
        [s: string]: {
            type: string;
            value: THREE.Texture;
        };
    } & {
        opacity: {
            type: string;
            value: number;
        };
        color: {
            type: string;
            value: THREE.Color;
        };
    };
    vertexShader: string;
    fragmentShader: string;
} & {
    attributes: {
        page: {
            type: string;
            value: number;
        };
    };
} & BSDFShaderOption;
export { createMultipageShader };
//# sourceMappingURL=multipage.d.ts.map