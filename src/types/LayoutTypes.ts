import { BMFont, BMFontChar } from '~/types'

// declare function ComputeMetrics(text: string, start: number, end: number, width: number): WordMetrics;
type ComputeMetrics = (text: string, start: number, end: number, width: number) => WordMetrics

interface TextGlyph {
    position: [number, number]
    data: BMFontChar
    index: number
    line: number
}

interface WordMetrics {
    start: number
    end: number
    width: number
}

enum TextLayoutAlign {
    Left = 0,
    Center = 1,
    Right = 2,
    // Left = 'left',
    // Center = 'center',
    // Right = 'right',
}

enum WordWrapMode {
    Pre = 'pre',
    NoWrap = 'nowrap',
}

interface WordWrapOption {
    start?: number | undefined
    end?: number | undefined
    width?: number | undefined
    mode?: WordWrapMode | undefined
    measure?: ComputeMetrics | undefined
}

interface TextLayoutOption extends WordWrapOption {
    font?: BMFont | undefined
    letterSpacing?: number | undefined
    tabSize?: number | undefined
    lineHeight?: number | undefined
    align?: TextLayoutAlign | undefined
}

interface TextGeometryOption {
    font?: BMFont | undefined
    start?: number | undefined
    end?: number | undefined
    width?: number | undefined
    mode?: WordWrapMode | undefined
    letterSpacing?: number | undefined
    tabSize?: number | undefined
    lineHeight?: number | undefined
    align?: TextLayoutAlign | undefined
    flipY?: boolean
    multipage?: boolean
}

export {
    ComputeMetrics,
    TextGeometryOption,
    TextGlyph,
    TextLayoutAlign,
    TextLayoutOption,
    WordMetrics,
    WordWrapMode,
    WordWrapOption,
}
