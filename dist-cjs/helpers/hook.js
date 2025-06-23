"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFont = void 0;
const tslib_1 = require("tslib");
const react_1 = require("react");
const axios_1 = tslib_1.__importDefault(require("axios"));
const swr_1 = tslib_1.__importDefault(require("swr"));
const three_1 = require("three");
const parser_1 = require("../parser");
const useFont = (fontUrl = null, textureUrl = null, onProgress = null) => {
    const callbackRef = (0, react_1.useRef)(onProgress);
    const totalItems = 2;
    const itemBytesLoaded = (0, react_1.useRef)(new Array(totalItems).fill(0));
    const itemBytesTotal = (0, react_1.useRef)(new Array(totalItems).fill(0));
    const sumBytesLoaded = (0, react_1.useRef)(0);
    const sumBytesTotal = (0, react_1.useRef)(0);
    const sumPercentCompleted = (0, react_1.useRef)(0);
    const numCompleted = (0, react_1.useRef)(0);
    const { data: font, error: fontError, isLoading: isFontLoading, } = (0, swr_1.default)(fontUrl, (url) => fontFetcher(url, 0), {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });
    const { data: texture, error: textureError, isLoading: isTextureLoading, } = (0, swr_1.default)(textureUrl, (url) => textureFetcher(url, 1), {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });
    const fontFetcher = async (url, loadIndex) => {
        if (!url)
            return null;
        return axios_1.default
            .get(url, {
            onDownloadProgress: async (progressEvent) => {
                var _a;
                calculateProgress(loadIndex, progressEvent.loaded, (_a = progressEvent.total) !== null && _a !== void 0 ? _a : 0, url);
            },
        })
            .then(async (res) => {
            var _a;
            numCompleted.current++;
            calculateProgress(loadIndex, itemBytesTotal.current[loadIndex], itemBytesTotal.current[loadIndex], url);
            const text = res.data;
            const extension = (_a = url.split('.').pop()) === null || _a === void 0 ? void 0 : _a.toLowerCase();
            switch (extension) {
                case 'xml':
                    return new parser_1.BMFontXMLParser().parse(text);
                case 'bin':
                    return new parser_1.BMFontBinaryParser().parse(Buffer.from(text, 'utf-8'));
                case 'json':
                    return new parser_1.BMFontJsonParser().parse(text);
                case 'fnt':
                    return new parser_1.BMFontAsciiParser().parse(text);
                default:
                    return new parser_1.BMFontAsciiParser().parse(text);
            }
        });
    };
    const textureFetcher = async (url, loadIndex) => {
        if (!url)
            return null;
        return axios_1.default
            .get(url, {
            responseType: 'arraybuffer',
            headers: {
                'Content-Type': 'image/*',
            },
            onDownloadProgress: async (progressEvent) => {
                var _a;
                calculateProgress(loadIndex, progressEvent.loaded, (_a = progressEvent.total) !== null && _a !== void 0 ? _a : 0, url);
            },
        })
            .then(async (res) => {
            numCompleted.current++;
            calculateProgress(loadIndex, itemBytesTotal.current[loadIndex], itemBytesTotal.current[loadIndex], url);
            const blob = new Blob([res.data], { type: res.headers['content-type'] });
            const imageUrl = URL.createObjectURL(blob);
            return new three_1.TextureLoader().load(imageUrl);
        });
    };
    const calculateProgress = (index, loaded, total, url) => {
        var _a;
        itemBytesLoaded.current[index] = loaded;
        itemBytesTotal.current[index] = total;
        const numLoadStarted = itemBytesTotal.current.filter((value) => value !== 0).length;
        const ratioLoadStarted = numLoadStarted / totalItems;
        sumBytesLoaded.current = itemBytesLoaded.current.reduce((acc, curr) => acc + curr, 0);
        sumBytesTotal.current = itemBytesTotal.current.reduce((acc, curr) => acc + curr, 0);
        if (sumBytesTotal.current === 0)
            return;
        sumPercentCompleted.current = Math.round((sumBytesLoaded.current * 100) / sumBytesTotal.current) * ratioLoadStarted;
        (_a = callbackRef.current) === null || _a === void 0 ? void 0 : _a.call(callbackRef, sumBytesLoaded.current, sumBytesTotal.current, sumPercentCompleted.current);
    };
    return {
        font: font,
        texture: texture,
        fontError,
        textureError,
        isLoading: isFontLoading || isTextureLoading,
    };
};
exports.useFont = useFont;
//# sourceMappingURL=hook.js.map