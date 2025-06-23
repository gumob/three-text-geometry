import { WordWrapMode } from '../types';
class WordWrap {
    wrap(text, option = {}) {
        return this.lines(text, option)
            .map((line) => text.substring(line.start, line.end))
            .join('\n');
    }
    lines(text, option = {}) {
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
        const lines = [];
        let testWidth = width;
        if (mode === WordWrapMode.NoWrap)
            testWidth = Number.MAX_VALUE;
        while (start < end && start < text.length) {
            const newLine = this.idxOf(text, WordWrap.newlineChar, start, end);
            while (start < newLine) {
                if (!this.isWhitespace(text.charAt(start)))
                    break;
                start++;
            }
            const measured = measure(text, start, newLine, testWidth);
            let lineEnd = start + (measured.end - measured.start);
            let nextStart = lineEnd + WordWrap.newlineChar.length;
            if (lineEnd < newLine) {
                while (lineEnd > start) {
                    if (this.isWhitespace(text.charAt(lineEnd)))
                        break;
                    lineEnd--;
                }
                if (lineEnd === start) {
                    if (nextStart > start + WordWrap.newlineChar.length)
                        nextStart--;
                    lineEnd = nextStart;
                }
                else {
                    nextStart = lineEnd;
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