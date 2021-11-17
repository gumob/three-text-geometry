import * as THREE from 'three'
import { TextLayout } from '~/layout'
import { TextGeometryOption, TextGlyph, TextLayoutAlign, WordWrapMode } from '~/types'
import { computeBox, computeSphere, createIndices, extractPages, extractPositions, extractUVs } from '~/utils'

class TextGeometry extends THREE.BufferGeometry {
  layout: TextLayout | undefined;
  _opt: TextGeometryOption | undefined;
  visibleGlyphs: TextGlyph[] = [];

  constructor(option: TextGeometryOption | string) {
    super()
    this.update(option);
  }

  public update(option: TextGeometryOption | string) {
    let opt: TextGeometryOption = {};
    if (typeof option === 'string') opt.text = option;
    else opt = option;
    if (!opt.font) throw new TypeError('must specify a { font } in options');
    opt.text = typeof option === 'string' ? option : option.text;
    opt.mode = (typeof opt.mode === typeof WordWrapMode) ? opt.mode : WordWrapMode.Pre;
    opt.align = (typeof opt.align === typeof TextLayoutAlign) ? opt.align : TextLayoutAlign.Left;
    opt.letterSpacing = (typeof opt.letterSpacing === 'number') ? opt.letterSpacing : 0;
    opt.lineHeight = (typeof opt.lineHeight === 'number') ? opt.lineHeight : opt.font.common.lineHeight;
    opt.tabSize = (typeof opt.tabSize === 'number') ? opt.tabSize : 4;
    opt.start = (typeof opt.start === 'number') ? opt.start : 4;
    opt.end = (typeof opt.end === 'number') ? opt.end : 0;
    opt.flipY = (typeof opt.flipY === 'boolean') ? opt.flipY : true;
    opt.multipage = (typeof opt.multipage === 'boolean') ? opt.multipage : false;

    this.layout = new TextLayout(opt);

    /** the desired BMFont data */
    const font = opt.font;

    /** determine texture size from font file */
    const texWidth = font.common.scaleW
    const texHeight = font.common.scaleH

    /** get visible glyphs */
    const glyphs = this.layout.glyphs.filter(function (glyph) {
      const bitmap = glyph.data
      return bitmap.width * bitmap.height > 0
    })

    /** provide visible glyphs for convenience */
    this.visibleGlyphs = glyphs

    /** get common vertex data */
    const positions = extractPositions(glyphs)
    const uvs = extractUVs(glyphs, texWidth, texHeight, opt.flipY)
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
    if (!opt.multipage && 'page' in this.attributes) {
      this.deleteAttribute('page'); /** disable multipage rendering */
    } else if (opt.multipage) {
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