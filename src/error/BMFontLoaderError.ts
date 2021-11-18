
enum BMFontLoaderErrorType {
    LoadError = 'LoadError',
    ParseError = 'ParseError',
}

class BMFontLoaderError extends Error {
    constructor(type: BMFontLoaderErrorType, message: string | undefined = undefined) {
        let msg: string;
        switch (type) {
            case BMFontLoaderErrorType.ParseError:
                msg = message ? message : 'Failed to parse data';
                break;
            case BMFontLoaderErrorType.LoadError:
                msg = message ? message : 'Failed to load data';
                break;
            // default:
            //     msg = 'Unknown Error';
            //     break;
        }
        super(msg);
        this.name = type;
        Object.setPrototypeOf(this, BMFontLoaderError.prototype);
    }
}

export { BMFontLoaderError, BMFontLoaderErrorType };