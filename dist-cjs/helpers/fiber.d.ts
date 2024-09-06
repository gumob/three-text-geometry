import { BufferGeometryNode, Node, Overwrite } from '@react-three/fiber';
import { EventHandlers } from '@react-three/fiber/dist/declarations/src/core/events';
import TextGeometry from '../TextGeometry';
export type TextGeometryNode<T, P> = Overwrite<Node<T, P>, {
    text: string;
}> & BufferGeometryNode<TextGeometry, typeof TextGeometry> & EventHandlers;
export type TextGeometryProps = TextGeometryNode<TextGeometry, typeof TextGeometry>;
export interface TextGeometryElements {
    textGeometry: TextGeometryProps;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            textGeometry: TextGeometryNode<TextGeometry, typeof TextGeometry>;
        }
    }
}
//# sourceMappingURL=fiber.d.ts.map