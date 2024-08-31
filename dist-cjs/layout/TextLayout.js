"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextLayout = void 0;
const layout_1 = require("~/layout");
const types_1 = require("~/types");
class TextLayout {
    static X_HEIGHTS = ['x', 'e', 'a', 'o', 'n', 's', 'r', 'c', 'u', 'm', 'v', 'w', 'z'];
    static M_WIDTHS = ['m', 'w'];
    static CAP_HEIGHTS = ['H', 'I', 'N', 'E', 'F', 'K', 'L', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    static TAB_ID = '\t'.charCodeAt(0);
    static SPACE_ID = ' '.charCodeAt(0);
    _opt = {
        font: undefined,
        letterSpacing: undefined,
        tabSize: undefined,
        lineHeight: undefined,
        align: undefined,
        start: undefined,
        end: undefined,
        width: undefined,
        mode: undefined,
        measure: undefined,
    };
    _fallbackSpaceGlyph = null;
    _fallbackTabGlyph = null;
    _glyphs;
    _width;
    _height;
    _descender;
    _ascender;
    _xHeight;
    _baseline;
    _capHeight;
    _lineHeight;
    get option() {
        return { ...this._opt };
    }
    get glyphs() {
        return this._glyphs ?? [];
    }
    get width() {
        return this._width ?? 0;
    }
    get height() {
        return this._height ?? 0;
    }
    get descender() {
        return this._descender ?? 0;
    }
    get ascender() {
        return this._ascender ?? 0;
    }
    get xHeight() {
        return this._xHeight ?? 0;
    }
    get baseline() {
        return this._baseline ?? 0;
    }
    get capHeight() {
        return this._capHeight ?? 0;
    }
    get lineHeight() {
        return this._lineHeight ?? 0;
    }
    toString() {
        return `{
  glyphs: ${this.glyphs.length}
  width: ${this.width}
  height: ${this.height}
  descender: ${this.descender}
  ascender: ${this.ascender}
  xHeight: ${this.xHeight}
  baseline: ${this.baseline}
  capHeight: ${this.capHeight}
  lineHeight: ${this.lineHeight}
}`;
    }
    constructor(text, option = {}) {
        if (option.font === undefined)
            throw new TypeError('Must specify a `font` in options');
        this._opt.font = option.font;
        this.update(text, option);
    }
    update(text, option = {}) {
        this._glyphs = [];
        this._width = 0;
        this._height = 0;
        this._descender = 0;
        this._ascender = 0;
        this._xHeight = 0;
        this._baseline = 0;
        this._capHeight = 0;
        this._lineHeight = 0;
        if (option.font !== undefined)
            this._opt.font = option.font;
        if (option.start !== undefined)
            this._opt.start = Math.max(0, option.start);
        else
            this._opt.start = 0;
        if (option.end !== undefined)
            this._opt.end = option.end;
        else
            this._opt.end = text.length;
        if (option.width !== undefined)
            this._opt.width = option.width;
        if (option.align !== undefined)
            this._opt.align = option.align;
        else
            this._opt.align = types_1.TextAlign.Left;
        if (option.mode !== undefined)
            this._opt.mode = option.mode;
        if (option.letterSpacing !== undefined)
            this._opt.letterSpacing = option.letterSpacing;
        else
            this._opt.letterSpacing = 0;
        if (option.lineHeight !== undefined)
            this._opt.lineHeight = option.lineHeight;
        else
            this._opt.lineHeight = this._opt.font.common.lineHeight;
        if (option.tabSize !== undefined)
            this._opt.tabSize = option.tabSize;
        else
            this._opt.tabSize = 4;
        this._opt.measure = this.computeMetrics.bind(this);
        this._setupSpaceGlyphs(this._opt.font, this._opt.tabSize);
        const font = this._opt.font;
        const lines = new layout_1.WordWrap().lines(text, this._opt);
        const minWidth = this._opt.width || 0;
        const maxLineWidth = lines.reduce((prev, line) => {
            return Math.max(prev, line.width, minWidth);
        }, 0);
        let x = 0;
        let y = 0;
        const lineHeight = this._opt.lineHeight;
        const baseline = font.common.base;
        const descender = lineHeight - baseline;
        const letterSpacing = this._opt.letterSpacing;
        const height = lineHeight * lines.length - descender;
        const align = this._opt.align;
        this._width = maxLineWidth;
        this._height = height;
        this._descender = lineHeight - baseline;
        this._baseline = baseline;
        this._xHeight = this.getXHeight(font);
        this._capHeight = this.getCapHeight(font);
        this._lineHeight = lineHeight;
        this._ascender = lineHeight - descender - this._xHeight;
        for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
            const line = lines[lineIndex];
            const start = line.start;
            const end = line.end;
            const lineWidth = line.width;
            let lastGlyph = undefined;
            for (let i = start; i < end; i++) {
                const id = text.charCodeAt(i);
                const glyph = this.getGlyph(font, id);
                if (glyph) {
                    if (lastGlyph)
                        x += this.getKerning(font, lastGlyph.id, glyph.id);
                    let tx = x;
                    if (align === types_1.TextAlign.Center)
                        tx += (maxLineWidth - lineWidth) / 2;
                    else if (align === types_1.TextAlign.Right)
                        tx += maxLineWidth - lineWidth;
                    this._glyphs.push({
                        position: [tx, y],
                        data: glyph,
                        index: i,
                        line: lineIndex,
                    });
                    x += glyph.xadvance + letterSpacing;
                    lastGlyph = glyph;
                }
            }
            y += lineHeight;
            x = 0;
        }
    }
    _setupSpaceGlyphs(font, tabSize) {
        this._fallbackSpaceGlyph = null;
        this._fallbackTabGlyph = null;
        if (!font.chars || font.chars.length === 0)
            return;
        const space = this.getGlyphById(font, TextLayout.SPACE_ID) || this.getMGlyph(font) || font.chars[0];
        if (!space)
            return;
        const tabWidth = tabSize * space.xadvance;
        this._fallbackSpaceGlyph = { ...space };
        this._fallbackTabGlyph = Object.assign({ ...space }, {
            x: 0,
            y: 0,
            xadvance: tabWidth,
            id: TextLayout.TAB_ID,
            xoffset: 0,
            yoffset: 0,
            width: 0,
            height: 0,
        });
    }
    getGlyph(font, id) {
        const glyph = this.getGlyphById(font, id);
        if (glyph)
            return glyph;
        else if (id === TextLayout.TAB_ID)
            return this._fallbackTabGlyph;
        else if (id === TextLayout.SPACE_ID)
            return this._fallbackSpaceGlyph;
        return null;
    }
    computeMetrics(text, start, end, width) {
        const letterSpacing = this._opt.letterSpacing || 0;
        const font = this._opt.font;
        let curPen = 0;
        let curWidth = 0;
        let count = 0;
        if (!font || !font.chars || font.chars.length === 0) {
            return {
                start: start,
                end: start,
                width: 0,
            };
        }
        end = Math.min(text.length, end);
        let lastGlyph;
        for (let i = start; i < end; i++) {
            const id = text.charCodeAt(i);
            const glyph = this.getGlyph(font, id);
            if (glyph) {
                const kern = lastGlyph ? this.getKerning(font, lastGlyph.id, glyph.id) : 0;
                curPen += kern;
                const nextPen = curPen + glyph.xadvance + letterSpacing;
                const nextWidth = curPen + glyph.width;
                if (nextWidth >= width || nextPen >= width)
                    break;
                curPen = nextPen;
                curWidth = nextWidth;
                lastGlyph = glyph;
            }
            count++;
        }
        if (lastGlyph)
            curWidth += lastGlyph.xoffset;
        return {
            start: start,
            end: start + count,
            width: curWidth,
        };
    }
    getGlyphById(font, id) {
        if (!font.chars || font.chars.length === 0)
            return undefined;
        const glyphIdx = this.findChar(font.chars, id);
        if (glyphIdx >= 0)
            return font.chars[glyphIdx];
        return undefined;
    }
    getXHeight(font) {
        for (let i = 0; i < TextLayout.X_HEIGHTS.length; i++) {
            const id = TextLayout.X_HEIGHTS[i].charCodeAt(0);
            const idx = this.findChar(font.chars, id);
            if (idx >= 0)
                return font.chars[idx].height;
        }
        return 0;
    }
    getMGlyph(font) {
        for (let i = 0; i < TextLayout.M_WIDTHS.length; i++) {
            const id = TextLayout.M_WIDTHS[i].charCodeAt(0);
            const idx = this.findChar(font.chars, id);
            if (idx >= 0)
                return font.chars[idx];
        }
        return undefined;
    }
    getCapHeight(font) {
        for (let i = 0; i < TextLayout.CAP_HEIGHTS.length; i++) {
            const id = TextLayout.CAP_HEIGHTS[i].charCodeAt(0);
            const idx = this.findChar(font.chars, id);
            if (idx >= 0)
                return font.chars[idx].height;
        }
        return 0;
    }
    getKerning(font, left, right) {
        if (!font.kernings || font.kernings.length === 0)
            return 0;
        const table = font.kernings;
        for (let i = 0; i < table.length; i++) {
            const kern = table[i];
            if (kern.first === left && kern.second === right)
                return kern.amount;
        }
        return 0;
    }
    findChar(array, value) {
        for (let i = 0; i < array.length; i++) {
            if (array[i].id === value)
                return i;
        }
        return -1;
    }
}
exports.TextLayout = TextLayout;
//# sourceMappingURL=TextLayout.js.map