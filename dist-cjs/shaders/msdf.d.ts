import * as THREE from 'three';
interface BSDFShaderOption {
    opacity?: number;
    alphaTest?: number;
    precision?: string;
    color?: THREE.Color;
    map?: THREE.Texture;
    negate?: boolean;
}
declare function createMSDFShader(opt: BSDFShaderOption): {
    uniforms: {
        opacity: {
            type: string;
            value: number;
        };
        map: {
            type: string;
            value: THREE.Texture;
        };
        color: {
            type: string;
            value: THREE.Color;
        };
    };
    vertexShader: string;
    fragmentShader: string;
} & BSDFShaderOption;
export { createMSDFShader };
//# sourceMappingURL=msdf.d.ts.map