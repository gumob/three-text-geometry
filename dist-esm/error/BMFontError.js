class BMFontError extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, BMFontError.prototype);
    }
}
BMFontError.LoadError = 'LoadError';
BMFontError.ParseError = 'ParseError';
export { BMFontError };
//# sourceMappingURL=BMFontError.js.map