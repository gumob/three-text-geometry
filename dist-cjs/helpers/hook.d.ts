import { Texture } from 'three';
import { BMFont } from '../types';
declare const useFont: (name: string, size: number) => {
    data: {
        font: BMFont;
        texture: Texture;
    };
    isLoading: boolean;
};
export { useFont };
//# sourceMappingURL=hook.d.ts.map