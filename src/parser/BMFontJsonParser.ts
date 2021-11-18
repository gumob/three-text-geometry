import Ajv from 'ajv'
import schema from './BMFontJsonSchema.json'
import { BMFont } from '~/types';

/**
 * # How to create a json schema
 * npm install -g quicktype
 * quicktype ./src/types/BMFont.ts -o ./src/parser/BMFontJsonSchema.json --lang schema
 */

class BMFontJsonParser {
    public parse(json: object): BMFont | null {
        try {
            const ajv = new Ajv();
            const validate = ajv.compile(schema);
            const valid: boolean = validate(json);
            if (valid) {
                return json as BMFont;
            } else {
                return null;
            }
        } catch (error: any) {
            console.error(error);
            return null;
        }
    }
}

export { BMFontJsonParser };

