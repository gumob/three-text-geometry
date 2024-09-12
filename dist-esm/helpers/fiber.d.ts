import { BufferGeometryNode, Node, Overwrite, ThreeElements } from '@react-three/fiber';
import { EventHandlers } from '@react-three/fiber/dist/declarations/src/core/events';
import TextGeometry from '../TextGeometry';
import { TextGeometryOption } from '../types';
type TextGeometryNode<T, P> = Overwrite<Node<T, P>, {
    text: string;
    option: TextGeometryOption;
}> & BufferGeometryNode<TextGeometry, typeof TextGeometry> & EventHandlers;
export type TextGeometryProps = TextGeometryNode<TextGeometry, typeof TextGeometry>;
export interface TextGeometryElements extends ThreeElements {
    textGeometry: TextGeometryProps;
}
declare global {
    namespace JSX {
        interface IntrinsicElements extends TextGeometryElements {
        }
    }
}
export {};
//# sourceMappingURL=fiber.d.ts.map