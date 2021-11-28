import Ajv from 'ajv';
import { BMFontLoaderError, BMFontLoaderErrorType } from "../error";
import schema from './BMFontJsonSchema.json';
/**
 * # How to create a json schema
 * $ npm install -g quicktype
 * $ quicktype ./src/types/BMFont.ts -o ./src/parser/BMFontJsonSchema.json --lang schema
 */
/**
 * The class for parsing font data in JSON format.
 *
 * @class BMFontJsonParser
 */
class BMFontJsonParser {
    /**
     * The function that parses font data from a JSON string or object.
     *
     * ```typescript import { BMFontJsonParser } from 'three-text-geometry'
     *
     * const data: object | string = ...json data...
     * const parser = new BMFontJsonParser();
     * const font: BMFont = parser.parse(data)
     * ```
     *
     * @param {Object | string} json  `object` or `string` that contains font data.
     * @returns {BMFont} A.                                                                                     Parsed
     *                                                                                                          data
     *                                                                                                          that
     *                                                                                                          conforms
     *                                                                                                          to
     *                                                                                                          the
     *                                                                                                          `BMFont`
     *                                                                                                          interface.
     * @memberof BMFontJsonParser
     */
    parse(json) {
        try {
            if (typeof json === 'string')
                json = JSON.parse(json);
            const ajv = new Ajv();
            const validate = ajv.compile(schema);
            const valid = validate(json);
            if (valid) {
                return json;
            }
            else {
                throw new BMFontLoaderError(BMFontLoaderErrorType.ParseError, 'Invalid json data');
            }
        }
        catch (error) {
            throw new BMFontLoaderError(BMFontLoaderErrorType.ParseError, error.message);
        }
    }
}
export { BMFontJsonParser };
//# sourceMappingURL=BMFontJsonParser.js.map