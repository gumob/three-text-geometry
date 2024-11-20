import axios from 'axios';
import useSWR from 'swr';
import { Texture, TextureLoader } from 'three';

import { BMFontAsciiParser, BMFontBinaryParser, BMFontJsonParser, BMFontXMLParser } from '../parser';
import { BMFont } from '../types';

/**
 * Custom hook to load a font and its texture.
 *
 * @param {string} fontUrl - The URL of the font file.
 * @param {string} textureUrl - The URL of the texture file.
 * @param {Function} onProgress - The function to call with the progress of the font file download.
 * @returns { font: BMFont, texture: Texture, isLoading: boolean } - The font data, texture, and loading state.
 */
const useFont = (fontUrl: string, textureUrl: string, onProgress?: (loaded: number, total: number, percent: number) => void): { font: BMFont; texture: Texture; isLoading: boolean } => {
  /** Total number of items to load. */
  const totalItems = 2;
  /** Bytes loaded for each item. */
  const itemBytesLoaded = new Array<number>(totalItems).fill(0);
  /** Bytes total for each item. */
  const itemBytesTotal = new Array<number>(totalItems).fill(0);
  /** Sum of bytes loaded. */
  let sumBytesLoaded = 0;
  /** Sum of bytes total. */
  let sumBytesTotal = 0;
  /** Sum percent completed. */
  let sumPercentCompleted = 0;
  /** Number of completed items. */
  let numCompleted = 0;

  const fontFetcher = async (url: string, loadIndex: number): Promise<BMFont> => {
    return axios
      .get(url, {
        onDownloadProgress: async (progressEvent) => {
          calculateProgress(loadIndex, progressEvent.loaded, progressEvent.total ?? 0);
        },
      })
      .then(async (res) => {
        numCompleted++;
        calculateProgress(loadIndex, itemBytesTotal[loadIndex]!, itemBytesTotal[loadIndex]!);
        const text = res.data;
        const extension = fontUrl.split('.').pop()?.toLowerCase();
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

  const textureFetcher = async (url: string, loadIndex: number): Promise<Texture> => {
    return axios
      .get(url, {
        onDownloadProgress: async (progressEvent) => {
          calculateProgress(loadIndex, progressEvent.loaded, progressEvent.total ?? 0);
        },
      })
      .then(async (res) => {
        numCompleted++;
        calculateProgress(loadIndex, itemBytesTotal[loadIndex]!, itemBytesTotal[loadIndex]!);
        return new TextureLoader().load(res.data);
      });
  };

  /**
   * Update the progress of the loading.
   *
   * @param {number} index - The index of the data.
   * @param {number} loaded - The loaded bytes.
   * @param {number} total - The total bytes.
   */
  const calculateProgress = (index: number, loaded: number, total: number) => {
    /** Update the loaded and total bytes for the item. */
    itemBytesLoaded[index] = loaded;
    itemBytesTotal[index] = total;

    /** Update the loaded and total bytes for the sum. */
    sumBytesLoaded = itemBytesLoaded.reduce((acc, curr) => acc + curr, 0);
    sumBytesTotal = itemBytesTotal.reduce((acc, curr) => acc + curr, 0);
    if (sumBytesLoaded === 0 || sumBytesTotal === 0) return;
    sumPercentCompleted = Math.round((sumBytesLoaded * 100) / sumBytesTotal);

    onProgress?.(sumBytesLoaded, sumBytesTotal, sumPercentCompleted);
  };

  const { data: font, isLoading: isFontLoading } = useSWR(fontUrl, (url) => fontFetcher(url, 0));
  const { data: texture, isLoading: isTextureLoading } = useSWR(textureUrl, (url) => textureFetcher(url, 1));

  return {
    font: font as BMFont,
    texture: texture as Texture,
    isLoading: isFontLoading || isTextureLoading,
  };
};

export { useFont };
