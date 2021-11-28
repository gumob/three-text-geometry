import * as THREE from 'three';
import { TextGeometryOption, TextGlyph } from "./types";
declare class TextGeometry extends THREE.BufferGeometry {
    private _opt;
    private _visibleGlyphs;
    get option(): TextGeometryOption;
    get visibleGlyphs(): TextGlyph[];
    constructor(text: string, option?: any);
    update(text: string, option?: any): void;
    computeBoundingSphere(): void;
    computeBoundingBox(): void;
}
export default TextGeometry;
//# sourceMappingURL=TextGeometry.d.ts.map