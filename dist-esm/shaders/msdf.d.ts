import * as THREE from 'three';
interface BSDFShaderOption {
    opacity?: number;
    alphaTest?: number;
    precision?: string;
    color?: THREE.Color;
    map?: THREE.Texture;
    negate?: boolean;
}
declare function createMSDFShader(opt: BSDFShaderOption): THREE.ShaderMaterialParameters;
export { createMSDFShader };
//# sourceMappingURL=msdf.d.ts.map