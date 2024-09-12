import { Texture } from 'three';
import { BMFont } from '../types';
declare const useFont: (fontUrl: string, textureUrl: string) => {
    data: {
        font: BMFont;
        texture: Texture;
    };
    isLoading: boolean;
};
export { useFont };
//# sourceMappingURL=hook.d.ts.map