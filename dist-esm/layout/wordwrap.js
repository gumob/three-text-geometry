/**
 *
 * https://github.com/mattdesl/word-wrapper
 *
 */
import { WordWrapMode } from "../types";
class WordWrap {
    wrap(text, option = {}) {
        return this.lines(text, option)
            .map((line) => text.substring(line.start, line.end))
            .join('\n');
    }
    lines(text, option = {}) {
        /** zero width results in nothing visible */
        const opt = {
            start: undefined,
            end: undefined,
            width: undefined,
            mode: undefined,
            measure: undefined,
        };
        text = text || '';
        if (option.start !== undefined)
            opt.start = Math.max(0, option.start);
        else
            opt.start = 0;
        if (option.end !== undefined)
            opt.end = option.end;
        else
            opt.end = text.length;
        if (option.width !== undefined)
            opt.width = option.width;
        else
            opt.width = Number.MAX_VALUE;
        if (option.mode !== undefined)
            opt.mode = option.mode;
        opt.measure = option.measure || this.monospace;
        if (opt.width === 0 && opt.mode !== WordWrapMode.NoWrap)
            return [];
        if (option.mode === WordWrapMode.Pre)
            return this.pre(opt.measure, text, opt.start, opt.end, opt.width);
        else
            return this.greedy(opt.measure, text, opt.start, opt.end, opt.width, opt.mode);
    }
    idxOf(text, chr, start, end) {
        const idx = text.indexOf(chr, start);
        if (idx === -1 || idx > end)
            return end;
        return idx;
    }
    isWhitespace(chr) {
        return WordWrap.whitespaceRegexp.test(chr);
    }
    pre(measure, text, start, end, width) {
        const lines = [];
        let lineStart = start;
        for (let i = start; i < end && i < text.length; i++) {
            const chr = text.charAt(i);
            const isNewline = WordWrap.newlineRegexp.test(chr);
            /** If we've reached a newline, then step down a line */
            /** Or if we've reached the EOF */
            if (isNewline || i === end - 1) {
                const lineEnd = isNewline ? i : i + 1;
                const measured = measure(text, lineStart, lineEnd, width);
                lines.push(measured);
                lineStart = i + 1;
            }
        }
        return lines;
    }
    greedy(measure, text, start, end, width, mode) {
        /** A greedy word wrapper based on LibGDX algorithm */
        /** https://github.com/libgdx/libgdx/blob/master/gdx/src/com/badlogic/gdx/graphics/g2d/BitmapFontCache.java */
        const lines = [];
        let testWidth = width;
        /** if WordWrapMode.NoWrap is specified, we only wrap on newline chars */
        if (mode === WordWrapMode.NoWrap)
            testWidth = Number.MAX_VALUE;
        while (start < end && start < text.length) {
            /** get next newline position */
            const newLine = this.idxOf(text, WordWrap.newlineChar, start, end);
            /** eat whitespace at start of line */
            while (start < newLine) {
                if (!this.isWhitespace(text.charAt(start)))
                    break;
                start++;
            }
            /** determine visible # of glyphs for the available width */
            const measured = measure(text, start, newLine, testWidth);
            let lineEnd = start + (measured.end - measured.start);
            let nextStart = lineEnd + WordWrap.newlineChar.length;
            /** if we had to cut the line before the next newline... */
            if (lineEnd < newLine) {
                /** find char to break on */
                while (lineEnd > start) {
                    if (this.isWhitespace(text.charAt(lineEnd)))
                        break;
                    lineEnd--;
                }
                if (lineEnd === start) {
                    if (nextStart > start + WordWrap.newlineChar.length)
                        nextStart--;
                    lineEnd = nextStart; /**  If no characters to break, show all. */
                }
                else {
                    nextStart = lineEnd;
                    /** eat whitespace at end of line */
                    while (lineEnd > start) {
                        if (!this.isWhitespace(text.charAt(lineEnd - WordWrap.newlineChar.length)))
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
        return lines;
    }
    /** determines the visible number of glyphs within a given width */
    monospace(_, start, end, width) {
        const glyphs = Math.min(width, end - start);
        return {
            start: start,
            end: start + glyphs,
            width: 0,
        };
    }
}
WordWrap.newlineRegexp = /\n/;
WordWrap.whitespaceRegexp = /\s/;
WordWrap.newlineChar = '\n';
export { WordWrap };
//# sourceMappingURL=WordWrap.js.map