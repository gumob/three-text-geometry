import Ajv from 'ajv';
import { BMFontLoaderError, BMFontLoaderErrorType } from "../error";
import schema from './BMFontJsonSchema.json';
/**
 * # How to create a json schema
 * npm install -g quicktype
 * quicktype ./src/types/BMFont.ts -o ./src/parser/BMFontJsonSchema.json --lang schema
 */
class BMFontJsonParser {
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