import * as THREE from 'three';
interface BasicShaderOption {
    opacity?: number;
    alphaTest?: number;
    precision?: string;
    color?: THREE.Color;
    map?: THREE.Texture;
}
declare function createBasicShader(opt: BasicShaderOption): THREE.ShaderMaterialParameters;
export { createBasicShader };
//# sourceMappingURL=basic.d.ts.map