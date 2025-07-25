import { BufferGeometryNode, extend, ThreeElements } from '@react-three/fiber';

import TextGeometry from '../TextGeometry';

extend({ TextGeometry });

// import { Node, Overwrite } from '@react-three/fiber';
// import { EventHandlers } from '@react-three/fiber/dist/declarations/src/core/events';
// import { TextGeometryOption } from '../types';

// /**
//  * TextGeometryNode is a type that extends the Node type and takes two type parameters, TextGeometry and typeof TextGeometry.
//  * It is used to create a props object for the TextGeometry component.
//  *
//  * @template T - The type of the TextGeometry class.
//  * @template P - The type of the props for the TextGeometry component.
//  */
// type TextGeometryNode<T, P> = Overwrite<
//   Node<T, P>,
//   {
//     text: string;
//     option: TextGeometryOption;
//   }
// > &
//   BufferGeometryNode<TextGeometry, typeof TextGeometry> &
//   EventHandlers;

/**
 * TextGeometryProps is a type that extends TextGeometryNode with specific type parameters.
 * It is used to define the props for the TextGeometry component.
 */
// export type TextGeometryProps = TextGeometryNode<TextGeometry, typeof TextGeometry>;
export type TextGeometryProps = BufferGeometryNode<TextGeometry, typeof TextGeometry>;

/**
 * TextGeometryElements is an interface that extends the ThreeElements interface and includes the TextGeometry component.
 *
 * @global
 * @interface TextGeometryElements
 * @extends {ThreeElements}
 */
export interface TextGeometryElements extends ThreeElements {
  /**
   * The props for the TextGeometry component.
   *
   * @type {TextGeometryProps}
   */
  textGeometry: TextGeometryProps;
}

/**
 * Declares a global namespace for JSX.
 * It extends the IntrinsicElements interface to include the TextGeometry component.
 *
 * @global
 * @interface IntrinsicElements
 * @extends {TextGeometryElements}
 */
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    // interface IntrinsicElements {
    //   textGeometry: TextGeometryProps;
    // }
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface IntrinsicElements extends TextGeometryElements {}
  }
}
