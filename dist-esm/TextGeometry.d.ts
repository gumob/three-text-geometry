import * as THREE from 'three';
import { TextGeometryOption, TextGlyph } from "./types";
/**
 * The class that generates THREE.BufferGeometry from a BMFont data.
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
 *    map: texture, // THREE.Texture data side: THREE.DoubleSide,
 *    transparent: true,
 *    color: 0x666666,
 * )
 * const mesth = new THREE.Mesh(geometry, material)
 * ```
 *
 * @class TextGeometry
 * @augments {THREE.BufferGeometry}
 * @alpha
 */
declare class TextGeometry extends THREE.BufferGeometry {
    /**
     * The option that conforms to TextGeometryOption.
     *
     * @type {TextGeometryOption}
     * @access private
     * @memberof TextGeometry
     */
    private _opt;
    private _visibleGlyphs;
    /**
     * The option conforms to the TextGeometryOption interface.
     *
     * @type {TextGeometryOption}
     * @memberof TextGeometry
     * @readonly
     */
    get option(): TextGeometryOption;
    /**
     * The array to store TextGlyph objects.
     *
     * @type {TextGlyph[]}
     * @memberof TextGeometry
     * @readonly
     */
    get visibleGlyphs(): TextGlyph[];
    /**
     * The constructor to creates an instance of TextGeometry.
     *
     * @param {string} text         Text to layout.
     * @param {*}      [option={}]  An object comforms to `TextGeometryOption`.
     * @memberof TextGeometry
     */
    constructor(text: string, option?: any);
    /**
     * The function to update text.
     *
     * @param {string} text         Text to layout.
     * @param {*}      [option={}]  An object comforms to `TextGeometryOption`.
     * @memberof TextGeometry
     */
    update(text: string, option?: any): void;
    /**
     * The function that computes bounding box of the geometry.
     *
     * @memberof TextGeometry
     */
    computeBoundingSphere(): void;
    /**
     * The function that computes bounding sphere of the geometry.
     *
     * @memberof TextGeometry
     */
    computeBoundingBox(): void;
}
export default TextGeometry;
//# sourceMappingURL=TextGeometry.d.ts.map