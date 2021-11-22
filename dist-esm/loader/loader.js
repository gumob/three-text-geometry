/* eslint @typescript-eslint/no-empty-function: 0 */
/* eslint @typescript-eslint/no-explicit-any: 0 */
/* eslint @typescript-eslint/no-unsafe-member-access: 0 */
/* eslint @typescript-eslint/no-unsafe-call: 0 */
/* eslint @typescript-eslint/no-unsafe-argument: 0 */
import axios from 'axios';
import { BMFontLoaderError, BMFontLoaderErrorType } from "../error";
import { BMFontAsciiParser, BMFontBinaryParser, BMFontJsonParser, BMFontXMLParser } from "../parser";
class BMFontLoader {
    constructor() { }
    loadJson(uri, config = undefined) {
        return new Promise((resolve, reject) => {
            axios
                .get(uri, config)
                .then((response) => {
                resolve(new BMFontJsonParser().parse(response.data));
            })
                .catch((error) => {
                reject(new BMFontLoaderError(BMFontLoaderErrorType.LoadError, error.message));
            });
        });
    }
    loadXML(uri, config = undefined) {
        return new Promise((resolve, reject) => {
            axios
                .get(uri, config)
                .then((response) => {
                resolve(new BMFontXMLParser().parse(response.data.toString()));
            })
                .catch((error) => {
                reject(new BMFontLoaderError(BMFontLoaderErrorType.LoadError, error.message));
            });
        });
    }
    loadAscii(uri, config = undefined) {
        return new Promise((resolve, reject) => {
            axios
                .get(uri, config)
                .then((response) => {
                resolve(new BMFontAsciiParser().parse(response.data.toString()));
            })
                .catch((error) => {
                reject(new BMFontLoaderError(BMFontLoaderErrorType.LoadError, error.message));
            });
        });
    }
    loadBinary(uri, config = undefined) {
        return new Promise((resolve, reject) => {
            axios
                .get(uri, config)
                .then((response) => {
                const data = typeof response.data === 'string'
                    ? Buffer.from(response.data, 'binary')
                    : response.data;
                resolve(new BMFontBinaryParser().parse(data));
            })
                .catch((error) => {
                reject(new BMFontLoaderError(BMFontLoaderErrorType.LoadError, error.message));
            });
        });
    }
}
export { BMFontLoader };
//# sourceMappingURL=loader.js.map