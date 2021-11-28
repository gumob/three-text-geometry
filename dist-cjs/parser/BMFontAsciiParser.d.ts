import { BMFont, IBMFontParser } from "../types";
/**
 * The class for parsing font data in ASCII format.
 *
 * @class BMFontAsciiParser
 */
declare class BMFontAsciiParser implements IBMFontParser<string> {
    /**
     * The function that parses font data from an ASCII string.
     *
     * ```typescript
     * import { BMFontAsciiParser } from 'three-text-geometry'
     *
     * const data: string = ...ascii data...
     * const parser = new BMFontAsciiParser();
     * const font: BMFont = parser.parse(data)
     * ```
     *
     * @param {string} data  `string` that contains font data.
     * @returns {BMFont} Parsed data that conforms to the `BMFont` interface.
     * @memberof BMFontAsciiParser
     */
    parse(data: string): BMFont;
}
export { BMFontAsciiParser };
//# sourceMappingURL=BMFontAsciiParser.d.ts.map