/**
 * Class representing an error related to the BMFont.
 *
 * @class
 * @property {string} message - The error message.
 */
class BMFontError extends Error {
  static readonly LoadError: string = 'LoadError'
  static readonly ParseError: string = 'ParseError'

  /**
   * Constructs a new BMFontError with the specified message.
   *
   * @param {string} message - The error message.
   */
  constructor(message: string) {
    super(message)
    Object.setPrototypeOf(this, BMFontError.prototype)
  }
}

export { BMFontError }
