import Ajv from 'ajv';
import { BMFontError } from '../error';
import schema from './BMFontJsonSchema.json';
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
                throw new BMFontError('Invalid json data');
            }
        }
        catch (error) {
            throw new BMFontError(error.message);
        }
    }
}
export { BMFontJsonParser };
//# sourceMappingURL=BMFontJsonParser.js.map