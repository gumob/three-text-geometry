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
    } | undefined;
    vertexShader?: string | undefined;
    fragmentShader?: string | undefined;
    linewidth?: number | undefined;
    wireframe?: boolean | undefined;
    wireframeLinewidth?: number | undefined;
    lights?: boolean | undefined;
    clipping?: boolean | undefined;
    extensions?: {
        derivatives?: boolean | undefined;
        fragDepth?: boolean | undefined;
        drawBuffers?: boolean | undefined;
        shaderTextureLOD?: boolean | undefined;
    } | undefined;
    glslVersion?: THREE.GLSLVersion | undefined;
    constructor(param: IMultipageShaderOption);
}
//# sourceMappingURL=MultiPageShaderMaterialParameters.d.ts.map