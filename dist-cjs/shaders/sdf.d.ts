import * as THREE from 'three';
interface SDFShaderOption {
    opacity?: number;
    alphaTest?: number;
    precision?: string;
    color?: THREE.Color;
    map?: THREE.Texture;
}
declare function createSDFShader(opt: SDFShaderOption): THREE.ShaderMaterialParameters;
export { createSDFShader };
//# sourceMappingURL=sdf.d.ts.map