import * as THREE from 'three';

/**
 * The interface for the options of the multi-page shader.
 *
 * @interface BSDFShaderOption
 */
interface BSDFShaderOption {
  opacity?: number;
  alphaTest?: number;
  precision?: string;
  color?: THREE.Color;
  map?: THREE.Texture;
  negate?: boolean;
}

/**
 * The function for creating a multi-page shader.
 *
 * @param {BSDFShaderOption} opt - The options for the shader.
 * @returns {THREE.ShaderMaterialParameters} The shader material parameters.
 */
function createMSDFShader(opt: BSDFShaderOption): THREE.ShaderMaterialParameters {
  opt = opt || {};
  const opacity = opt.opacity !== undefined ? opt.opacity : 1;
  const alphaTest = opt.alphaTest !== undefined ? opt.alphaTest : 0.0001;
  const precision = opt.precision || 'highp';
  const color = opt.color || new THREE.Color();
  const map = opt.map || new THREE.Texture();
  const negate = typeof opt.negate === 'boolean' ? opt.negate : true;

  /** remove to satisfy r73 */
  delete opt.map;
  delete opt.color;
  delete opt.precision;
  delete opt.opacity;
  delete opt.negate;

  return Object.assign(
    {
      uniforms: {
        opacity: { type: 'f', value: opacity },
        map: { type: 't', value: map },
        color: { type: 'c', value: color },
      },
      vertexShader: [
        'attribute vec2 uv;',
        'attribute vec4 position;',
        'uniform mat4 projectionMatrix;',
        'uniform mat4 modelViewMatrix;',
        'varying vec2 vUv;',
        'void main() {',
        'vUv = uv;',
        'gl_Position = projectionMatrix * modelViewMatrix * position;',
        '}',
      ].join('\n'),
      fragmentShader: [
        '#ifdef GL_OES_standard_derivatives',
        '#extension GL_OES_standard_derivatives : enable',
        '#endif',
        `precision ${precision} float;`,
        'uniform float opacity;',
        'uniform vec3 color;',
        'uniform sampler2D map;',
        'varying vec2 vUv;',

        'float median(float r, float g, float b) {',
        '  return max(min(r, g), min(max(r, g), b));',
        '}',

        'void main() {',
        `  vec3 sample = ${negate ? '1.0 - ' : ''} texture2D(map, vUv).rgb;`,
        '  float sigDist = median(sample.r, sample.g, sample.b) - 0.5;',
        '  float alpha = clamp(sigDist/fwidth(sigDist) + 0.5, 0.0, 1.0);',
        '  gl_FragColor = vec4(color.xyz, alpha * opacity);',
        alphaTest === 0 ? '' : `  if (gl_FragColor.a < ${alphaTest}) discard;`,
        '}',
      ].join('\n'),
    },
    opt,
  ) as THREE.ShaderMaterialParameters;
}

export { createMSDFShader };
