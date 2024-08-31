"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BMFontError = void 0;
class BMFontError extends Error {
    static LoadError = 'LoadError';
    static ParseError = 'ParseError';
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, BMFontError.prototype);
    }
}
exports.BMFontError = BMFontError;
//# sourceMappingURL=BMFontError.js.map