var BMFontLoaderErrorType;
(function (BMFontLoaderErrorType) {
    BMFontLoaderErrorType["LoadError"] = "LoadError";
    BMFontLoaderErrorType["ParseError"] = "ParseError";
})(BMFontLoaderErrorType || (BMFontLoaderErrorType = {}));
class BMFontLoaderError extends Error {
    constructor(type, message = undefined) {
        let msg;
        switch (type) {
            case BMFontLoaderErrorType.ParseError:
                msg = message ? message : 'Failed to parse data';
                break;
            case BMFontLoaderErrorType.LoadError:
                msg = message ? message : 'Failed to load data';
                break;
        }
        super(msg);
        this.name = type;
        Object.setPrototypeOf(this, BMFontLoaderError.prototype);
    }
}
export { BMFontLoaderError, BMFontLoaderErrorType };
//# sourceMappingURL=BMFontLoaderError.js.map