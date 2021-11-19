import Ajv from 'ajv'
import schema from './BMFontJsonSchema.json'
import { BMFont } from '~/types';
import { BMFontLoaderError, BMFontLoaderErrorType } from '~/error';

/**
 * # How to create a json schema
 * npm install -g quicktype
 * quicktype ./src/types/BMFont.ts -o ./src/parser/BMFontJsonSchema.json --lang schema
 */

class BMFontJsonParser {
    public parse(json: object): BMFont {
        try {
            const ajv = new Ajv();
            const validate = ajv.compile(schema);
            const valid: boolean = validate(json);
            if (valid) {
                return json as BMFont;
            } else {
                throw new BMFontLoaderError(BMFontLoaderErrorType.ParseError, 'Invalid json data');
            }
        } catch (error: any) {
            throw new BMFontLoaderError(BMFontLoaderErrorType.ParseError, error.message);
        }
    }
}

export { BMFontJsonParser };

