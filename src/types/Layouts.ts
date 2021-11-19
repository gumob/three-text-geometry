import { BMFont, BMFontChar } from '~/types';

// declare function ComputeMetrics(text: string, start: number, end: number, width: number): TextMetrics;
type ComputeMetrics = (text: string, start: number, end: number, width: number) => TextMetrics;

interface TextGlyph {
    position: [number, number];
    data: BMFontChar,
    index: number;
    line: number;
}

interface TextMetrics {
    start: number,
    end: number,
    width: number
}

enum TextLayoutAlign {
    Left = 'left',
    Center = 'center',
    Right = 'right',
}

enum WordWrapMode {
    Pre = 'pre',
    NoWrap = 'nowrap'
}

interface WordWrapOption {
    start: number;
    end?: number;
    width?: number;
    mode: WordWrapMode;
    measure?: ComputeMetrics;
}

interface TextLayoutOption extends WordWrapOption {
    font?: BMFont;
    text?: string;
    letterSpacing: number;
    tabSize: number;
    lineHeight?: number;
    align: TextLayoutAlign;
}

interface TextGeometryOption extends TextLayoutOption {
    flipY: boolean;
    multipage: boolean;
}

function DefaultWordWrapOption(): WordWrapOption {
    return {
        /** WordWrapOption specific */
        start: 0,
        end: undefined,
        width: undefined,
        mode: WordWrapMode.Pre,
        measure: undefined,
    };
}

function DefaultTextLayoutOption(): TextLayoutOption {
    const opt = DefaultWordWrapOption();
    return {
        /** WordWrapOption specific */
        start: opt.start,
        end: opt.end,
        width: opt.width,
        mode: opt.mode,
        measure: opt.measure,
        /** TextLayoutOption specific */
        font: undefined,
        text: undefined,
        letterSpacing: 0,
        tabSize: 4,
        lineHeight: undefined,
        align: TextLayoutAlign.Left,
    };
}

function DefaultTextGeometryOption(): TextGeometryOption {
    const opt = DefaultTextLayoutOption();
    return {
        /** WordWrapOption specific */
        start: opt.start,
        end: opt.end,
        width: opt.width,
        mode: opt.mode,
        measure: opt.measure,
        /** TextLayoutOption specific */
        font: opt.font,
        text: opt.text,
        letterSpacing: opt.letterSpacing,
        tabSize: opt.tabSize,
        lineHeight: opt.lineHeight,
        align: opt.align,
        /** TextGeometryOption specific */
        flipY: true,
        multipage: false,
    };
}

export {
    ComputeMetrics, TextLayoutAlign, TextLayoutOption, TextGeometryOption, TextGlyph, TextMetrics, WordWrapMode, WordWrapOption,
    DefaultWordWrapOption, DefaultTextLayoutOption, DefaultTextGeometryOption
}