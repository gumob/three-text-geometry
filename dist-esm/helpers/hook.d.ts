import { Texture } from 'three';
import { BMFont } from '../types';
interface FontProgressCallback {
    (loaded: number, total: number, percent: number): void;
}
declare const useFont: (fontUrl?: string | null, textureUrl?: string | null, onProgress?: FontProgressCallback | null) => {
    font: BMFont;
    texture: Texture;
    isLoading: boolean;
};
export { useFont, FontProgressCallback };
//# sourceMappingURL=hook.d.ts.map