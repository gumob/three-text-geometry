/**
 * The enums to specify text alignment.
 *
 * @enum {number}
 */
var TextAlign;
(function (TextAlign) {
    /** Text aligns to left. */
    TextAlign[TextAlign["Left"] = 0] = "Left";
    /** Text aligns to center. */
    TextAlign[TextAlign["Center"] = 1] = "Center";
    /** Text aligns to right. */
    TextAlign[TextAlign["Right"] = 2] = "Right";
})(TextAlign || (TextAlign = {}));
/**
 * The enums to specify word wrapping.
 *
 * @enum {number}
 */
var WordWrapMode;
(function (WordWrapMode) {
    /** Wrap text to pre. */
    WordWrapMode["Pre"] = "pre";
    /** No wrapping. */
    WordWrapMode["NoWrap"] = "nowrap";
})(WordWrapMode || (WordWrapMode = {}));
export { TextAlign, WordWrapMode, };
//# sourceMappingURL=options.js.map