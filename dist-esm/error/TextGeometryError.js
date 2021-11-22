var TextGeometryErrorType;
(function (TextGeometryErrorType) {
    TextGeometryErrorType["LoadError"] = "LoadError";
    TextGeometryErrorType["ParseError"] = "ParseError";
})(TextGeometryErrorType || (TextGeometryErrorType = {}));
class TextGeometryError extends Error {
    constructor(type, message = undefined) {
        let msg;
        switch (type) {
            case TextGeometryErrorType.ParseError:
                msg = message ? message : 'Failed to parse data';
                break;
            case TextGeometryErrorType.LoadError:
                msg = message ? message : 'Failed to load data';
                break;
        }
        super(msg);
        this.name = type;
        Object.setPrototypeOf(this, TextGeometryError.prototype);
    }
}
export { TextGeometryError, TextGeometryErrorType };
//# sourceMappingURL=TextGeometryError.js.map