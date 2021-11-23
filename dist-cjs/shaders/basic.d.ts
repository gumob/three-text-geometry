import * as THREE from 'three';
interface BasicShaderOption {
    opacity?: number;
    alphaTest?: number;
    precision?: string;
    color?: THREE.Color;
    map?: THREE.Texture;
}
declare function createBasicShader(opt: BasicShaderOption): {
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
} & BasicShaderOption;
export { createBasicShader };
//# sourceMappingURL=basic.d.ts.map