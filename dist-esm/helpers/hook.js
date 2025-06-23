import { useRef } from 'react';
import axios from 'axios';
import useSWR from 'swr';
import { TextureLoader } from 'three';
import { BMFontAsciiParser, BMFontBinaryParser, BMFontJsonParser, BMFontXMLParser } from '../parser';
const useFont = (fontUrl = null, textureUrl = null, onProgress = null) => {
    const callbackRef = useRef(onProgress);
    const totalItems = 2;
    const itemBytesLoaded = useRef(new Array(totalItems).fill(0));
    const itemBytesTotal = useRef(new Array(totalItems).fill(0));
    const sumBytesLoaded = useRef(0);
    const sumBytesTotal = useRef(0);
    const sumPercentCompleted = useRef(0);
    const numCompleted = useRef(0);
    const { data: font, error: fontError, isLoading: isFontLoading, } = useSWR(fontUrl, (url) => fontFetcher(url, 0), {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });
    const { data: texture, error: textureError, isLoading: isTextureLoading, } = useSWR(textureUrl, (url) => textureFetcher(url, 1), {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });
    const fontFetcher = async (url, loadIndex) => {
        if (!url)
            return null;
        return axios
            .get(url, {
            onDownloadProgress: async (progressEvent) => {
                calculateProgress(loadIndex, progressEvent.loaded, progressEvent.total ?? 0, url);
            },
        })
            .then(async (res) => {
            numCompleted.current++;
            calculateProgress(loadIndex, itemBytesTotal.current[loadIndex], itemBytesTotal.current[loadIndex], url);
            const text = res.data;
            const extension = url.split('.').pop()?.toLowerCase();
            switch (extension) {
                case 'xml':
                    return new BMFontXMLParser().parse(text);
                case 'bin':
                    return new BMFontBinaryParser().parse(Buffer.from(text, 'utf-8'));
                case 'json':
                    return new BMFontJsonParser().parse(text);
                case 'fnt':
                    return new BMFontAsciiParser().parse(text);
                default:
                    return new BMFontAsciiParser().parse(text);
            }
        });
    };
    const textureFetcher = async (url, loadIndex) => {
        if (!url)
            return null;
        return axios
            .get(url, {
            responseType: 'arraybuffer',
            headers: {
                'Content-Type': 'image/*',
            },
            onDownloadProgress: async (progressEvent) => {
                calculateProgress(loadIndex, progressEvent.loaded, progressEvent.total ?? 0, url);
            },
        })
            .then(async (res) => {
            numCompleted.current++;
            calculateProgress(loadIndex, itemBytesTotal.current[loadIndex], itemBytesTotal.current[loadIndex], url);
            const blob = new Blob([res.data], { type: res.headers['content-type'] });
            const imageUrl = URL.createObjectURL(blob);
            return new TextureLoader().load(imageUrl);
        });
    };
    const calculateProgress = (index, loaded, total, url) => {
        itemBytesLoaded.current[index] = loaded;
        itemBytesTotal.current[index] = total;
        const numLoadStarted = itemBytesTotal.current.filter((value) => value !== 0).length;
        const ratioLoadStarted = numLoadStarted / totalItems;
        sumBytesLoaded.current = itemBytesLoaded.current.reduce((acc, curr) => acc + curr, 0);
        sumBytesTotal.current = itemBytesTotal.current.reduce((acc, curr) => acc + curr, 0);
        if (sumBytesTotal.current === 0)
            return;
        sumPercentCompleted.current = Math.round((sumBytesLoaded.current * 100) / sumBytesTotal.current) * ratioLoadStarted;
        callbackRef.current?.(sumBytesLoaded.current, sumBytesTotal.current, sumPercentCompleted.current);
    };
    return {
        font: font,
        texture: texture,
        fontError,
        textureError,
        isLoading: isFontLoading || isTextureLoading,
    };
};
export { useFont };
//# sourceMappingURL=hook.js.map