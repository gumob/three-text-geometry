import { extend, ThreeElement, ThreeElements } from '@react-three/fiber';

import TextGeometry from '../TextGeometry';

/* Extend with constructor function for @react-three/fiber 9 */
extend({ TextGeometry: TextGeometry });

/**
 * TextGeometryProps is a type that extends ThreeElement with specific type parameters.
 * It is used to define the props for the TextGeometry component.
 */
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
  namespace JSX {
    interface IntrinsicElements extends TextGeometryElements {}
  }
}

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements extends TextGeometryElements {}
  }
}

declare module 'react/jsx-runtime' {
  namespace JSX {
    interface IntrinsicElements extends TextGeometryElements {}
  }
}
