import { BMFont, BMFontChar, WordWrapOption } from '~/types'

interface TextGlyph {
  position: [number, number]
  data: BMFontChar
  index: number
  line: number
}

/**
 * The enums to specify text alignment.
 *
 * @enum {number}
 */
enum TextAlign {
  /** Text aligns to left. */
  Left = 0,
  /** Text aligns to center. */
  Center = 1,
  /** Text aligns to right. */
  Right = 2,
}

interface TextLayoutOption extends WordWrapOption {
  font?: BMFont | undefined
  letterSpacing?: number | undefined
  tabSize?: number | undefined
  lineHeight?: number | undefined
  align?: TextAlign | undefined
}

export { TextAlign, TextGlyph, TextLayoutOption }
