"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSDFShader = createSDFShader;
const tslib_1 = require("tslib");
const THREE = tslib_1.__importStar(require("three"));
function createSDFShader(opt) {
    opt = opt || {};
    const opacity = opt.opacity !== undefined ? opt.opacity : 1;
    const alphaTest = opt.alphaTest !== undefined ? opt.alphaTest : 0.0001;
    const precision = opt.precision || 'highp';
    const color = opt.color || new THREE.Color();
    const map = opt.map || new THREE.Texture();
    delete opt.map;
    delete opt.color;
    delete opt.precision;
    delete opt.opacity;
    return Object.assign({
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
            'float aastep(float value) {',
            '  #ifdef GL_OES_standard_derivatives',
            '    float afwidth = length(vec2(dFdx(value), dFdy(value))) * 0.70710678118654757;',
            '  #else',
            '    float afwidth = (1.0 / 32.0) * (1.4142135623730951 / (2.0 * gl_FragCoord.w));',
            '  #endif',
            '  return smoothstep(0.5 - afwidth, 0.5 + afwidth, value);',
            '}',
            'void main() {',
            '  vec4 texColor = texture2D(map, vUv);',
            '  float alpha = aastep(texColor.a);',
            '  gl_FragColor = vec4(color, opacity * alpha);',
            alphaTest === 0 ? '' : `  if (gl_FragColor.a < ${alphaTest}) discard;`,
            '}',
        ].join('\n'),
    }, opt);
}
//# sourceMappingURL=sdf.js.map