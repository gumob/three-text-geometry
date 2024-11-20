import { Texture } from 'three';
import { BMFont } from '../types';
declare const useFont: (fontUrl: string, textureUrl: string, onProgress?: (loaded: number, total: number, percent: number) => void) => {
    font: BMFont;
    texture: Texture;
    isLoading: boolean;
};
export { useFont };
//# sourceMappingURL=hook.d.ts.map