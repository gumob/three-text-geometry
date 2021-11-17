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
import axios, { AxiosError, AxiosResponse } from 'axios';
import * as mime from 'mime-types';
import { BMFontJsonParser } from '~/parser';
import { BMFont } from '~/types';

class BMFontLoader {
    constructor() {}
    
    load(uri: string): Promise<BMFont> {
        console.log('uri', uri);
        return new Promise((resolve, reject) => {
            axios
                .get(uri)
                // .then((response: AxiosResponse<any>) => {
                .then((response: AxiosResponse) => {
                    console.log('response', response);
                    const result: BMFont | null = this.parseFont(response.data);
                    if (result) resolve(result);
                    else reject('Failed to validate json data.');
                })
                .catch((error: AxiosError) => {
                    console.error('error', error);
                    reject(error);
                });
        });
    }

    parseFont(data: any): BMFont | null {
        try {
            if (typeof data === 'string' && mime.lookup(data) == 'application/json' || data.charAt(0) === '{') {
                return new BMFontJsonParser().parse(data.toString());
            }
            // else if (isBinary(data)) {
            //     return new BMFontBinaryParser().parse(typeof data === 'string' ? Buffer.from(data, 'binary') : data);
            // }
            // else if (mime.lookup(data) == 'application/xml' || data.charAt(0) === '<') {
            //     return parseXML(data.toString().trim());
            // }
            // else {
            //     return parseASCII(data.toString().trim());
            // }
            return null;
        } catch (e) {
            return null;
        }
    }
}

export { BMFontLoader };