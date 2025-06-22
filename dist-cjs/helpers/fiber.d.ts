import { BufferGeometryNode, ThreeElements } from '@react-three/fiber';
import TextGeometry from '../TextGeometry';
export type TextGeometryProps = BufferGeometryNode<TextGeometry, typeof TextGeometry>;
export interface TextGeometryElements extends ThreeElements {
    textGeometry: TextGeometryProps;
}
declare global {
    namespace JSX {
        interface IntrinsicElements extends TextGeometryElements {
        }
    }
}
//# sourceMappingURL=fiber.d.ts.map