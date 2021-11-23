/**
 *
 * https://github.com/Jam3/parse-bmfont-binary
 *
 */
/// <reference types="node" />
import { Buffer } from 'buffer';
import { BMFont } from "../types";
declare class BMFontBinaryParser {
    private static HEADER;
    parse(buf: Buffer): BMFont;
    private readBlock;
    private readInfo;
    private readCommon;
    private readPages;
    private readChars;
    private readKernings;
    readStringNT(buf: Buffer, offset: number): string;
    readNameNT(buf: Buffer, offset: number): Buffer;
}
export { BMFontBinaryParser };
//# sourceMappingURL=BMFontBinaryParser.d.ts.map