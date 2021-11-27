import { AxiosRequestConfig } from 'axios';
import { BMFont } from "../types";
/**
 * The class that load a bitmap font.
 * The supported data format are ASCII, JSON, XML, and Binary.
 *
 * @class BMFontLoader
 */
declare class BMFontLoader {
    /**
     * The constructor that creates an instance of BMFontLoader.
     *
     * @memberof BMFontLoader
     */
    constructor();
    /**
     * The function for loading bitmap font data in JSON format.
     *
     * @param {string}                         uri                 The uri of bitmap font data.
     * @param {AxiosRequestConfig | undefined} [config=undefined]  Configurations for requests conforming to
     *                                                             `AxiosRequestConfig`.
     * @returns {Promise<BMFont>} The Promise instance.
     * @memberof BMFontLoader
     */
    loadJson(uri: string, config?: AxiosRequestConfig | undefined): Promise<BMFont>;
    /**
     * The function for loading bitmap font data in XML format.
     *
     * @param {string}                         uri                 The uri of bitmap font data.
     * @param {AxiosRequestConfig | undefined} [config=undefined]  Configurations for requests conforming to
     *                                                             `AxiosRequestConfig`.
     * @returns {Promise<BMFont>} The Promise instance.
     * @memberof BMFontLoader
     */
    loadXML(uri: string, config?: AxiosRequestConfig | undefined): Promise<BMFont>;
    /**
     * The function for loading bitmap font data in ASCII format.
     *
     * @param {string}                         uri                 The uri of bitmap font data.
     * @param {AxiosRequestConfig | undefined} [config=undefined]  Configurations for requests conforming to
     *                                                             `AxiosRequestConfig`.
     * @returns {Promise<BMFont>} The Promise instance.
     * @memberof BMFontLoader
     */
    loadAscii(uri: string, config?: AxiosRequestConfig | undefined): Promise<BMFont>;
    /**
     * The function for loading bitmap font data in Binary format.
     *
     * @param {string}                         uri                 The uri of bitmap font data.
     * @param {AxiosRequestConfig | undefined} [config=undefined]  Configurations for requests conforming to
     *                                                             `AxiosRequestConfig`.
     * @returns {Promise<BMFont>} The Promise instance.
     * @memberof BMFontLoader
     */
    loadBinary(uri: string, config?: AxiosRequestConfig | undefined): Promise<BMFont>;
}
export { BMFontLoader };
//# sourceMappingURL=BMFontLoader.d.ts.map