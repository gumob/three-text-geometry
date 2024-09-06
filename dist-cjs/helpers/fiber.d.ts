import { BufferGeometryNode, Node, Overwrite } from '@react-three/fiber';
import { EventHandlers } from '@react-three/fiber/dist/declarations/src/core/events';
import TextGeometry from '../TextGeometry';
import { TextGeometryOption } from '../types';
type TextGeometryNode<T, P> = Overwrite<Node<T, P>, {
    text: string;
    option: TextGeometryOption;
}> & BufferGeometryNode<TextGeometry, typeof TextGeometry> & EventHandlers;
declare global {
    namespace JSX {
        interface IntrinsicElements {
            textGeometry: TextGeometryNode<TextGeometry, typeof TextGeometry>;
        }
    }
}
export {};
//# sourceMappingURL=fiber.d.ts.map