declare enum BMFontLoaderErrorType {
    LoadError = "LoadError",
    ParseError = "ParseError"
}
declare class BMFontLoaderError extends Error {
    constructor(type: BMFontLoaderErrorType, message?: string | undefined);
}
export { BMFontLoaderError, BMFontLoaderErrorType };
//# sourceMappingURL=BMFontLoaderError.d.ts.map