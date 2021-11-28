import { BMFont, BMFontChar, WordWrapOption } from "./";
interface TextGlyph {
    position: [number, number];
    data: BMFontChar;
    index: number;
    line: number;
}
declare enum TextAlign {
    Left = 0,
    Center = 1,
    Right = 2
}
interface TextLayoutOption extends WordWrapOption {
    font?: BMFont | undefined;
    letterSpacing?: number | undefined;
    tabSize?: number | undefined;
    lineHeight?: number | undefined;
    align?: TextAlign | undefined;
}
export { TextAlign, TextGlyph, TextLayoutOption };
//# sourceMappingURL=TextLayout.d.ts.map