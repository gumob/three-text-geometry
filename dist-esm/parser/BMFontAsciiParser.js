import { BMFontLoaderError, BMFontLoaderErrorType } from "../error";
import { DefaultBMFont, DefaultBMFontCommon, DefaultBMFontInfo, } from "../types";
/**
 * # How to create a json schema
 * npm install -g quicktype
 * quicktype ./src/types/BMFont.ts -o ./src/parser/BMFontJsonSchema.json --lang schema
 */
class BMFontAsciiParser {
    parse(data) {
        data = data.trim();
        const lines = data.split(/\r\n?|\n/g);
        if (lines.length === 0)
            throw new BMFontLoaderError(BMFontLoaderErrorType.ParseError, 'No data in BMFont file');
        const result = DefaultBMFont();
        lines.forEach((line, idx) => {
            line = line.replace(/[\s\t]+/g, ' ').trim();
            if (!line)
                return;
            const space = line.indexOf(' ');
            if (space === -1)
                throw new BMFontLoaderError(BMFontLoaderErrorType.ParseError, 'No page data');
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
        if (JSON.stringify(result.info) === JSON.stringify(DefaultBMFontInfo()))
            throw new BMFontLoaderError(BMFontLoaderErrorType.ParseError, `No info data. \n${JSON.stringify(result)}`);
        if (JSON.stringify(result.common) === JSON.stringify(DefaultBMFontCommon()))
            throw new BMFontLoaderError(BMFontLoaderErrorType.ParseError, `No common data. \n${JSON.stringify(result)}`);
        if (result.pages.length == 0)
            throw new BMFontLoaderError(BMFontLoaderErrorType.ParseError, `No page data. \n${JSON.stringify(result)}`);
        if (result.chars.length == 0)
            throw new BMFontLoaderError(BMFontLoaderErrorType.ParseError, `No char data. \n${JSON.stringify(result)}`);
        // if (result.kernings.length == 0)
        //     throw new BMFontLoaderError(BMFontLoaderErrorType.ParseError, `No kernings data. \n${JSON.stringify(result)}`);
        // console.log(result);
        return result;
    }
}
export { BMFontAsciiParser };
//# sourceMappingURL=BMFontAsciiParser.js.map