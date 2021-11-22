import { BMFont } from "../types";
/**
 * # How to create a json schema
 * npm install -g quicktype
 * quicktype ./src/types/BMFont.ts -o ./src/parser/BMFontJsonSchema.json --lang schema
 */
declare class BMFontAsciiParser {
    parse(data: string): BMFont;
}
export { BMFontAsciiParser };
//# sourceMappingURL=BMFontAsciiParser.d.ts.map