"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BMFontError = void 0;
class BMFontError extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, BMFontError.prototype);
    }
}
exports.BMFontError = BMFontError;
BMFontError.LoadError = 'LoadError';
BMFontError.ParseError = 'ParseError';
//# sourceMappingURL=BMFontError.js.map