export declare type ComputeMetrics = (text: string, start: number, end: number, width: number) => WordMetrics;
/**
 * The word metrics computed by `ComputeMetrics` function.
 *
 * @export
 * @interface WordMetrics
 */
export interface WordMetrics {
    /**
     * The start position.
     *
     * @type {number}
     * @memberof WordMetrics
     */
    start: number;
    /**
     * The end position.
     *
     * @type {number}
     * @memberof WordMetrics
     */
    end: number;
    /**
     * The width.
     *
     * @type {number}
     * @memberof WordMetrics
     */
    width: number;
}
/**
 * The enums to specify word wrapping.
 *
 * @enum {number}
 */
export declare enum WordWrapMode {
    /** Wrap text to pre. */
    Pre = "pre",
    /** No wrapping. */
    NoWrap = "nowrap"
}
/**
 * The interface to define options for `WordWrap`.
 *
 * @export
 * @interface WordWrapOption
 */
export interface WordWrapOption {
    /**
     * The starting index into the text to layout.
     *
     * @type {number | undefined}
     * @memberof WordWrapOption
     * @defaultValue 0
     */
    start?: number | undefined;
    /**
     * The ending index (exclusive) into the text to layout.
     *
     * @type {number | undefined}
     * @memberof WordWrapOption
     * @defaultValue text.length
     */
    end?: number | undefined;
    /**
     * The desired width of the text box, causes word-wrapping and clipping in WordWrapMode mode. Leave as
     * undefined to remove word-wrapping (default behaviour).
     *
     * @type {number | undefined}
     * @memberof TextGeometryOption
     * @defaultValue undefined
     */
    width?: number | undefined;
    /**
     * A mode for word-wrapper; can be WordWrapMode.Pre (maintain spacing), or WordWrapMode.NoWrap (collapse
     * whitespace but only break on newline characters), otherwise assumes normal word-wrap behaviour (collapse
     * whitespace, break at width or newlines).
     *
     * @type {WordWrapMode | undefined}
     * @memberof TextGeometryOption
     * @defaultValue undefined
     */
    mode?: WordWrapMode | undefined;
    /**
     * The function that computes word metrics.
     *
     * @type {ComputeMetrics | undefined}
     * @memberof WordWrapOption
     */
    measure?: ComputeMetrics | undefined;
}
//# sourceMappingURL=WordWrap.d.ts.map