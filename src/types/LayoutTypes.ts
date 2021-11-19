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

function createWordWrapOption(option: any = {}): WordWrapOption {
    return {
        /** WordWrapOption specific */
        start: option.start !== undefined ? option.start : 0,
        end: option.end !== undefined ? option.end : undefined,
        width: option.width !== undefined ? option.width : undefined,
        mode: option.mode !== undefined ? option.mode : WordWrapMode.None,
        measure: option.measure || undefined,
    };
}

function createTextLayoutOption(option: any = {}): TextLayoutOption {
    // const opt = createWordWrapOption();
    return {
        /** WordWrapOption specific */
        start: option.start !== undefined ? option.start : 0,
        end: option.end !== undefined ? option.end : undefined,
        width: option.width !== undefined ? option.width : undefined,
        mode: option.mode !== undefined ? option.mode : WordWrapMode.None,
        measure: option.measure || undefined,
        /** TextLayoutOption specific */
        font: option.font,
        text: option.text,
        letterSpacing: option.letterSpacing !== undefined ? option.letterSpacing : 0,
        tabSize: option.tabSize !== undefined ? option.tabSize : 4,
        lineHeight: option.lineHeight,
        align: option.align || TextLayoutAlign.Left
    };
}

function DefaultTextGeometryOption(): TextGeometryOption {
    const opt = createTextLayoutOption();
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
    createWordWrapOption, createTextLayoutOption, DefaultTextGeometryOption
}