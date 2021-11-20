
enum TextGeometryErrorType {
    LoadError = 'LoadError',
    ParseError = 'ParseError',
}

class TextGeometryError extends Error {
    constructor(type: TextGeometryErrorType, message: string | undefined = undefined) {
        let msg: string;
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