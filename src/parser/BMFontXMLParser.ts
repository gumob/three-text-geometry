import Ajv from 'ajv'
import { XMLParser, XMLBuilder, XMLValidator} from 'fast-xml-parser';

import { BMFont } from '~/types';
// import xml from '~/parser/';

/**
 * # How to create a json schema
 * npm install -g quicktype
 * quicktype ./src/types/BMFont.ts -o ./src/parser/BMFontJsonSchema.json --lang schema
 */

class BMFontXMLParser {
    public parse(json: string): BMFont | null {
        const ajv = new Ajv();
        // const validate = ajv.compile(xmlSchema);
        // const valid: boolean = validate(json);
        // if (valid) {
        //     return JSON.parse(json) as BMFont;
        // } else {
        //     return null;
        // }
        return null
    }
}

export { BMFontXMLParser };

