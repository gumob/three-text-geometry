import { BMFont, BMFontChar } from '~/types'

type ComputeMetrics = (text: string, start: number, end: number, width: number) => WordMetrics

interface TextGlyph {
  position: [number, number]
  data: BMFontChar
  index: number
  line: number
}

interface WordMetrics {
  start: number
  end: number
  width: number
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

/**
 * The enums to specify word wrapping.
 *
 * @enum {number}
 */
enum WordWrapMode {
  /** Wrap text to pre. */
  Pre = 'pre',
  /** No wrapping. */
  NoWrap = 'nowrap',
}

interface WordWrapOption {
  start?: number | undefined

  end?: number | undefined
  width?: number | undefined
  mode?: WordWrapMode | undefined
  measure?: ComputeMetrics | undefined
}

interface TextLayoutOption extends WordWrapOption {
  font?: BMFont | undefined
  letterSpacing?: number | undefined
  tabSize?: number | undefined
  lineHeight?: number | undefined
  align?: TextAlign | undefined
}

export {
  ComputeMetrics,
  TextAlign,
  TextGlyph,
  TextLayoutOption,
  WordMetrics,
  WordWrapMode,
  WordWrapOption,
}
