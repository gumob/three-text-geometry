/// <reference types="node" />
import { Buffer } from 'buffer';
import { BMFont, IBMFontParser } from "../types";
declare class BMFontBinaryParser implements IBMFontParser<Buffer> {
    private static HEADER;
    parse(buf: Buffer): BMFont;
    private readBlock;
    private readInfo;
    private readCommon;
    private readPages;
    private readChars;
    private readKernings;
    private readStringNT;
    private readNameNT;
}
export { BMFontBinaryParser };
//# sourceMappingURL=BMFontBinaryParser.d.ts.map