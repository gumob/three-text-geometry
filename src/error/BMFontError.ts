enum BMFontErrorType {
  LoadError = 'LoadError',
  ParseError = 'ParseError',
}

class BMFontError extends Error {
  static readonly LoadError: string = 'LoadError'
  static readonly ParseError: string = 'ParseError'

  constructor(type: BMFontErrorType, message: string | undefined = undefined) {
    let msg: string
    switch (type) {
      case BMFontErrorType.ParseError:
        msg = message ? message : 'Failed to parse data'
        break
      case BMFontErrorType.LoadError:
        msg = message ? message : 'Failed to load data'
        break
    }
    super(msg)
    this.name = type
    Object.setPrototypeOf(this, BMFontError.prototype)
  }
}

export { BMFontError, BMFontErrorType }
