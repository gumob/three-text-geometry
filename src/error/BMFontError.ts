class BMFontError extends Error {
  static readonly LoadError: string = 'LoadError'
  static readonly ParseError: string = 'ParseError'

  constructor(message: string) {
    super(message)
    Object.setPrototypeOf(this, BMFontError.prototype)
  }
}

export { BMFontError }
