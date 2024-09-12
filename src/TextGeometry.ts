import * as THREE from 'three';

import { TextLayout } from './layout';
import { TextAlign, TextGeometryOption, TextGlyph } from './types';
import { computeBox, computeSphere, createIndices, extractPages, extractPositions, extractUVs } from './utils';

/**
 * The class that generates THREE.BufferGeometry from BMFont data.
 *
 * ```typescript
 * import * as THREE from 'three'
 * import TextGeometry from 'three-text-geometry'
 *
 * const text: string = '.....text to layout.....'
 * const option: TextGeometryOption = {
 *    font: font, // BMFont data
 * }
 * const geometry = new TextGeometry(text, option)
 * const material = new THREE.MeshBasicMaterial({
 *    map: texture, // THREE.Texture data
 *    side: THREE.DoubleSide,
 *    transparent: true,
 *    color: 0x666666,
 * })
 * const mesh = new THREE.Mesh(geometry, material)
 * ```
 *
 * @class TextGeometry
 * @augments {THREE.BufferGeometry}
 * @alpha
 */
class TextGeometry extends THREE.BufferGeometry {
  /**
   * The options that conform to TextGeometryOption.
   *
   * @type {TextGeometryOption}
   * @access private
   * @memberof TextGeometry
   */
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
  };

  private _text: string = '';

  private _visibleGlyphs: TextGlyph[] = [];

  /**
   * The options conforming to the TextGeometryOption interface.
   *
   * @type {TextGeometryOption}
   * @memberof textGeometry
   */
  public get option(): TextGeometryOption {
    return { ...this._opt } as TextGeometryOption;
  }

  /**
   * Sets the options for the text geometry.
   *
   * @param {TextGeometryOption} value - The options for the text geometry.
   */
  public set option(value: TextGeometryOption) {
    this._opt = { ...value };
    this.update(this._text, value);
  }

  /**
   * The text to layout.
   *
   * @type {string}
   * @memberof TextGeometry
   */
  public get text(): string {
    return this._text;
  }

  /**
   * Sets the text to layout.
   *
   * @param {string} value - The text to layout.
   */
  public set text(value: string) {
    this._text = value;
    this.update(value, this._opt);
  }

  /**
   * The array to store TextGlyph objects.
   *
   * @type {TextGlyph[]}
   * @memberof TextGeometry
   * @readonly
   */
  public get visibleGlyphs(): TextGlyph[] {
    return this._visibleGlyphs;
  }

  /**
   * The constructor to create an instance of TextGeometry.
   *
   * @param {string} text         Text to layout.
   * @param {*}      [option={}]  An object conforming to `TextGeometryOption`.
   * @memberof TextGeometry
   */
  constructor(text: string, option: any = {}) {
    super();
    // if (option.font === undefined) throw new TypeError('Must specify a `font` in options');
    if (option.font === undefined) {
      console.debug('Must specify a `font` in options');
      return;
    }
    this._text = text;
    this._opt.font = option.font;
    this._opt.start = option.start !== undefined ? Math.max(0, option.start) : 0;
    this._opt.end = option.end !== undefined ? option.end : this._text.length;
    this._opt.width = option.width !== undefined ? option.width : undefined;
    this._opt.align = option.align !== undefined ? option.align : TextAlign.Left;
    this._opt.mode = option.mode !== undefined ? option.mode : undefined;
    this._opt.letterSpacing = option.letterSpacing !== undefined ? option.letterSpacing : 0;
    this._opt.lineHeight = option.lineHeight !== undefined ? option.lineHeight : this._opt.font!.common.lineHeight;
    this._opt.tabSize = option.tabSize !== undefined ? option.tabSize : 4;
    this._opt.flipY = option.flipY !== undefined ? option.flipY : true;
    this._opt.multipage = option.multipage !== undefined ? option.multipage : false;
    this.update(this._text, this._opt);
    // const box = new THREE.Vector3();
    // this.computeBoundingBox();
    // this.boundingBox?.getSize(box);
    // this.rotateY(Math.PI);
    // this.rotateZ(Math.PI);
    // this.translate(-box.x / 2, -box.y / 2, 0);
  }

  /**
   * The function to update the text.
   *
   * @param {string} text         Text to layout.
   * @param {*}      [option={}]  An object conforming to `TextGeometryOption`.
   * @memberof TextGeometry
   */
  public update(text?: string, option?: any) {
    if (text !== undefined) this._text = text;
    if (option !== undefined) {
      if (option.font !== undefined) this._opt.font = option.font;
      this._opt.start = option.start !== undefined ? Math.max(0, option.start) : 0;
      this._opt.end = option.end !== undefined ? option.end : this._text.length;
      this._opt.width = option.width !== undefined ? option.width : undefined;
      this._opt.align = option.align !== undefined ? option.align : this._opt.align;
      this._opt.mode = option.mode !== undefined ? option.mode : this._opt.mode;
      this._opt.letterSpacing = option.letterSpacing !== undefined ? option.letterSpacing : this._opt.letterSpacing;
      this._opt.lineHeight = option.lineHeight !== undefined ? option.lineHeight : this._opt.lineHeight;
      this._opt.tabSize = option.tabSize !== undefined ? option.tabSize : this._opt.tabSize;
      this._opt.flipY = option.flipY !== undefined ? option.flipY : this._opt.flipY;
      this._opt.multipage = option.multipage !== undefined ? option.multipage : this._opt.multipage;
    }
    if (this._opt.font === undefined) {
      console.debug('Must specify a `font` in options');
      return;
    }

    /** Determine texture size from font file */
    const texWidth = this._opt.font!.common.scaleW;
    const texHeight = this._opt.font!.common.scaleH;

    /** Get visible glyphs */
    const layout = new TextLayout(this._text, this._opt);
    const glyphs = layout.glyphs.filter((glyph) => {
      const bitmap = glyph.data;
      return bitmap.width * bitmap.height > 0;
    });

    /** Provide visible glyphs for convenience */
    this._visibleGlyphs = glyphs;

    /** Get common vertex data */
    const positions = extractPositions(glyphs);
    const uvs = extractUVs(glyphs, texWidth, texHeight, this._opt.flipY!);
    const indices = createIndices([], {
      clockwise: true,
      type: 'uint16',
      count: glyphs.length,
    });

    /** Update vertex data */
    this.setIndex(indices as number[]);
    this.setAttribute('position', new THREE.BufferAttribute(positions, 2));
    this.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));

    /** Update multipage data */
    if (!this._opt.multipage && 'page' in this.attributes) {
      /** Disable multipage rendering */
      this.deleteAttribute('page');
    } else if (this._opt.multipage) {
      /** Enable multipage rendering */
      this.setAttribute('page', new THREE.BufferAttribute(extractPages(glyphs), 1));
    }
  }

  /**
   * The function that computes the bounding sphere of the geometry.
   *
   * @memberof TextGeometry
   */
  public override computeBoundingSphere() {
    if (this.boundingSphere === null) this.boundingSphere = new THREE.Sphere();
    if (!this.attributes.position) return;
    this.attributes.position.needsUpdate = true;
    const positions = this.attributes.position.array;
    const itemSize = this.attributes.position.itemSize;
    if (!positions || !itemSize || positions.length < 2) {
      this.boundingSphere.radius = 0;
      this.boundingSphere.center.set(0, 0, 0);
      return;
    }
    computeSphere(positions, this.boundingSphere);
    if (isNaN(this.boundingSphere.radius)) {
      console.error('THREE.BufferGeometry.computeBoundingSphere(): ' + 'Computed radius is NaN. The ' + '"position" attribute is likely to have NaN values.');
    }
  }

  /**
   * The function that computes the bounding box of the geometry.
   *
   * @memberof TextGeometry
   */
  public override computeBoundingBox() {
    if (this.boundingBox === null) this.boundingBox = new THREE.Box3();
    const bbox = this.boundingBox;
    if (!this.attributes.position) return;
    this.attributes.position.needsUpdate = true;
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
