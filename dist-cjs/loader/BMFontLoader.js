"use strict";
/* eslint @typescript-eslint/no-empty-function: 0 */
/* eslint @typescript-eslint/no-explicit-any: 0 */
/* eslint @typescript-eslint/no-unsafe-member-access: 0 */
/* eslint @typescript-eslint/no-unsafe-call: 0 */
/* eslint @typescript-eslint/no-unsafe-argument: 0 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.BMFontLoader = void 0;
const tslib_1 = require("tslib");
const axios_1 = (0, tslib_1.__importDefault)(require("axios"));
const error_1 = require("../error");
const parser_1 = require("../parser");
/**
 * The class that load a bitmap font.
 * The supported data format are ASCII, JSON, XML, and Binary.
 *
 * @class BMFontLoader
 */
class BMFontLoader {
    /**
     * The constructor that creates an instance of BMFontLoader.
     *
     * @memberof BMFontLoader
     */
    constructor() { }
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
    loadJson(uri, config = undefined) {
        return new Promise((resolve, reject) => {
            axios_1.default
                .get(uri, config)
                .then((response) => {
                resolve(new parser_1.BMFontJsonParser().parse(response.data));
            })
                .catch((error) => {
                reject(new error_1.BMFontLoaderError(error_1.BMFontLoaderErrorType.LoadError, error.message));
            });
        });
    }
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
    loadXML(uri, config = undefined) {
        return new Promise((resolve, reject) => {
            axios_1.default
                .get(uri, config)
                .then((response) => {
                resolve(new parser_1.BMFontXMLParser().parse(response.data.toString()));
            })
                .catch((error) => {
                reject(new error_1.BMFontLoaderError(error_1.BMFontLoaderErrorType.LoadError, error.message));
            });
        });
    }
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
    loadAscii(uri, config = undefined) {
        return new Promise((resolve, reject) => {
            axios_1.default
                .get(uri, config)
                .then((response) => {
                resolve(new parser_1.BMFontAsciiParser().parse(response.data.toString()));
            })
                .catch((error) => {
                reject(new error_1.BMFontLoaderError(error_1.BMFontLoaderErrorType.LoadError, error.message));
            });
        });
    }
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
    loadBinary(uri, config = undefined) {
        return new Promise((resolve, reject) => {
            axios_1.default
                .get(uri, config)
                .then((response) => {
                const data = typeof response.data === 'string'
                    ? Buffer.from(response.data, 'binary')
                    : response.data;
                resolve(new parser_1.BMFontBinaryParser().parse(data));
            })
                .catch((error) => {
                reject(new error_1.BMFontLoaderError(error_1.BMFontLoaderErrorType.LoadError, error.message));
            });
        });
    }
}
exports.BMFontLoader = BMFontLoader;
//# sourceMappingURL=BMFontLoader.js.map