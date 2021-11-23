import { BMFont } from "../types";
/**
 * # How to create a json schema
 * npm install -g quicktype
 * quicktype ./src/types/BMFont.ts -o ./src/parser/BMFontJsonSchema.json --lang schema
 */
declare class BMFontXMLParser {
    parse(xml: string): BMFont;
}
export { BMFontXMLParser };
//# sourceMappingURL=BMFontXMLParser.d.ts.map