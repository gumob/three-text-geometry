"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BMFontAsciiParser = void 0;
const error_1 = require("../error");
const types_1 = require("../types");
/**
 * The class for parsing font data in ASCII format.
 *
 * @class BMFontAsciiParser
 */
class BMFontAsciiParser {
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
    parse(data) {
        data = data.trim();
        const lines = data.split(/\r\n?|\n/g);
        if (lines.length === 0)
            throw new error_1.BMFontLoaderError(error_1.BMFontLoaderErrorType.ParseError, 'No data in BMFont file');
        const result = (0, types_1.DefaultBMFont)();
        lines.forEach((line, idx) => {
            line = line.replace(/[\s\t]+/g, ' ').trim();
            if (!line)
                return;
            const space = line.indexOf(' ');
            if (space === -1)
                throw new error_1.BMFontLoaderError(error_1.BMFontLoaderErrorType.ParseError, 'No page data');
            const rootKey = line.substring(0, space);
            const keyValues = {};
            line
                .substring(space + 1)
                .replace(/[\s\t]+/g, ' ')
                .split(' ')
                .forEach((str) => {
                const arr = str.split('=');
                const key = arr[0];
                const value = arr[1];
                if (/^-?\d+\.?\d*$/.test(value))
                    keyValues[key] = +value;
                else if (/^[\d,]+/.test(value))
                    keyValues[key] = value.split(',').map((value) => +value);
                else if (/^("|').*("|')$/.test(value))
                    keyValues[key] = value.replace(/^("|')(.*)("|')$/g, '$2');
                else
                    keyValues[key] = value;
            });
            switch (rootKey) {
                case 'info':
                    result.info = keyValues;
                    break;
                case 'common':
                    result.common = keyValues;
                    break;
                case 'distanceField':
                    result.distanceField = keyValues;
                    break;
                case 'page':
                    result.pages.push(keyValues.file);
                    break;
                case 'chars':
                    break;
                case 'char':
                    result.chars.push(keyValues);
                    break;
                case 'kernings':
                    break;
                case 'kerning':
                    result.kernings.push(keyValues);
                    break;
                default:
                    break;
            }
        });
        if (JSON.stringify(result.info) === JSON.stringify((0, types_1.DefaultBMFontInfo)()))
            throw new error_1.BMFontLoaderError(error_1.BMFontLoaderErrorType.ParseError, `No info data. \n${JSON.stringify(result)}`);
        if (JSON.stringify(result.common) === JSON.stringify((0, types_1.DefaultBMFontCommon)()))
            throw new error_1.BMFontLoaderError(error_1.BMFontLoaderErrorType.ParseError, `No common data. \n${JSON.stringify(result)}`);
        if (result.pages.length == 0)
            throw new error_1.BMFontLoaderError(error_1.BMFontLoaderErrorType.ParseError, `No page data. \n${JSON.stringify(result)}`);
        if (result.chars.length == 0)
            throw new error_1.BMFontLoaderError(error_1.BMFontLoaderErrorType.ParseError, `No char data. \n${JSON.stringify(result)}`);
        // if (result.kernings.length == 0)
        //     throw new BMFontLoaderError(BMFontLoaderErrorType.ParseError, `No kernings data. \n${JSON.stringify(result)}`);
        // console.log(result);
        return result;
    }
}
exports.BMFontAsciiParser = BMFontAsciiParser;
//# sourceMappingURL=BMFontAsciiParser.js.map