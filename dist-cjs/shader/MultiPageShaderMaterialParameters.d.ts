import * as THREE from 'three';
export interface IMultipageShaderOption {
    opacity?: number;
    transparent?: boolean;
    precision?: number;
    alphaTest?: number;
    textures?: THREE.Texture[];
    color?: THREE.Color;
}
export declare class MultiPageShaderMaterialParameters implements THREE.ShaderMaterialParameters {
    uniforms?: {
        [uniform: string]: THREE.IUniform;
    };
    vertexShader?: string;
    fragmentShader?: string;
    linewidth?: number;
    wireframe?: boolean;
    wireframeLinewidth?: number;
    lights?: boolean;
    clipping?: boolean;
    extensions?: {
        derivatives?: boolean;
        fragDepth?: boolean;
        drawBuffers?: boolean;
        shaderTextureLOD?: boolean;
        clipCullDistance?: boolean;
        multiDraw?: boolean;
    } | undefined;
    glslVersion?: THREE.GLSLVersion;
    constructor(param: IMultipageShaderOption);
}
//# sourceMappingURL=MultiPageShaderMaterialParameters.d.ts.map