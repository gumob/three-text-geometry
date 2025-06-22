import * as THREE from 'three';
import { TextGeometryOption, TextGlyph } from './types';
declare class TextGeometry extends THREE.BufferGeometry {
    private _opt;
    private _text;
    private _visibleGlyphs;
    get option(): TextGeometryOption;
    set option(value: TextGeometryOption);
    get text(): string;
    set text(value: string);
    get visibleGlyphs(): TextGlyph[];
    constructor(text: string, option?: TextGeometryOption);
    copy(source: TextGeometry): this;
    update(text?: string, option?: TextGeometryOption): void;
    computeBoundingSphere(): void;
    computeBoundingBox(): void;
}
export default TextGeometry;
//# sourceMappingURL=TextGeometry.d.ts.map