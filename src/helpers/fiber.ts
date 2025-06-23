import { extend, ThreeElement, ThreeElements } from '@react-three/fiber';

import TextGeometry from '../TextGeometry';

extend({ TextGeometry });

/**
 * TextGeometryProps is a type that extends TextGeometryNode with specific type parameters.
 * It is used to define the props for the TextGeometry component.
 */
// export type TextGeometryProps = TextGeometryNode<TextGeometry, typeof TextGeometry>;
export type TextGeometryProps = ThreeElement<typeof TextGeometry>;

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
