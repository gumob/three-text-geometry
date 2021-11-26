import { BMFont, BMFontChar } from "./";
declare type ComputeMetrics = (text: string, start: number, end: number, width: number) => WordMetrics;
interface TextGlyph {
    position: [number, number];
    data: BMFontChar;
    index: number;
    line: number;
}
interface WordMetrics {
    start: number;
    end: number;
    width: number;
}
declare enum TextAlign {
    Left = 0,
    Center = 1,
    Right = 2
}
declare enum WordWrapMode {
    Pre = "pre",
    NoWrap = "nowrap"
}
interface WordWrapOption {
    start?: number | undefined;
    end?: number | undefined;
    width?: number | undefined;
    mode?: WordWrapMode | undefined;
    measure?: ComputeMetrics | undefined;
}
interface TextLayoutOption extends WordWrapOption {
    font?: BMFont | undefined;
    letterSpacing?: number | undefined;
    tabSize?: number | undefined;
    lineHeight?: number | undefined;
    align?: TextAlign | undefined;
}
interface TextGeometryOption {
    font?: BMFont | undefined;
    start?: number | undefined;
    end?: number | undefined;
    width?: number | undefined;
    mode?: WordWrapMode | undefined;
    letterSpacing?: number | undefined;
    tabSize?: number | undefined;
    lineHeight?: number | undefined;
    align?: TextAlign | undefined;
    flipY?: boolean;
    multipage?: boolean;
}
export { ComputeMetrics, TextAlign, TextGeometryOption, TextGlyph, TextLayoutOption, WordMetrics, WordWrapMode, WordWrapOption, };
//# sourceMappingURL=LayoutTypes.d.ts.map