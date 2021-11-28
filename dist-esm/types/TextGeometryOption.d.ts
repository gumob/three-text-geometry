import { BMFont, TextAlign, WordWrapMode } from "./";
export interface TextGeometryOption {
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
//# sourceMappingURL=TextGeometryOption.d.ts.map