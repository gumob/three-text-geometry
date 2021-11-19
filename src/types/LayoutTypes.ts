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

function createTextLayoutOption(
    start: number | undefined = undefined,
    end: number | undefined = undefined,
    width: number | undefined = undefined,
    mode: WordWrapMode | undefined = undefined,
    measure: ComputeMetrics | undefined = undefined,
    font: BMFont | undefined = undefined,
    text: string | undefined = undefined,
    letterSpacing: number | undefined = undefined,
    tabSize: number | undefined = undefined,
    lineHeight: number | undefined = undefined,
    align: TextLayoutAlign | undefined = undefined
): TextLayoutOption {
    const opt = createWordWrapOption();
    return {
        /** WordWrapOption specific */
        start: start !== undefined ? start : 0,
        end: end !== undefined ? end : undefined,
        width: width !== undefined ? width : undefined,
        mode: mode !== undefined ? mode : WordWrapMode.None,
        measure: measure || undefined,
        /** TextLayoutOption specific */
        font: font,
        text: text,
        letterSpacing: letterSpacing !== undefined ? letterSpacing : 0,
        tabSize: tabSize !== undefined ? tabSize : 4,
        lineHeight: lineHeight,
        align: align || TextLayoutAlign.Left
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