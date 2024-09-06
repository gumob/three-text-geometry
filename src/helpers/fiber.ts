import { BufferGeometryNode, extend, Node, Overwrite } from '@react-three/fiber';
import { EventHandlers } from '@react-three/fiber/dist/declarations/src/core/events';

import TextGeometry from '../TextGeometry';
import { TextGeometryOption } from '../types';

extend({ TextGeometry });

/**
 * TextGeometryNode is a type that extends the Node type and takes two type parameters, TextGeometry and typeof TextGeometry.
 * It is used to create a props object for the TextGeometry component.
 *
 * @template T - The type of the TextGeometry class.
 * @template P - The type of the props for the TextGeometry component.
 */
export type TextGeometryNode<T, P> = Overwrite<
  Node<T, P>,
  {
    text: string;
    option: TextGeometryOption;
  }
> &
  BufferGeometryNode<TextGeometry, typeof TextGeometry> &
  EventHandlers;

/**
 * TextGeometryProps is a type that extends the BufferGeometryNode type and takes two type parameters, TextGeometry and typeof TextGeometry.
 * It is used to create a props object for the TextGeometry component.
 *
 * @template T - The type of the TextGeometry class.
 * @template P - The type of the props for the TextGeometry component.
 */
export type TextGeometryProps = TextGeometryNode<TextGeometry, typeof TextGeometry>;

/**
 * TextGeometryElements is an interface that defines the elements for the TextGeometry component.
 * It has a single property, textGeometry, which is of type TextGeometryProps.
 *
 * @interface TextGeometryElements
 */
export interface TextGeometryElements {
  /**
   * TextGeometry component
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
  namespace JSX {
    interface IntrinsicElements {
      textGeometry: TextGeometryNode<TextGeometry, typeof TextGeometry>;
    }
  }
}