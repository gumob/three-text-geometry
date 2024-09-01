import { BMFont, TextAlign, WordWrapMode } from '../types'

/**
 * The interface to define options for `TextGeometry`.
 *
 * @interface TextGeometryOption
 */
export interface TextGeometryOption {
  /**
   * The BMFont definition which holds chars, kernings, etc.
   *
   * @type {BMFont | undefined}
   * @memberof TextGeometryOption
   */
  font?: BMFont | undefined
  /**
   * The starting index into the text to layout.
   *
   * @type {number | undefined}
   * @memberof WordWrapOption
   * @default 0
   */
  start?: number | undefined
  /**
   * The ending index (exclusive) into the text to layout.
   *
   * @type {number | undefined}
   * @memberof WordWrapOption
   * @default text.length
   */
  end?: number | undefined
  /**
   * The desired width of the text box, causes word-wrapping and clipping in WordWrapMode mode. Leave as
   * undefined to remove word-wrapping (default behaviour).
   *
   * @type {number | undefined}
   * @memberof TextGeometryOption
   * @default undefined
   */
  width?: number | undefined
  /**
   * A mode for word-wrapper; can be WordWrapMode.Pre (maintain spacing), or WordWrapMode.NoWrap (collapse
   * whitespace but only break on newline characters), otherwise assumes normal word-wrap behaviour (collapse
   * whitespace, break at width or newlines).
   *
   * @type {WordWrapMode | undefined}
   * @memberof TextGeometryOption
   * @default undefined
   */
  mode?: WordWrapMode | undefined
  /**
   * The letter spacing in pixels.
   *
   * @type {number | undefined}
   * @memberof TextGeometryOption
   * @default 0
   */
  letterSpacing?: number | undefined
  /**
   * The number of spaces to use in a single tab	.
   *
   * @type {number | undefined}
   * @memberof TextGeometryOption
   * @default 4
   */
  tabSize?: number | undefined
  /**
   * The line height in pixels.
   *
   * @type {number | undefined}
   * @memberof TextGeometryOption
   * @default font.common.lineHeight.
   */
  lineHeight?: number | undefined
  /**
   * This can be TextAlign.left, TextAlign.center or TextAlign.right.
   *
   * @type {TextAlign | undefined}
   * @memberof TextGeometryOption
   * @default TextAlign.left
   */
  align?: TextAlign | undefined
  /**
   * Whether the texture will be Y-flipped.
   *
   * @type {boolean}
   * @memberof TextGeometryOption
   * @default true
   */
  flipY?: boolean
  /**
   * Whether to construct this geometry with an extra buffer containing page IDs. This is necessary for
   * multi-texture fonts.
   *
   * @type {boolean}
   * @memberof TextGeometryOption
   * @default false
   */
  multipage?: boolean
}
