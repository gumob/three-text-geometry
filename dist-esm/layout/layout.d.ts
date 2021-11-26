import { TextGlyph, TextLayoutOption } from "../types";
declare class TextLayout {
    private _opt;
    private _fallbackSpaceGlyph;
    private _fallbackTabGlyph;
    private _glyphs?;
    private _width;
    private _height;
    private _descender;
    private _ascender;
    private _xHeight;
    private _baseline;
    private _capHeight;
    private _lineHeight;
    get option(): TextLayoutOption;
    get glyphs(): TextGlyph[];
    get width(): number;
    get height(): number;
    get descender(): number;
    get ascender(): number;
    get xHeight(): number;
    get baseline(): number;
    get capHeight(): number;
    get lineHeight(): number;
    toString(): string;
    constructor(text: string, option?: any);
    update(text: string, option?: any): void;
    private _setupSpaceGlyphs;
    private getGlyph;
    private computeMetrics;
    private getGlyphById;
    private getXHeight;
    private getMGlyph;
    private getCapHeight;
    private getKerning;
    private findChar;
}
export { TextLayout };
//# sourceMappingURL=layout.d.ts.map