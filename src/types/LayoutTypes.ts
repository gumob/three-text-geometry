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
    // None = 'none'
}

interface WordWrapOption {
    start: number | undefined;
    end: number | undefined;
    width: number | undefined;
    mode: WordWrapMode | undefined;
    measure: ComputeMetrics | undefined;
}

interface TextLayoutOption extends WordWrapOption {
    font: BMFont | undefined;
    text: string | undefined;
    letterSpacing: number | undefined;
    tabSize: number | undefined;
    lineHeight: number | undefined;
    align: TextLayoutAlign | undefined;
}

interface TextGeometryOption extends TextLayoutOption {
    flipY: boolean;
    multipage: boolean;
}

interface WordWrapArgs {
    start: number | undefined;
    end: number | undefined;
    width: number | undefined;
    mode: WordWrapMode | undefined;
    measure: ComputeMetrics | undefined;
}

interface TextLayoutArgs extends WordWrapArgs {
    font: BMFont | undefined;
    text: string | undefined;
    letterSpacing: number | undefined;
    tabSize: number | undefined;
    lineHeight: number | undefined;
    align: TextLayoutAlign | undefined;
}

interface TextGeometryArgs extends TextLayoutArgs {
    flipY: boolean | undefined;
    multipage: boolean | undefined;
}


// function createWordWrapOption(option: any = {}): WordWrapOption {
//     return {
//         /** WordWrapOption specific */
//         start: option.start !== undefined ? option.start : 0,
//         end: option.end !== undefined ? option.end : undefined,
//         width: option.width !== undefined ? option.width : undefined,
//         mode: option.mode !== undefined ? option.mode : WordWrapMode.None,
//         measure: option.measure || undefined,
//     };
// }

// function createTextLayoutOption(option: any = {}): TextLayoutOption {
//     // const opt = createWordWrapOption();
//     return {
//         /** WordWrapOption specific */
//         start: option.start !== undefined ? option.start : 0,
//         end: option.end !== undefined ? option.end : undefined,
//         width: option.width !== undefined ? option.width : undefined,
//         mode: option.mode !== undefined ? option.mode : WordWrapMode.None,
//         measure: option.measure || undefined,
//         /** TextLayoutOption specific */
//         font: option.font,
//         text: option.text,
//         letterSpacing: option.letterSpacing !== undefined ? option.letterSpacing : 0,
//         tabSize: option.tabSize !== undefined ? option.tabSize : 4,
//         lineHeight: option.lineHeight,
//         align: option.align || TextLayoutAlign.Left
//     };
// }

// function createTextGeometryOption(option: any = {}): TextGeometryOption {
//     return {
//         /** WordWrapOption specific */
//         start: option.start !== undefined ? option.start : 0,
//         end: option.end !== undefined ? option.end : undefined,
//         width: option.width !== undefined ? option.width : undefined,
//         mode: option.mode !== undefined ? option.mode : WordWrapMode.None,
//         measure: option.measure || undefined,
//         /** TextLayoutOption specific */
//         font: option.font,
//         text: option.text,
//         letterSpacing: option.letterSpacing !== undefined ? option.letterSpacing : 0,
//         tabSize: option.tabSize !== undefined ? option.tabSize : 4,
//         lineHeight: option.lineHeight,
//         align: option.align || TextLayoutAlign.Left,
//         /** TextGeometryOption specific */
//         flipY: option.flipY !== undefined ? option.flipY : true,
//         multipage: option.multipage !== undefined ? option.multipage : false
//     };
// }

export {
    ComputeMetrics, TextLayoutAlign, TextLayoutOption, TextGeometryOption, TextGlyph, WordMetrics, WordWrapMode, WordWrapOption,
    // WordWrapArgs, TextLayoutArgs, TextGeometryArgs,
    // createWordWrapOption, createTextLayoutOption, createTextGeometryOption
}