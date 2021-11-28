"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BMFontJsonParser = void 0;
const tslib_1 = require("tslib");
const ajv_1 = (0, tslib_1.__importDefault)(require("ajv"));
const error_1 = require("../error");
const BMFontJsonSchema_json_1 = (0, tslib_1.__importDefault)(require("./BMFontJsonSchema.json"));
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
            const ajv = new ajv_1.default();
            const validate = ajv.compile(BMFontJsonSchema_json_1.default);
            const valid = validate(json);
            if (valid) {
                return json;
            }
            else {
                throw new error_1.BMFontLoaderError(error_1.BMFontLoaderErrorType.ParseError, 'Invalid json data');
            }
        }
        catch (error) {
            throw new error_1.BMFontLoaderError(error_1.BMFontLoaderErrorType.ParseError, error.message);
        }
    }
}
exports.BMFontJsonParser = BMFontJsonParser;
//# sourceMappingURL=BMFontJsonParser.js.map