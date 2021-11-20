/* eslint @typescript-eslint/no-empty-function: 0 */
/* eslint @typescript-eslint/no-explicit-any: 0 */
/* eslint @typescript-eslint/no-unsafe-member-access: 0 */
/* eslint @typescript-eslint/no-unsafe-call: 0 */
/* eslint @typescript-eslint/no-unsafe-argument: 0 */

import axios, { AxiosError, AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from 'axios';
import { BMFontLoaderError, BMFontLoaderErrorType } from '~/error';
import { BMFontJsonParser, BMFontBinaryParser, BMFontXMLParser, BMFontAsciiParser } from '~/parser';
import { BMFont } from '~/types';

class BMFontLoader {
    constructor() { }

    loadJson(uri: string, config: AxiosRequestConfig | undefined = undefined): Promise<BMFont> {
        return new Promise((resolve, reject) => {
            axios
                .get(uri, config)
                .then((response: AxiosResponse<object>) => {
                    resolve(new BMFontJsonParser().parse(response.data));

                })
                .catch((error: AxiosError) => {
                    reject(new BMFontLoaderError(BMFontLoaderErrorType.LoadError, error.message));
                });
        });
    }

    loadXML(uri: string, config: AxiosRequestConfig | undefined = undefined): Promise<BMFont> {
        return new Promise((resolve, reject) => {
            axios
                .get(uri, config)
                .then((response: AxiosResponse<object>) => {
                    resolve(new BMFontXMLParser().parse(response.data.toString()));

                })
                .catch((error: AxiosError) => {
                    reject(new BMFontLoaderError(BMFontLoaderErrorType.LoadError, error.message));
                });
        });
    }

    loadAscii(uri: string, config: AxiosRequestConfig | undefined = undefined): Promise<BMFont> {
        return new Promise((resolve, reject) => {
            axios
                .get(uri, config)
                .then((response: AxiosResponse<object>) => {
                    resolve(new BMFontAsciiParser().parse(response.data.toString()));
                })
                .catch((error: AxiosError) => {
                    reject(new BMFontLoaderError(BMFontLoaderErrorType.LoadError, error.message));
                });
        });
    }

    loadBinary(uri: string, config: AxiosRequestConfig | undefined = undefined): Promise<BMFont> {
        return new Promise((resolve, reject) => {
            axios
                .get(uri, config)
                .then((response: AxiosResponse<object>) => {
                    const data = (typeof response.data === 'string') ? Buffer.from(response.data, 'binary') : response.data as Buffer;
                    resolve(new BMFontBinaryParser().parse(data));

                })
                .catch((error: AxiosError) => {
                    reject(new BMFontLoaderError(BMFontLoaderErrorType.LoadError, error.message));
                });
        });
    }
}

export { BMFontLoader };