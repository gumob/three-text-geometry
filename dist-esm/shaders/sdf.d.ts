import * as THREE from 'three';
interface SDFShaderOption {
    opacity?: number;
    alphaTest?: number;
    precision?: string;
    color?: THREE.Color;
    map?: THREE.Texture;
}
declare function createSDFShader(opt: SDFShaderOption): {
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
} & SDFShaderOption;
export { createSDFShader };
//# sourceMappingURL=sdf.d.ts.map