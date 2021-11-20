/**
 * 
 * https://github.com/mattdesl/word-wrapper
 * 
 */
import { ComputeMetrics, WordMetrics, WordWrapMode, WordWrapOption } from '~/types'

const newline = /\n/
const newlineChar = '\n'
const whitespace = /\s/

function wrap(text: string, option: any = {}): string {
    return lines(text, option)
        .map((line: WordMetrics) => (text.substring(line.start, line.end)))
        .join('\n');
}

function lines(text: string, option: any = {}): WordMetrics[] {
    /** zero width results in nothing visible */
    const opt: WordWrapOption = {
        start: undefined, end: undefined, width: undefined,
        mode: undefined, measure: undefined
    };
    text = text || '';
    if (option.start !== undefined) opt.start = Math.max(0, option.start);
    else opt.start = 0;
    if (option.end !== undefined) opt.end = option.end;
    else opt.end = text.length;
    if (option.width !== undefined) opt.width = option.width;
    else opt.width = Number.MAX_VALUE;
    if (option.mode !== undefined) opt.mode = option.mode;
    opt.measure = option.measure || monospace;
    if (opt.width === 0 && opt.mode !== WordWrapMode.NoWrap) return [];

    if (option.mode === WordWrapMode.Pre)
        return pre(opt.measure!, text, opt.start, opt.end!, opt.width!);
    else
        return greedy(opt.measure!, text, opt.start, opt.end!, opt.width!, opt.mode!);
}

function idxOf(text: string, chr: string, start: number, end: number) {
    const idx: number = text.indexOf(chr, start);
    if (idx === -1 || idx > end) return end;
    return idx;
}

function isWhitespace(chr: string): boolean {
    return whitespace.test(chr);
}

function pre(measure: ComputeMetrics, text: string, start: number, end: number, width: number): WordMetrics[] {
    const lines: WordMetrics[] = [];
    let lineStart: number = start;
    for (let i = start; i < end && i < text.length; i++) {
        const chr: string = text.charAt(i);
        const isNewline: boolean = newline.test(chr);
        /** If we've reached a newline, then step down a line */
        /** Or if we've reached the EOF */
        if (isNewline || i === end - 1) {
            const lineEnd: number = isNewline ? i : i + 1;
            const measured: WordMetrics = measure(text, lineStart, lineEnd, width);
            lines.push(measured);
            lineStart = i + 1;
        }
    }
    return lines;
}

function greedy(measure: ComputeMetrics, text: string, start: number, end: number, width: number, mode: string): WordMetrics[] {
    /** A greedy word wrapper based on LibGDX algorithm */
    /** https://github.com/libgdx/libgdx/blob/master/gdx/src/com/badlogic/gdx/graphics/g2d/BitmapFontCache.java */
    const lines: WordMetrics[] = [];

    let testWidth: number = width;
    /** if WordWrapMode.NoWrap is specified, we only wrap on newline chars */
    if (mode === WordWrapMode.NoWrap) testWidth = Number.MAX_VALUE;

    while (start < end && start < text.length) {
        /** get next newline position */
        const newLine: number = idxOf(text, newlineChar, start, end);

        /** eat whitespace at start of line */
        while (start < newLine) {
            if (!isWhitespace(text.charAt(start))) break;
            start++
        }

        /** determine visible # of glyphs for the available width */
        const measured: WordMetrics = measure(text, start, newLine, testWidth);

        let lineEnd: number = start + (measured.end - measured.start);
        let nextStart: number = lineEnd + newlineChar.length;

        /** if we had to cut the line before the next newline... */
        if (lineEnd < newLine) {
            /** find char to break on */
            while (lineEnd > start) {
                if (isWhitespace(text.charAt(lineEnd)))
                    break;
                lineEnd--;
            }
            if (lineEnd === start) {
                if (nextStart > start + newlineChar.length) nextStart--;
                lineEnd = nextStart; /**  If no characters to break, show all. */
            } else {
                nextStart = lineEnd;
                /** eat whitespace at end of line */
                while (lineEnd > start) {
                    if (!isWhitespace(text.charAt(lineEnd - newlineChar.length)))
                        break;
                    lineEnd--;
                }
            }
        }
        if (lineEnd >= start) {
            lines.push(measure(text, start, lineEnd, testWidth));
        }
        start = nextStart;
    }
    return lines
}

/** determines the visible number of glyphs within a given width */
function monospace(_: string, start: number, end: number, width: number): WordMetrics {
    const glyphs: number = Math.min(width, end - start);
    return {
        start: start,
        end: start + glyphs,
        width: 0
    }
}

export { lines, wrap };