import { BMFont, TextAlign, WordWrapMode } from "~/types";

/**
 * The interface to define options for `TextGeometry`.
 *
 * @interface TextGeometryOption
 */
export interface TextGeometryOption {
    /**
     * The BMFont definition which holds chars, kernings, etc.
     *
     * @type {(BMFont | undefined)}
     * @memberof TextGeometryOption
     */
    font?: BMFont | undefined
    /**
     * The starting index into the text to layout.
     *
     * @defaultValue 0
     * @type {(number | undefined)}
     * @memberof WordWrapOption
     */
    start?: number | undefined
    /**
     * The ending index (exclusive) into the text to layout.
     *
     * @defaultValue text.length
     * @type {(number | undefined)}
     * @memberof WordWrapOption
     */
    end?: number | undefined
  
    /**
     * The desired width of the text box, causes word-wrapping and clipping in WordWrapMode mode. Leave as undefined to remove word-wrapping (default behaviour).
     *
     * @defaultValue undefined
     * @type {(number | undefined)}
     * @memberof TextGeometryOption
     */
    width?: number | undefined
    /**
     * A mode for word-wrapper; can be WordWrapMode.Pre (maintain spacing), or WordWrapMode.NoWrap (collapse whitespace but only break on newline characters), otherwise assumes normal word-wrap behaviour (collapse whitespace, break at width or newlines).
     *
     * @defaultValue undefined
     * @type {(WordWrapMode | undefined)}
     * @memberof TextGeometryOption
     */
    mode?: WordWrapMode | undefined
    /**
     * The letter spacing in pixels.
     * 
     * @defaultValue 0
     * @type {(number | undefined)}
     * @memberof TextGeometryOption
     */
    letterSpacing?: number | undefined
    /**
     * The number of spaces to use in a single tab	.
     *
     * @defaultValue 4
     * @type {(number | undefined)}
     * @memberof TextGeometryOption
     */
    tabSize?: number | undefined
    /**
     * The line height in pixels
     *
     * @defaultValue font.common.lineHeight.
     * @type {(number | undefined)}
     * @memberof TextGeometryOption
     */
    lineHeight?: number | undefined
    /**
     * This can be TextAlign.left, TextAlign.center or TextAlign.right.
     *
     * @defaultValue TextAlign.left
     * @type {(TextAlign | undefined)}
     * @memberof TextGeometryOption
     */
    align?: TextAlign | undefined
    /**
     * Whether the texture will be Y-flipped.
     * 
     * @defaultValue true
     * @type {boolean}
     * @memberof TextGeometryOption
     */
    flipY?: boolean
    /**
     * Whether to construct this geometry with an extra buffer containing page IDs. This is necessary for multi-texture fonts.
     *
     * @defaultValue false
     * @type {boolean}
     * @memberof TextGeometryOption
     */
    multipage?: boolean
  }
  