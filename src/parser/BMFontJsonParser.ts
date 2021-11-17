import Ajv from 'ajv'
import schema from './BMFontJsonSchema.json'
import { BMFont } from '~/types';

/**
 * # How to create a json schema
 * npm install -g quicktype
 * quicktype ./src/types/BMFont.ts -o ./src/parser/BMFontJsonSchema.json --lang schema
 */

class BMFontJsonParser {
    public parse(json: string): BMFont | null {
        const ajv = new Ajv();
        const validate = ajv.compile(schema);
        const valid: boolean = validate(json);
        if (valid) {
            return JSON.parse(json) as BMFont;
        } else {
            return null;
        }
    }
}

export { BMFontJsonParser };

