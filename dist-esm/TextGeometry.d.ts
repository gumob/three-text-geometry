import * as THREE from 'three';
import { TextGeometryOption, TextGlyph } from "./types";
/**
 * The class that generates THREE.BufferGeometry from a BMFont data.
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
     * @privateRemarks
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