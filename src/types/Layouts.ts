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
    width?: number;
    start?: number;
    end?: number;
    mode?: WordWrapMode;
    measure?: ComputeMetrics;
}

interface TextLayoutOption extends WordWrapOption {
    font?: BMFont;
    text?: string;
    align?: TextLayoutAlign;
    letterSpacing?: number;
    lineHeight?: number;
    tabSize?: number;
    // width?: number;
    // mode?: WordWrapMode;
    // start?: number;
    // end?: number;
    // measure?: ComputeMetrics;
}

interface TextGeometryOption extends TextLayoutOption {
    flipY?: boolean;
    multipage?: boolean;
}


export { ComputeMetrics, TextLayoutAlign, TextLayoutOption, TextGeometryOption, TextGlyph, TextMetrics, WordWrapMode, WordWrapOption }