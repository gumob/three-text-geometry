"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BMFontLoaderErrorType = exports.BMFontLoaderError = void 0;
var BMFontLoaderErrorType;
(function (BMFontLoaderErrorType) {
    BMFontLoaderErrorType["LoadError"] = "LoadError";
    BMFontLoaderErrorType["ParseError"] = "ParseError";
})(BMFontLoaderErrorType || (BMFontLoaderErrorType = {}));
exports.BMFontLoaderErrorType = BMFontLoaderErrorType;
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
exports.BMFontLoaderError = BMFontLoaderError;
//# sourceMappingURL=BMFontLoaderError.js.map