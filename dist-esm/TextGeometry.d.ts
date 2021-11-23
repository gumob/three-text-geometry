import * as THREE from 'three';
import { TextLayout } from "./layout";
import { TextGeometryOption, TextGlyph } from "./types";
declare class TextGeometry extends THREE.BufferGeometry {
    private _opt;
    private _layout;
    private _visibleGlyphs;
    get option(): TextGeometryOption;
    get layout(): TextLayout | undefined;
    get visibleGlyphs(): TextGlyph[];
    constructor(text: string, option?: any);
    update(text: string, option?: any): void;
    computeBoundingSphere(): void;
    computeBoundingBox(): void;
}
export default TextGeometry;
//# sourceMappingURL=TextGeometry.d.ts.map