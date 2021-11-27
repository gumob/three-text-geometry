import { BMFont } from "../types";
/**
 * # How to create a json schema
 * npm install -g quicktype
 * quicktype ./src/types/BMFont.ts -o ./src/parser/BMFontJsonSchema.json --lang schema
 */
declare class BMFontJsonParser {
    parse(json: object | string): BMFont;
}
export { BMFontJsonParser };
//# sourceMappingURL=BMFontJsonParser.d.ts.map