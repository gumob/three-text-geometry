import { useLoader } from '@react-three/fiber';
import useSWR from 'swr';
import { Texture, TextureLoader } from 'three';

import { BMFontAsciiParser, BMFontBinaryParser, BMFontJsonParser, BMFontXMLParser } from '../parser';
import { BMFont } from '../types';

/**
 * Custom hook to load a font and its texture.
 *
 * @param {string} fontUrl - The URL of the font file.
 * @param {string} textureUrl - The URL of the texture file.
 * @returns {{ font: FontData; isFontLoading: boolean }} - The font data and loading state.
 */
const useFont = (fontUrl: string, textureUrl: string): { data: { font: BMFont; texture: Texture }; isLoading: boolean } => {
  const { data: font, isLoading } = useSWR(
    fontUrl,
    (url) =>
      fetch(url)
        .then((res) => res.text())
        .then((text) => {
          const extension = fontUrl.split('.').pop()?.toLowerCase();
          switch (extension) {
            case 'xml':
              return new BMFontXMLParser().parse(text);
            case 'bin':
              return new BMFontBinaryParser().parse(Buffer.from(text, 'utf-8'));
            case 'json':
              return new BMFontJsonParser().parse(text);
            case 'fnt':
            default:
              return new BMFontAsciiParser().parse(text);
          }
        }) as Promise<BMFont>,
  );
  const texture = useLoader(TextureLoader, textureUrl);
  return {
    data: {
      font: font as BMFont,
      texture: texture,
    },
    isLoading: isLoading,
  };
};

export { useFont };
