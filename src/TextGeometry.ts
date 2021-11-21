import * as THREE from 'three'
import { TextLayout } from '~/layout'
import { TextGeometryOption, TextGlyph, TextLayoutAlign } from '~/types'
import { computeBox, computeSphere, createIndices, extractPages, extractPositions, extractUVs } from '~/utils'

class TextGeometry extends THREE.BufferGeometry {
  private _opt: TextGeometryOption = {
    font: undefined,
    start: undefined,
    end: undefined,
    width: undefined,
    mode: undefined,
    align: undefined,
    letterSpacing: undefined,
    lineHeight: undefined,
    tabSize: undefined,
    flipY: true,
    multipage: false,
  }

  private _layout: TextLayout | undefined
  private _visibleGlyphs: TextGlyph[] = []

  public get layout(): TextLayout | undefined {
    return this._layout
  }
  public get visibleGlyphs(): TextGlyph[] {
    return this._visibleGlyphs
  }

  constructor(text: string, option: any = {}) {
    super()
    if (option.font === undefined) throw new TypeError('Must specify a `font` in options')
    this._opt.font = option.font
    this.update(text, option)
  }

  public update(text: string, option: any = {}) {
    if (option.font !== undefined) this._opt.font = option.font
    if (option.start !== undefined) this._opt.start = Math.max(0, option.start)
    else this._opt.start = 0
    if (option.end !== undefined) this._opt.end = option.end
    else this._opt.end = text.length
    if (option.width !== undefined) this._opt.width = option.width
    if (option.align !== undefined) this._opt.align = option.align
    else this._opt.align = TextLayoutAlign.Left
    if (option.mode !== undefined) this._opt.mode = option.mode
    if (option.letterSpacing !== undefined) this._opt.letterSpacing = option.letterSpacing
    else this._opt.letterSpacing = 0
    if (option.lineHeight !== undefined) this._opt.lineHeight = option.lineHeight
    else this._opt.lineHeight = this._opt.font!.common.lineHeight
    if (option.tabSize !== undefined) this._opt.tabSize = option.tabSize
    else this._opt.tabSize = 4
    if (option.flipY !== undefined) this._opt.flipY = option.flipY
    if (option.multipage !== undefined) this._opt.multipage = option.multipage

    this._layout = new TextLayout(text, this._opt)

    /** determine texture size from font file */
    const texWidth = this._opt.font!.common.scaleW
    const texHeight = this._opt.font!.common.scaleH

    /** get visible glyphs */
    const glyphs = this._layout.glyphs.filter(function (glyph) {
      const bitmap = glyph.data
      return bitmap.width * bitmap.height > 0
    })

    /** provide visible glyphs for convenience */
    this._visibleGlyphs = glyphs

    /** get common vertex data */
    const positions = extractPositions(glyphs)
    const uvs = extractUVs(glyphs, texWidth, texHeight, this._opt.flipY!)
    const indices = createIndices([], {
      clockwise: true,
      type: 'uint16',
      count: glyphs.length,
    })

    /** update vertex data */
    this.setIndex(indices as number[])
    this.setAttribute('position', new THREE.BufferAttribute(positions, 2))
    this.setAttribute('uv', new THREE.BufferAttribute(uvs, 2))

    /** update multipage data */
    if (!this._opt.multipage && 'page' in this.attributes) {
      this.deleteAttribute('page') /** disable multipage rendering */
    } else if (this._opt.multipage) {
      this.setAttribute(
        'page',
        new THREE.BufferAttribute(extractPages(glyphs), 1)
      ) /** enable multipage rendering */
    }
  }

  public override computeBoundingSphere() {
    if (this.boundingSphere === null) this.boundingSphere = new THREE.Sphere()
    if (!this.attributes.position) return
    const positions = this.attributes.position.array
    const itemSize = this.attributes.position.itemSize
    if (!positions || !itemSize || positions.length < 2) {
      this.boundingSphere.radius = 0
      this.boundingSphere.center.set(0, 0, 0)
      return
    }
    computeSphere(positions, this.boundingSphere)
    if (isNaN(this.boundingSphere.radius)) {
      console.error(
        'THREE.BufferGeometry.computeBoundingSphere(): ' +
        'Computed radius is NaN. The ' +
        '"position" attribute is likely to have NaN values.'
      )
    }
  }

  public override computeBoundingBox() {
    if (this.boundingBox === null) this.boundingBox = new THREE.Box3()
    const bbox = this.boundingBox
    if (!this.attributes.position) return
    const positions = this.attributes.position.array
    const itemSize = this.attributes.position.itemSize
    if (!positions || !itemSize || positions.length < 2) {
      bbox.makeEmpty()
      return
    }
    computeBox(positions, bbox)
  }
}

export default TextGeometry