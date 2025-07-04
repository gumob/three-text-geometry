import * as THREE from 'three';

/**
 * The interface for the parameters of the MultiPageShaderMaterial.
 *
 * @interface IMultipageShaderOption
 */
export interface IMultipageShaderOption {
  /**
   * The opacity of the material.
   *
   * @default 1
   */
  opacity?: number;
  /**
   * The transparency of the material.
   *
   * @default false
   */
  transparent?: boolean;
  /**
   * The precision of the material.
   *
   * @default 'highp'
   */
  precision?: number;
  /**
   * The alpha test of the material.
   *
   * @default 0.0001
   */
  alphaTest?: number;
  /**
   * The textures of the material.
   *
   * @default []
   */
  textures?: THREE.Texture[];
  /**
   * The color of the material.
   *
   * @default new THREE.Color(0xffffff)
   */
  color?: THREE.Color;
}

/**
 * The class for the parameters of the MultiPageShaderMaterial.
 *
 * @class MultiPageShaderMaterialParameters
 */
export class MultiPageShaderMaterialParameters implements THREE.ShaderMaterialParameters {
  uniforms?: { [uniform: string]: THREE.IUniform };
  vertexShader?: string;
  fragmentShader?: string;
  linewidth?: number;
  wireframe?: boolean;
  wireframeLinewidth?: number;
  lights?: boolean;
  clipping?: boolean;
  extensions?:
    | {
        derivatives?: boolean;
        fragDepth?: boolean;
        drawBuffers?: boolean;
        shaderTextureLOD?: boolean;
        clipCullDistance?: boolean; // Added
        multiDraw?: boolean; // Added
      }
    | undefined;
  glslVersion?: THREE.GLSLVersion;

  /**
   * Creates an instance of MultiPageShaderMaterialParameters.
   *
   * @param {IMultipageShaderOption} param - The parameters for the shader material.
   * @memberof MultiPageShaderMaterialParameters
   */
  constructor(param: IMultipageShaderOption) {
    const opt = param || {};
    const opacity = typeof opt.opacity === 'number' ? opt.opacity : 1;
    const precision = opt.precision || 'highp';
    const alphaTest = typeof opt.alphaTest === 'number' ? opt.alphaTest : 0.0001;
    const textures = opt.textures || [];

    const baseUniforms: { [key: string]: { type: string; value: THREE.Texture } } = {};
    textures.forEach((tex: THREE.Texture, i: number) => {
      baseUniforms['texture' + i] = {
        type: 't',
        value: tex,
      };
    });

    const samplers = textures
      .map(function (tex, i) {
        return 'uniform sampler2D texture' + i + ';';
      })
      .join('\n');

    const body = textures
      .map(function (tex, i) {
        const cond = i === 0 ? 'if' : 'else if';
        return [
          cond + ' (vPage == ' + i + '.0) {',
          'sampleColor = texture2D(texture' + i + ', vUv);',
          '}',
        ].join('\n');
      })
      .join('\n');

    const color = opt.color;

    // remove to satisfy r73
    delete opt.textures;
    delete opt.color;
    delete opt.precision;
    delete opt.opacity;

    let attributes: { [key: string]: { [page: string]: { type: string; value: number } } } | undefined = {
      attributes: { page: { type: 'f', value: 0 } },
    };

    const threeVers = (parseInt(THREE.REVISION, 10) || 0) | 0;
    if (threeVers >= 72) {
      attributes = undefined;
    }
    const discard = alphaTest === 0 ? '' : `if (gl_FragColor.a < ${alphaTest}) discard;`;
    const variables = Object.assign(
      {
        uniforms: Object.assign({}, baseUniforms, {
          opacity: { type: 'f', value: opacity },
          color: { type: 'c', value: color },
        }),
        vertexShader: `
                attribute vec4 position;
                attribute vec2 uv;
                attribute float page;
                uniform mat4 projectionMatrix;
                uniform mat4 modelViewMatrix;
                varying vec2 vUv;
                varying float vPage;
                void main() {
                    vUv = uv;
                    vPage = page;
                    gl_Position = projectionMatrix * modelViewMatrix * position;
                }
                `,
        fragmentShader: `
                precision ${precision} float;
                uniform float opacity;
                uniform vec3 color;
                ${samplers}
                varying float vPage;
                varying vec2 vUv;
                void main() {
                    vec4 sampleColor = vec4(0.0);
                    ${body}
                    gl_FragColor = sampleColor * vec4(color, opacity);
                    ${discard}
                }
                `,
      },
      attributes,
      opt,
    ) as THREE.ShaderMaterialParameters;
    this.uniforms = variables.uniforms;
    this.vertexShader = variables.vertexShader;
    this.fragmentShader = variables.fragmentShader;
  }
}
