import { Texture } from 'three';
import { BMFont } from '../types';
interface FontProgressCallback {
    (loaded: number, total: number, percent: number): void;
}
declare const useFont: (fontUrl?: string, textureUrl?: string, onProgress?: FontProgressCallback) => {
    font: BMFont;
    texture: Texture;
    isLoading: boolean;
};
export { useFont };
//# sourceMappingURL=hook.d.ts.map