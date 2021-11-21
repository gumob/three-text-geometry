import * as THREE from 'three'

interface BasicShaderOption {
    opacity?: number
    alphaTest?: number
    precision?: string
    color?: THREE.Color
    map?: THREE.Texture
}

function createBasicShader(opt: BasicShaderOption) {
    opt = opt || {}
    const opacity: number = opt.opacity !== undefined ? opt.opacity : 1
    const alphaTest: number = opt.alphaTest !== undefined ? opt.alphaTest : 0.0001
    const precision: string = opt.precision || 'highp'
    const color: THREE.Color = opt.color || new THREE.Color()
    const map: THREE.Texture = opt.map || new THREE.Texture()

    /** remove to satisfy r73 */
    delete opt.map
    delete opt.color
    delete opt.precision
    delete opt.opacity

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
        },
        opt
    )
}

export { createBasicShader }
