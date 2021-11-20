import * as THREE from 'three'
import { TextLayout } from '~/layout'
import { TextGeometryOption, TextGlyph, TextLayoutAlign, WordWrapMode } from '~/types'
import { computeBox, computeSphere, createIndices, extractPages, extractPositions, extractUVs } from '~/utils'

class TextGeometry extends THREE.BufferGeometry {
  layout: TextLayout | undefined;
  _opt: TextGeometryOption = {
    flipY: false,
    multipage: false,
    font: undefined,
    letterSpacing: undefined,
    tabSize: undefined,
    lineHeight: undefined,
    align: undefined,
    start: undefined,
    end: undefined,
    width: undefined,
    mode: undefined,
    measure: undefined
  };
  visibleGlyphs: TextGlyph[] = [];

  constructor(text: string, option: any = {}) {
    super()
    if (option.font === undefined) throw new TypeError('must specify a `font` in options');
    this._opt.font = option.font;
    this.update(text, option);
  }

  public update(text: string, option: any = {}) {
    // let opt: TextGeometryOption = {};
    /** Validate Option */
    const opt: any = option;
    this._opt.font = opt.font ? opt.font : this._opt.font;
    this._opt.mode = opt.mode ? opt.mode : this._opt.mode;
    this._opt.align = opt.align ? opt.align : this._opt.align;
    this._opt.letterSpacing = typeof opt.letterSpacing === 'number' ? opt.letterSpacing : this._opt.letterSpacing;
    this._opt.lineHeight = typeof opt.lineHeight === 'number' ? opt.lineHeight : (typeof this._opt.lineHeight === 'number' ? this._opt.lineHeight : this._opt.font!.common.lineHeight);
    this._opt.tabSize = (typeof opt.tabSize === 'number') ? opt.tabSize : this._opt.tabSize;
    this._opt.start = (typeof opt.start === 'number') ? opt.start : this._opt.start;
    this._opt.end = (typeof opt.end === 'number') ? opt.end : this._opt.end;
    this._opt.flipY = (typeof opt.flipY === 'boolean') ? opt.flipY : this._opt.flipY;
    this._opt.multipage = (typeof opt.multipage === 'boolean') ? opt.multipage : this._opt.multipage;

    this.layout = new TextLayout(text, this._opt);

    /** determine texture size from font file */
    const texWidth = this._opt.font!.common.scaleW;
    const texHeight = this._opt.font!.common.scaleH;

    /** get visible glyphs */
    const glyphs = this.layout.glyphs.filter(function (glyph) {
      const bitmap = glyph.data
      return bitmap.width * bitmap.height > 0
    })

    /** provide visible glyphs for convenience */
    this.visibleGlyphs = glyphs

    /** get common vertex data */
    const positions = extractPositions(glyphs)
    const uvs = extractUVs(glyphs, texWidth, texHeight, this._opt.flipY!)
    const indices = createIndices([], {
      clockwise: true,
      type: 'uint16',
      count: glyphs.length
    })

    /** update vertex data */
    this.setIndex(indices as number[])
    this.setAttribute('position', new THREE.BufferAttribute(positions, 2))
    this.setAttribute('uv', new THREE.BufferAttribute(uvs, 2))

    /** update multipage data */
    if (!this._opt.multipage && 'page' in this.attributes) {
      this.deleteAttribute('page'); /** disable multipage rendering */
    } else if (this._opt.multipage) {
      this.setAttribute('page', new THREE.BufferAttribute(extractPages(glyphs), 1)); /** enable multipage rendering */
    }
  }

  public override computeBoundingSphere() {
    if (this.boundingSphere === null)
      this.boundingSphere = new THREE.Sphere();
    if (!this.attributes.position) return;
    const positions = this.attributes.position.array;
    const itemSize = this.attributes.position.itemSize;
    if (!positions || !itemSize || positions.length < 2) {
      this.boundingSphere.radius = 0;
      this.boundingSphere.center.set(0, 0, 0);
      return
    }
    computeSphere(positions, this.boundingSphere)
    if (isNaN(this.boundingSphere.radius)) {
      console.error('THREE.BufferGeometry.computeBoundingSphere(): ' +
        'Computed radius is NaN. The ' +
        '"position" attribute is likely to have NaN values.')
    }
  }

  public override computeBoundingBox() {
    if (this.boundingBox === null) this.boundingBox = new THREE.Box3();
    const bbox = this.boundingBox;
    if (!this.attributes.position) return;
    const positions = this.attributes.position.array;
    const itemSize = this.attributes.position.itemSize;
    if (!positions || !itemSize || positions.length < 2) {
      bbox.makeEmpty();
      return;
    }
    computeBox(positions, bbox);
  }
}

export default TextGeometry;