import { useLoader } from '@react-three/fiber';
import useSWR from 'swr';
import { Texture, TextureLoader } from 'three';

import { BMFontAsciiParser, BMFontBinaryParser, BMFontJsonParser, BMFontXMLParser } from '../parser';
import { BMFont } from '../types';

/**
 * Custom hook to load a font and its texture.
 *
 * @param {string} name - The name of the font.
 * @param {number} size - The size of the font.
 * @returns {{ font: FontData; isFontLoading: boolean }} - The font data and loading state.
 */
const useFont = (name: string, size: number): { data: { font: BMFont; texture: Texture }; isLoading: boolean } => {
  const { data: font, isLoading } = useSWR(
    `/assets/bmfont/${name}-${size}.fnt`,
    (url) =>
      fetch(url)
        .then((res) => res.text())
        .then((text) => {
          if (name.endsWith('.fnt')) return new BMFontAsciiParser().parse(text);
          else if (name.endsWith('.json')) return new BMFontJsonParser().parse(text);
          else if (name.endsWith('.xml')) return new BMFontXMLParser().parse(text);
          else if (name.endsWith('.bin')) return new BMFontBinaryParser().parse(Buffer.from(text, 'binary'));
          else throw new Error('Unsupported font format');
        }) as Promise<BMFont>,
  );
  const texture = useLoader(TextureLoader, `/assets/bmfont/${name}-${size}.png`);
  return {
    data: {
      font: font as BMFont,
      texture: texture,
    },
    isLoading: isLoading,
  };
};

export { useFont };
