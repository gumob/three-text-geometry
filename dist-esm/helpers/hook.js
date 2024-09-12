import { useLoader } from '@react-three/fiber';
import useSWR from 'swr';
import { TextureLoader } from 'three';
import { BMFontAsciiParser, BMFontBinaryParser, BMFontJsonParser, BMFontXMLParser } from '../parser';
const useFont = (fontUrl, textureUrl) => {
    const { data: font, isLoading } = useSWR(fontUrl, (url) => fetch(url)
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
    }));
    const texture = useLoader(TextureLoader, textureUrl);
    return {
        data: {
            font: font,
            texture: texture,
        },
        isLoading: isLoading,
    };
};
export { useFont };
//# sourceMappingURL=hook.js.map