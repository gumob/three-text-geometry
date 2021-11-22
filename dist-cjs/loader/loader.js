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
class BMFontLoader {
    constructor() { }
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
//# sourceMappingURL=loader.js.map