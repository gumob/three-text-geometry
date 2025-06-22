import * as THREE from 'three';
interface BSDFShaderOption {
    opacity?: number;
    alphaTest?: number;
    precision?: string;
    color?: THREE.Color;
    textures?: THREE.Texture[];
}
declare function createMultipageShader(opt: BSDFShaderOption): THREE.ShaderMaterialParameters;
export { createMultipageShader };
//# sourceMappingURL=multipage.d.ts.map