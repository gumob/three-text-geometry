"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMultipageShader = void 0;
const tslib_1 = require("tslib");
const THREE = (0, tslib_1.__importStar)(require("three"));
function createMultipageShader(opt) {
    opt = opt || {};
    const opacity = opt.opacity !== undefined ? opt.opacity : 1;
    const precision = opt.precision || 'highp';
    const alphaTest = opt.alphaTest !== undefined ? opt.alphaTest : 0.0001;
    let textures = opt.textures || [];
    textures = Array.isArray(textures) ? textures : [textures];
    const baseUniforms = {};
    textures.forEach((tex, i) => {
        baseUniforms[`texture${i}`] = { type: 't', value: tex };
    });
    const samplers = textures
        .map(function (_tex, i) {
        return `uniform sampler2D texture${i};`;
    })
        .join('\n');
    const body = textures
        .map(function (_tex, i) {
        const cond = i === 0 ? 'if' : 'else if';
        return [`${cond} (vPage == ${i}.0) {`, `sampleColor = texture2D(texture${i}, vUv);`, '}'].join('\n');
    })
        .join('\n');
    const color = opt.color || new THREE.Color();
    /** remove to satisfy r73 */
    delete opt.textures;
    delete opt.color;
    delete opt.precision;
    delete opt.opacity;
    let attributes = {
        attributes: {
            page: {
                type: 'f',
                value: 0,
            },
        },
    };
    const threeVers = (parseInt(THREE.REVISION, 10) || 0) | 0;
    if (threeVers >= 72) {
        attributes = undefined;
    }
    return Object.assign({
        uniforms: Object.assign({}, baseUniforms, {
            opacity: { type: 'f', value: opacity },
            color: { type: 'c', value: color },
        }),
        vertexShader: [
            'attribute vec4 position;',
            'attribute vec2 uv;',
            'attribute float page;',
            'uniform mat4 projectionMatrix;',
            'uniform mat4 modelViewMatrix;',
            'varying vec2 vUv;',
            'varying float vPage;',
            'void main() {',
            'vUv = uv;',
            'vPage = page;',
            'gl_Position = projectionMatrix * modelViewMatrix * position;',
            '}',
        ].join('\n'),
        fragmentShader: [
            `precision ${precision} float;`,
            'uniform float opacity;',
            'uniform vec3 color;',
            samplers,
            'varying float vPage;',
            'varying vec2 vUv;',
            'void main() {',
            'vec4 sampleColor = vec4(0.0);',
            body,
            'gl_FragColor = sampleColor * vec4(color, opacity);',
            alphaTest === 0 ? '' : `  if (gl_FragColor.a < ${alphaTest}) discard;`,
            '}',
        ].join('\n'),
    }, attributes, opt);
}
exports.createMultipageShader = createMultipageShader;
//# sourceMappingURL=multipage.js.map