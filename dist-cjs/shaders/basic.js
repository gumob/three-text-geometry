"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBasicShader = createBasicShader;
const tslib_1 = require("tslib");
const THREE = tslib_1.__importStar(require("three"));
function createBasicShader(opt) {
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
            `precision ${precision} float;`,
            'uniform float opacity;',
            'uniform vec3 color;',
            'uniform sampler2D map;',
            'varying vec2 vUv;',
            'void main() {',
            '  gl_FragColor = texture2D(map, vUv) * vec4(color, opacity);',
            alphaTest === 0 ? '' : `  if (gl_FragColor.a < ${alphaTest}) discard;`,
            '}',
        ].join('\n'),
    }, opt);
}
//# sourceMappingURL=basic.js.map