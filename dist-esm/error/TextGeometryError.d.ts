declare enum TextGeometryErrorType {
    LoadError = "LoadError",
    ParseError = "ParseError"
}
declare class TextGeometryError extends Error {
    constructor(type: TextGeometryErrorType, message?: string | undefined);
}
export { TextGeometryError, TextGeometryErrorType };
//# sourceMappingURL=TextGeometryError.d.ts.map