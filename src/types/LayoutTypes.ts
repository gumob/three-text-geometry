import { BMFont, BMFontChar } from '~/types';

// declare function ComputeMetrics(text: string, start: number, end: number, width: number): WordMetrics;
type ComputeMetrics = (text: string, start: number, end: number, width: number) => WordMetrics;

interface TextGlyph {
    position: [number, number];
    data: BMFontChar,
    index: number;
    line: number;
}

interface WordMetrics {
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
    NoWrap = 'nowrap',
    None = 'none'
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

function createWordWrapOption(
    start: number | undefined = undefined,
    end: number | undefined = undefined,
    width: number | undefined = undefined,
    mode: WordWrapMode | undefined = undefined,
    measure: ComputeMetrics | undefined = undefined): WordWrapOption {
    return {
        /** WordWrapOption specific */
        start: start !== undefined ? start : 0,
        end: end !== undefined ? end : undefined,
        width: width !== undefined ? width : undefined,
        mode: mode || WordWrapMode.None,
        measure: measure || undefined,
    };
}

function DefaultTextLayoutOption(): TextLayoutOption {
    const opt = createWordWrapOption();
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
    ComputeMetrics, TextLayoutAlign, TextLayoutOption, TextGeometryOption, TextGlyph, WordMetrics, WordWrapMode, WordWrapOption,
    createWordWrapOption, DefaultTextLayoutOption, DefaultTextGeometryOption
}