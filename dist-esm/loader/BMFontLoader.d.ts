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
     * ```typescript import { BMFontLoader } from 'three-text-geometry'
     *
     * const uri = 'https://example.com/font_dir/font_file.json'
     * const loader = new BMFontLoader();
     * loader.loadJson(uri).then((font: BMFont) => {
     * // Do something here...
     * }).catch((e: BMFontLoaderError) => {
     * console.error(e)
     * })
     * ```
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
     * ```typescript import { BMFontLoader } from 'three-text-geometry'
     *
     * const uri = 'https://example.com/font_dir/font_file.xml'
     * const loader = new BMFontLoader();
     * loader.loadXML(uri).then((font: BMFont) => {
     * // Do something here...
     * }).catch((e: BMFontLoaderError) => {
     * console.error(e)
     * })
     * ```
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
     * ```typescript import { BMFontLoader } from 'three-text-geometry'
     *
     * const uri = 'https://example.com/font_dir/font_file.fnt'
     * const loader = new BMFontLoader();
     * loader.loadASCII(uri).then((font: BMFont) => {
     * // Do something here...
     * }).catch((e: BMFontLoaderError) => {
     * console.error(e)
     * })
     * ```
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
     * ```typescript import { BMFontLoader } from 'three-text-geometry'
     *
     * const uri = 'https://example.com/font_dir/font_file.bin'
     * const loader = new BMFontLoader();
     * loader.loadBinary(uri).then((font: BMFont) => {
     * // Do something here...
     * }).catch((e: BMFontLoaderError) => {
     * console.error(e)
     * })
     * ```
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