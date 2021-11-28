/* eslint @typescript-eslint/no-empty-function: 0 */
/* eslint @typescript-eslint/no-explicit-any: 0 */
/* eslint @typescript-eslint/no-unsafe-member-access: 0 */
/* eslint @typescript-eslint/no-unsafe-call: 0 */
/* eslint @typescript-eslint/no-unsafe-argument: 0 */

import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { BMFontLoaderError, BMFontLoaderErrorType } from '~/error'
import { BMFontAsciiParser, BMFontBinaryParser, BMFontJsonParser, BMFontXMLParser } from '~/parser'
import { BMFont } from '~/types'

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
  constructor() {}

  /**
   * The function for loading bitmap font data in JSON format.
   *
   * ```typescript
   * import { BMFontLoader } from 'three-text-geometry'
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
  loadJson(uri: string, config: AxiosRequestConfig | undefined = undefined): Promise<BMFont> {
    return new Promise((resolve, reject) => {
      axios
        .get(uri, config)
        .then((response: AxiosResponse<object>) => {
          resolve(new BMFontJsonParser().parse(response.data))
        })
        .catch((error: AxiosError) => {
          reject(new BMFontLoaderError(BMFontLoaderErrorType.LoadError, error.message))
        })
    })
  }

  /**
   * The function for loading bitmap font data in XML format.
   *
   * ```typescript
   * import { BMFontLoader } from 'three-text-geometry'
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
  loadXML(uri: string, config: AxiosRequestConfig | undefined = undefined): Promise<BMFont> {
    return new Promise((resolve, reject) => {
      axios
        .get(uri, config)
        .then((response: AxiosResponse<object>) => {
          resolve(new BMFontXMLParser().parse(response.data.toString()))
        })
        .catch((error: AxiosError) => {
          reject(new BMFontLoaderError(BMFontLoaderErrorType.LoadError, error.message))
        })
    })
  }

  /**
   * The function for loading bitmap font data in ASCII format.
   *
   * ```typescript
   * import { BMFontLoader } from 'three-text-geometry'
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
  loadAscii(uri: string, config: AxiosRequestConfig | undefined = undefined): Promise<BMFont> {
    return new Promise((resolve, reject) => {
      axios
        .get(uri, config)
        .then((response: AxiosResponse<object>) => {
          resolve(new BMFontAsciiParser().parse(response.data.toString()))
        })
        .catch((error: AxiosError) => {
          reject(new BMFontLoaderError(BMFontLoaderErrorType.LoadError, error.message))
        })
    })
  }

  /**
   * The function for loading bitmap font data in Binary format.
   *
   * ```typescript
   * import { BMFontLoader } from 'three-text-geometry'
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
  loadBinary(uri: string, config: AxiosRequestConfig | undefined = undefined): Promise<BMFont> {
    return new Promise((resolve, reject) => {
      axios
        .get(uri, config)
        .then((response: AxiosResponse<object>) => {
          const data =
            typeof response.data === 'string'
              ? Buffer.from(response.data, 'binary')
              : (response.data as Buffer)
          resolve(new BMFontBinaryParser().parse(data))
        })
        .catch((error: AxiosError) => {
          reject(new BMFontLoaderError(BMFontLoaderErrorType.LoadError, error.message))
        })
    })
  }
}

export { BMFontLoader }
