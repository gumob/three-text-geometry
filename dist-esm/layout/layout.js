import { WordWrap } from "./";
import { TextAlign } from "../types";
class TextLayout {
    constructor(text, option = {}) {
        this._opt = {
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
        // private _linesTotal = 0;
        this._fallbackSpaceGlyph = null;
        this._fallbackTabGlyph = null;
        if (option.font === undefined)
            throw new TypeError('Must specify a `font` in options');
        this._opt.font = option.font;
        this.update(text, option);
    }
    get option() {
        return { ...this._opt };
    }
    get glyphs() {
        var _a;
        return (_a = this._glyphs) !== null && _a !== void 0 ? _a : [];
    }
    get width() {
        var _a;
        return (_a = this._width) !== null && _a !== void 0 ? _a : 0;
    }
    get height() {
        var _a;
        return (_a = this._height) !== null && _a !== void 0 ? _a : 0;
    }
    get descender() {
        var _a;
        return (_a = this._descender) !== null && _a !== void 0 ? _a : 0;
    }
    get ascender() {
        var _a;
        return (_a = this._ascender) !== null && _a !== void 0 ? _a : 0;
    }
    get xHeight() {
        var _a;
        return (_a = this._xHeight) !== null && _a !== void 0 ? _a : 0;
    }
    get baseline() {
        var _a;
        return (_a = this._baseline) !== null && _a !== void 0 ? _a : 0;
    }
    get capHeight() {
        var _a;
        return (_a = this._capHeight) !== null && _a !== void 0 ? _a : 0;
    }
    get lineHeight() {
        var _a;
        return (_a = this._lineHeight) !== null && _a !== void 0 ? _a : 0;
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
    update(text, option = {}) {
        /** Initalize variables */
        this._glyphs = [];
        this._width = 0;
        this._height = 0;
        this._descender = 0;
        this._ascender = 0;
        this._xHeight = 0;
        this._baseline = 0;
        this._capHeight = 0;
        this._lineHeight = 0;
        /** Initalize options */
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
            this._opt.align = TextAlign.Left;
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
        const lines = new WordWrap().lines(text, this._opt);
        const minWidth = this._opt.width || 0;
        /** get max line width */
        const maxLineWidth = lines.reduce((prev, line) => {
            return Math.max(prev, line.width, minWidth);
        }, 0);
        /** the pen position */
        let x = 0;
        let y = 0;
        const lineHeight = this._opt.lineHeight;
        const baseline = font.common.base;
        const descender = lineHeight - baseline;
        const letterSpacing = this._opt.letterSpacing;
        const height = lineHeight * lines.length - descender;
        const align = this._opt.align;
        /** draw text along baseline */
        y -= height;
        /** the metrics for this text layout */
        this._width = maxLineWidth;
        this._height = height;
        this._descender = lineHeight - baseline;
        this._baseline = baseline;
        this._xHeight = this.getXHeight(font);
        this._capHeight = this.getCapHeight(font);
        this._lineHeight = lineHeight;
        this._ascender = lineHeight - descender - this._xHeight;
        /** layout each glyph */
        for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
            const line = lines[lineIndex];
            const start = line.start;
            const end = line.end;
            const lineWidth = line.width;
            let lastGlyph = undefined;
            /** for each glyph in that line... */
            for (let i = start; i < end; i++) {
                const id = text.charCodeAt(i);
                // const glyph = wthis.deref()?.getGlyph(font, id);
                const glyph = this.getGlyph(font, id);
                if (glyph) {
                    if (lastGlyph)
                        x += this.getKerning(font, lastGlyph.id, glyph.id);
                    let tx = x;
                    if (align === TextAlign.Center)
                        tx += (maxLineWidth - lineWidth) / 2;
                    else if (align === TextAlign.Right)
                        tx += maxLineWidth - lineWidth;
                    this._glyphs.push({
                        position: [tx, y],
                        data: glyph,
                        index: i,
                        line: lineIndex,
                    });
                    /** move pen forward */
                    x += glyph.xadvance + letterSpacing;
                    lastGlyph = glyph;
                }
            }
            /** next line DOWN */
            y += lineHeight;
            x = 0;
        }
    }
    _setupSpaceGlyphs(font, tabSize) {
        /** These are fallbacks, when the font doesn't include */
        /** ' ' or '\t' _glyphs */
        this._fallbackSpaceGlyph = null;
        this._fallbackTabGlyph = null;
        if (!font.chars || font.chars.length === 0)
            return;
        /** try to get space glyph */
        /** then fall back to the 'm' or 'w' _glyphs */
        /** then fall back to the first glyph available */
        const space = this.getGlyphById(font, TextLayout.SPACE_ID) || this.getMGlyph(font) || font.chars[0];
        if (!space)
            return;
        /** and create a fallback for tab */
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
                /** move pen forward */
                // const xoff = glyph.xoffset;
                const kern = lastGlyph ? this.getKerning(font, lastGlyph.id, glyph.id) : 0;
                curPen += kern;
                const nextPen = curPen + glyph.xadvance + letterSpacing;
                const nextWidth = curPen + glyph.width;
                /** we've hit our limit; we can't move onto the next glyph */
                if (nextWidth >= width || nextPen >= width)
                    break;
                /** otherwise continue along our line */
                curPen = nextPen;
                curWidth = nextWidth;
                lastGlyph = glyph;
            }
            count++;
        }
        /** make sure rightmost edge lines up with rendered _glyphs */
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
TextLayout.X_HEIGHTS = ['x', 'e', 'a', 'o', 'n', 's', 'r', 'c', 'u', 'm', 'v', 'w', 'z'];
TextLayout.M_WIDTHS = ['m', 'w'];
TextLayout.CAP_HEIGHTS = ['H', 'I', 'N', 'E', 'F', 'K', 'L', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
TextLayout.TAB_ID = '\t'.charCodeAt(0);
TextLayout.SPACE_ID = ' '.charCodeAt(0);
export { TextLayout };
//# sourceMappingURL=layout.js.map