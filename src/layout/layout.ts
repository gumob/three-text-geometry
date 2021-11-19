
import xtend from 'xtend';
import { wordwrap } from '~/layout'
import { BMFont, BMFontChar, ComputeMetrics, DefaultTextLayoutOption, TextGlyph, TextLayoutAlign, TextLayoutOption, TextMetrics, WordWrapMode } from '~/types'

const X_HEIGHTS = ['x', 'e', 'a', 'o', 'n', 's', 'r', 'c', 'u', 'm', 'v', 'w', 'z'];
const M_WIDTHS = ['m', 'w'];
const CAP_HEIGHTS = ['H', 'I', 'N', 'E', 'F', 'K', 'L', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
const TAB_ID = '\t'.charCodeAt(0)
const SPACE_ID = ' '.charCodeAt(0)

class TextLayout {
    private _opt: TextLayoutOption;
    private _measure: ComputeMetrics;
    
    private _linesTotal = 0;
    private _fallbackSpaceGlyph: BMFontChar | null = null;
    private _fallbackTabGlyph: BMFontChar | null = null;

    private _glyphs: TextGlyph[];
    private _width = 0;
    private _height = 0;
    private _descender = 0;
    private _ascender = 0;
    private _xHeight = 0;
    private _baseline = 0;
    private _capHeight = 0;
    private _lineHeight = 0;

    public get glyphs(): TextGlyph[] { return this._glyphs; }
    public get width(): number { return this._width; }
    public get height(): number { return this._height; }
    public get descender(): number { return this._descender; }
    public get ascender(): number { return this._ascender; }
    public get xHeight(): number { return this._xHeight; }
    public get baseline(): number { return this._baseline; }
    public get capHeight(): number { return this._capHeight; }
    public get lineHeight(): number { return this._lineHeight; }

    constructor(option: TextLayoutOption) {
        this._opt = option;
        this._glyphs = [];
        this._measure = this.computeMetrics.bind(this);
        this.update(option)
    }

    public update(option: TextLayoutOption) {
        // let opt: TextLayoutOption = DefaultTextLayoutOption();
        // if (typeof option === 'string') opt.text = option;
        // else opt = option;
        // if (!opt.font) throw new TypeError('must specify a { font } in options');
        // opt.text = typeof option === 'string' ? option : option.text;
        // opt.mode = (typeof opt.mode === typeof WordWrapMode) ? opt.mode : WordWrapMode.Pre;
        // opt.align = (typeof opt.align === typeof TextLayoutAlign) ? opt.align : TextLayoutAlign.Left;
        // opt.letterSpacing = (typeof opt.letterSpacing === 'number') ? opt.letterSpacing : 0;
        // opt.lineHeight = (typeof opt.lineHeight === 'number') ? opt.lineHeight : opt.font.common.lineHeight;
        // opt.tabSize = (typeof opt.tabSize === 'number') ? opt.tabSize : 4;
        // opt.start = (typeof opt.start === 'number') ? opt.start : 4;
        // opt.end = (typeof opt.end === 'number') ? opt.end : 0;
        // opt = xtend({ measure: this._measure }, opt);
        // this._opt = opt;

        const opt: TextLayoutOption = option;
        this._opt.font = opt.font ? opt.font : this._opt.font;
        if (!this._opt.font && !opt.font) throw new TypeError('must specify a `font` in options');
        const font: BMFont = this._opt.font!; 
        const text: string = this._opt.text = opt.text ? opt.text : this._opt.text || '';
        this._opt.mode = opt.mode ? opt.mode : this._opt.mode;
        this._opt.align = opt.align ? opt.align : this._opt.align;
        this._opt.letterSpacing = typeof opt.letterSpacing === 'number' ? opt.letterSpacing : this._opt.letterSpacing;
        this._opt.lineHeight = typeof opt.lineHeight === 'number' ? opt.lineHeight : (typeof this._opt.lineHeight === 'number' ? this._opt.lineHeight : this._opt.font!.common.lineHeight);
        this._opt.tabSize = (typeof opt.tabSize === 'number') ? opt.tabSize : this._opt.tabSize;
        this._opt.start = (typeof opt.start === 'number') ? opt.start : this._opt.start;
        this._opt.end = (typeof opt.end === 'number') ? opt.end : this._opt.end;
        this._opt.measure = opt.measure ? opt.measure : this._opt.measure;
        // this._opt = xtend({ measure: this._measure }, opt);

        this._setupSpaceGlyphs(font)

        const lines = wordwrap(text, this._opt);
        // const lines: string[] = wrap(text, { width: opt.width, newline: '\n' }).split('\n');
        const minWidth = this._opt.width || 0

        /** clear _glyphs */
        this._glyphs.length = 0

        /** get max line width */
        const maxLineWidth = lines.reduce((prev: number, line: TextMetrics) => {
            return Math.max(prev, line.width, minWidth)
        }, 0);

        /** the pen position */
        let x = 0
        let y = 0
        const lineHeight = this.asNumber(this._opt.lineHeight, font.common.lineHeight)
        const baseline = font.common.base
        const descender = lineHeight - baseline
        const letterSpacing = this._opt.letterSpacing || 0
        const height = lineHeight * lines.length - descender
        const align = this._opt.align;

        /** draw text along baseline */
        y -= height

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
        // const wthis = new WeakRef(this);
        lines.forEach((line: TextMetrics, lineIndex: number) => {
            const start = line.start;
            const end = line.end;
            const lineWidth = line.width;
            let lastGlyph = undefined;
            /** for each glyph in that line... */
            for (let i = start; i < end; i++) {
                const id = text.charCodeAt(i)
                // const glyph = wthis.deref()?.getGlyph(font, id);
                const glyph = this.getGlyph(font, id);
                if (glyph) {
                    if (lastGlyph)
                        x += this.getKerning(font, lastGlyph.id, glyph.id)

                    let tx = x
                    if (align === TextLayoutAlign.Center)
                        tx += (maxLineWidth - lineWidth) / 2
                    else if (align === TextLayoutAlign.Right)
                        tx += (maxLineWidth - lineWidth)

                    this._glyphs.push({
                        position: [tx, y],
                        data: glyph,
                        index: i,
                        line: lineIndex
                    })

                    /** move pen forward */
                    x += glyph.xadvance + letterSpacing
                    lastGlyph = glyph
                }
            }

            /** next line DOWN */
            y += lineHeight
            x = 0
        })
        this._linesTotal = lines.length;
    }

    asNumber(num: number | undefined, def = 0) {
        return typeof num === 'number' ? num : def;
    }

    private _setupSpaceGlyphs(font: BMFont) {
        /** These are fallbacks, when the font doesn't include */
        /** ' ' or '\t' _glyphs */
        this._fallbackSpaceGlyph = null
        this._fallbackTabGlyph = null

        if (!font.chars || font.chars.length === 0)
            return

        /** try to get space glyph */
        /** then fall back to the 'm' or 'w' _glyphs */
        /** then fall back to the first glyph available */
        const space = this.getGlyphById(font, SPACE_ID)
            || this.getMGlyph(font)
            || font.chars[0];
        if (!space) return;
        /** and create a fallback for tab */
        const tabSize: number = this._opt.tabSize || 4;
        const tabWidth: number = tabSize * space.xadvance;
        this._fallbackSpaceGlyph = space;
        this._fallbackTabGlyph = xtend(space, {
            x: 0, y: 0, xadvance: tabWidth, id: TAB_ID,
            xoffset: 0, yoffset: 0, width: 0, height: 0
        })
    }

    private getGlyph(font: BMFont, id: number): BMFontChar | null {
        const glyph = this.getGlyphById(font, id)
        if (glyph)
            return glyph
        else if (id === TAB_ID)
            return this._fallbackTabGlyph
        else if (id === SPACE_ID)
            return this._fallbackSpaceGlyph
        return null
    }

    private computeMetrics(text: string, start: number, end: number, width: number): TextMetrics {
        const letterSpacing = this._opt.letterSpacing || 0
        const font = this._opt.font;
        let curPen = 0;
        let curWidth = 0;
        let count = 0;
        // var glyph: BMFontChar | null;
        let lastGlyph;

        if (!font || !font.chars || font.chars.length === 0) {
            return {
                start: start,
                end: start,
                width: 0
            }
        }

        end = Math.min(text.length, end);
        for (let i = start; i < end; i++) {
            const id = text.charCodeAt(i);
            const glyph: BMFontChar | null = this.getGlyph(font, id);

            if (glyph) {
                /** move pen forward */
                // const xoff = glyph.xoffset;
                const kern = lastGlyph ? this.getKerning(font, lastGlyph.id, glyph.id) : 0;
                curPen += kern

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
            width: curWidth
        }
    }

    private getGlyphById(font: BMFont, id: number): BMFontChar | undefined {
        if (!font.chars || font.chars.length === 0) return undefined;
        const glyphIdx = this.findChar(font.chars, id)
        if (glyphIdx >= 0) return font.chars[glyphIdx];
        return undefined;
    }

    private getXHeight(font: BMFont): number {
        for (let i = 0; i < X_HEIGHTS.length; i++) {
            const id = X_HEIGHTS[i]!.charCodeAt(0);
            const idx = this.findChar(font.chars, id);
            if (idx >= 0) return font.chars[idx]!.height;
        }
        return 0
    }

    private getMGlyph(font: BMFont): BMFontChar | null {
        for (let i = 0; i < M_WIDTHS.length; i++) {
            const id = M_WIDTHS[i]!.charCodeAt(0);
            const idx = this.findChar(font.chars, id);
            if (idx >= 0) return font.chars[idx]!;
        }
        return null
    }

    private getCapHeight(font: BMFont): number {
        for (let i = 0; i < CAP_HEIGHTS.length; i++) {
            const id = CAP_HEIGHTS[i]!.charCodeAt(0);
            const idx = this.findChar(font.chars, id);
            if (idx >= 0) return font.chars[idx]!.height;
        }
        return 0
    }

    private getKerning(font: BMFont, left: number, right: number): number {
        if (!font.kernings || font.kernings.length === 0) return 0
        const table = font.kernings;
        for (let i = 0; i < table.length; i++) {
            const kern = table[i]!;
            if (kern.first === left && kern.second === right) return kern.amount;
        }
        return 0
    }

    private getAlignType(align: TextLayoutAlign): TextLayoutAlign {
        if (align === 'center') return TextLayoutAlign.Center;
        else if (align === 'right') return TextLayoutAlign.Right;
        return TextLayoutAlign.Left;
    }

    private findChar(array: BMFontChar[], value: number, start: number | undefined = undefined): number {
        start = start || 0;
        for (let i = start; i < array.length; i++) {
            if (array[i]!.id === value) {
                return i;
            }
        }
        return -1
    }

}

export { TextLayout }

