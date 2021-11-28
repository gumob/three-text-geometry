import { BMFont, IBMFontParser } from "../types";
/**
 * The class for parsing font data in XML format.
 *
 * @class BMFontXMLParser
 */
declare class BMFontXMLParser implements IBMFontParser<string> {
    /**
     * The function that parses font data from a XML string.
     *
     * ```typescript import { BMFontXMLParser } from 'three-text-geometry'
     *
     * const data: string = ...xml data...
     * const parser = new BMFontXMLParser();
     * const font: BMFont = parser.parse(data)
     * ```
     *
     * @param {string} xml  `string` that contains font data.
     * @returns {BMFont} A.                                                                                     Parsed
     *                                                                                                          data
     *                                                                                                          that
     *                                                                                                          conforms
     *                                                                                                          to
     *                                                                                                          the
     *                                                                                                          `BMFont`
     *                                                                                                          interface.
     * @memberof BMFontXMLParser
     */
    parse(xml: string): BMFont;
}
export { BMFontXMLParser };
//# sourceMappingURL=BMFontXMLParser.d.ts.map