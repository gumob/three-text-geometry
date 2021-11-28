import { AxiosRequestConfig } from 'axios';
import { BMFont } from "../types";
declare class BMFontLoader {
    constructor();
    loadJson(uri: string, config?: AxiosRequestConfig | undefined): Promise<BMFont>;
    loadXML(uri: string, config?: AxiosRequestConfig | undefined): Promise<BMFont>;
    loadAscii(uri: string, config?: AxiosRequestConfig | undefined): Promise<BMFont>;
    loadBinary(uri: string, config?: AxiosRequestConfig | undefined): Promise<BMFont>;
}
export { BMFontLoader };
//# sourceMappingURL=BMFontLoader.d.ts.map