/* eslint @typescript-eslint/no-empty-function: 0 */
/* eslint @typescript-eslint/no-explicit-any: 0 */
/* eslint @typescript-eslint/no-unsafe-member-access: 0 */
/* eslint @typescript-eslint/no-unsafe-call: 0 */
/* eslint @typescript-eslint/no-unsafe-argument: 0 */
/**
 * 
 * https://github.com/Jam3/load-bmfont
 * 
 */
import axios, { AxiosError, AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from 'axios';
import * as mime from 'mime-types';
import { BMFontJsonParser, BMFontBinaryParser, BMFontXMLParser } from '~/parser';
import { BMFont, isBMFont } from '~/types';
import { isBinary } from '~/utils';

enum BMFontLoaderErrorType {
    LoadError = 'LoadError',
    ParseError = 'ParseError',
}

class BMFontLoaderError extends Error {
    constructor(type: BMFontLoaderErrorType, message: string | undefined = undefined) {
        let msg: string;
        switch (type) {
            case BMFontLoaderErrorType.ParseError:
                msg = 'Failed to parse json data';
                break;
            case BMFontLoaderErrorType.LoadError:
                msg = message ? message : 'Failed to load json data';
                break;
            default:
                msg = 'Unknown Error';
                break;
        }
        super(msg);
        this.name = type;
        Object.setPrototypeOf(this, BMFontLoaderError.prototype);
    }
}

class BMFontLoader {
    constructor() { }

    loadJson(uri: string, config: AxiosRequestConfig | undefined = undefined): Promise<BMFont> {
        return new Promise((resolve, reject) => {
            axios
                .get(uri, config)
                .then((response: AxiosResponse<object>) => {
                    const result: BMFont | null = new BMFontJsonParser().parse(response.data);
                    if (result && isBMFont(result)) resolve(result);
                    else reject(new BMFontLoaderError(BMFontLoaderErrorType.ParseError));

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
                    const result: BMFont | null = new BMFontXMLParser().parse(response.data.toString());
                    if (result && isBMFont(result)) resolve(result);
                    else reject(new BMFontLoaderError(BMFontLoaderErrorType.ParseError));

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
                    const result: BMFont | null = new BMFontBinaryParser().parse(data);
                    if (result && isBMFont(result)) resolve(result);
                    else reject(new BMFontLoaderError(BMFontLoaderErrorType.ParseError));

                })
                .catch((error: AxiosError) => {
                    reject(new BMFontLoaderError(BMFontLoaderErrorType.LoadError, error.message));
                });
        });
    }

    //  parseFont(data: any): BMFont | null {
    //      try {
    //         console.log(typeof data);
    //          if (typeof data === 'string' && data.trim().startsWith('{')) {
    //              return new BMFontJsonParser().parse(data);
    //          }
    //          else if (typeof data === 'string' && data.trim().startsWith('<?xml')) {
    //              return new BMFontXMLParser().parse(data.toString());
    //          }
    //          else if (typeof data === 'object' && isBinary(data)) {
    //              return new BMFontBinaryParser().parse(typeof data === 'string' ? Buffer.from(data, 'binary') : data);
    //          }
    //          // else if (mime.lookup(data) == 'application/xml' || data.charAt(0) === '<') {
    //          //     return parseXML(data.toString().trim());
    //          // }
    //          // else {
    //          //     return parseASCII(data.toString().trim());
    //          // }
    //          return null;
    //      } catch (e) {
    //          return null;
    //      }
    //  }
}

export { BMFontLoader, BMFontLoaderError, BMFontLoaderErrorType };