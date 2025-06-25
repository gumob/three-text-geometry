import { extend, ThreeElement } from '@react-three/fiber';

import TextGeometry from '../TextGeometry';

/* Extend with constructor function for @react-three/fiber 9 */
extend({ TextGeometry: TextGeometry });

/**
 * TextGeometryProps is a type that extends ThreeElement with specific type parameters.
 * It is used to define the props for the TextGeometry component.
 */
export type TextGeometryProps = ThreeElement<typeof TextGeometry>;

// --- 型拡張: ThreeElements['textGeometry'] でアクセス可能にする ---
declare module '@react-three/fiber' {
  interface ThreeElements {
    textGeometry: TextGeometryProps;
  }
}
