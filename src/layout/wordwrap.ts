/**
 * 
 * https://github.com/mattdesl/word-wrapper
 * 
 */
import { ComputeMetrics, createWordWrapOption, WordMetrics, WordWrapMode, WordWrapOption } from '~/types'

const newline = /\n/
const newlineChar = '\n'
const whitespace = /\s/

function wrap(text: string, opt: WordWrapOption = createWordWrapOption()): string {
    // console.log('text', text);
    const results = lines(text, opt);
    const result = results
        .map((line: WordMetrics) => (text.substring(line.start, line.end)))
        .join('\n');
    // console.log('results', results);
    // console.log('result', result);
    return result;
}

function lines(text: string, opt: WordWrapOption = createWordWrapOption()): WordMetrics[] {
    /** zero width results in nothing visible */
    if (opt.width === 0 && opt.mode !== WordWrapMode.NoWrap) return [];
    text = text || '';
    const start: number = Math.max(0, opt.start);
    const end: number = opt.end !== undefined ? opt.end : text.length;
    const width: number = opt.width !== undefined ? opt.width : Number.MAX_VALUE;
    const mode: WordWrapMode = opt.mode;
    const measure: ComputeMetrics = opt.measure || monospace;

    // console.log('text', text);
    // console.log(
    //     'start', start,
    //     'end', end,
    //     'width', width,
    //     'mode', mode,
    //     'measure', measure
    // );

    if (mode === WordWrapMode.Pre)
        return pre(measure, text, start, end, width);
    else
        return greedy(measure, text, start, end, width, mode);
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
        // width: width
    }
}

export { lines, wrap };