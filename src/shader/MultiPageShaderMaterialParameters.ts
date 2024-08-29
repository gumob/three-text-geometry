import * as THREE from 'three'

export interface IMultipageShaderOption {
  opacity?: number
  transparent?: boolean
  precision?: number
  alphaTest?: number
  textures?: THREE.Texture[]
  color?: THREE.Color
}

export class MultiPageShaderMaterialParameters implements THREE.ShaderMaterialParameters {
  uniforms?: { [uniform: string]: THREE.IUniform } | undefined
  vertexShader?: string | undefined
  fragmentShader?: string | undefined
  linewidth?: number | undefined
  wireframe?: boolean | undefined
  wireframeLinewidth?: number | undefined
  lights?: boolean | undefined
  clipping?: boolean | undefined
  extensions?: {
    derivatives?: boolean | undefined
    fragDepth?: boolean | undefined
    drawBuffers?: boolean | undefined
    shaderTextureLOD?: boolean | undefined
    clipCullDistance?: boolean | undefined // Added
    multiDraw?: boolean | undefined // Added
  } | undefined
  glslVersion?: THREE.GLSLVersion | undefined

  constructor(param: IMultipageShaderOption) {
    const opt = param || {}
    const opacity = typeof opt.opacity === 'number' ? opt.opacity : 1
    const precision = opt.precision || 'highp'
    const alphaTest = typeof opt.alphaTest === 'number' ? opt.alphaTest : 0.0001
    const textures = opt.textures || []

    const baseUniforms: { [key: string]: { type: string; value: THREE.Texture } } = {}
    textures.forEach((tex: THREE.Texture, i: number) => {
      baseUniforms['texture' + i] = {
        type: 't',
        value: tex,
      }
    })

    const samplers = textures
      .map(function (tex, i) {
        return 'uniform sampler2D texture' + i + ';'
      })
      .join('\n')

    const body = textures
      .map(function (tex, i) {
        const cond = i === 0 ? 'if' : 'else if'
        return [
          cond + ' (vPage == ' + i + '.0) {',
          'sampleColor = texture2D(texture' + i + ', vUv);',
          '}',
        ].join('\n')
      })
      .join('\n')

    const color = opt.color

    // remove to satisfy r73
    delete opt.textures
    delete opt.color
    delete opt.precision
    delete opt.opacity

    let attributes: { [key: string]: { [page: string]: { type: string; value: number } } } | undefined = {
      attributes: { page: { type: 'f', value: 0 } },
    }

    const threeVers = (parseInt(THREE.REVISION, 10) || 0) | 0
    if (threeVers >= 72) {
      attributes = undefined
    }
    const discard = alphaTest === 0 ? '' : `if (gl_FragColor.a < ${alphaTest}) discard;`
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
      opt
    ) as THREE.ShaderMaterialParameters
    this.uniforms = variables.uniforms
    this.vertexShader = variables.vertexShader
    this.fragmentShader = variables.fragmentShader
  }
}
