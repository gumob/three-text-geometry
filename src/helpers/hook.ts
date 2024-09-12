import { useLoader } from '@react-three/fiber';
import useSWR from 'swr';
import { Texture, TextureLoader } from 'three';

import { BMFontAsciiParser } from '../parser';
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
        .then((text) => new BMFontAsciiParser().parse(text)) as Promise<BMFont>,
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
