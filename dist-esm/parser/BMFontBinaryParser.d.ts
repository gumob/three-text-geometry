/**
 *
 * https://github.com/Jam3/parse-bmfont-binary
 *
 */
/// <reference types="node" />
import { Buffer } from 'buffer';
import { BMFont, IBMFontParser } from "../types";
/**
 * The class for parsing font data in Binary format.
 *
 * @class BMFontBinaryParser
 */
declare class BMFontBinaryParser implements IBMFontParser<Buffer> {
    private static HEADER;
    /**
     * The function that parses font data from `Buffer` data.
     *
     * ```typescript
     * import { BMFontBinaryParser } from 'three-text-geometry'
     *
     * const data: Binary = ...binary data...
     * const parser = new BMFontBinaryParser();
     * const font: BMFont = parser.parse(data)
     * ```
     *
     * @param {Buffer} buf  `Buffer` that contains font data.
     * @returns {BMFont} Parsed data that conforms to the `BMFont` interface.
     * @memberof BMFontBinaryParser
     */
    parse(buf: Buffer): BMFont;
    private readBlock;
    private readInfo;
    private readCommon;
    private readPages;
    private readChars;
    private readKernings;
    private readStringNT;
    private readNameNT;
}
export { BMFontBinaryParser };
//# sourceMappingURL=BMFontBinaryParser.d.ts.map