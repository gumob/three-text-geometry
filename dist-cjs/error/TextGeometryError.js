"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextGeometryErrorType = exports.TextGeometryError = void 0;
var TextGeometryErrorType;
(function (TextGeometryErrorType) {
    TextGeometryErrorType["LoadError"] = "LoadError";
    TextGeometryErrorType["ParseError"] = "ParseError";
})(TextGeometryErrorType || (TextGeometryErrorType = {}));
exports.TextGeometryErrorType = TextGeometryErrorType;
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
exports.TextGeometryError = TextGeometryError;
//# sourceMappingURL=TextGeometryError.js.map