import type { ThreeElement, ThreeElements } from '@react-three/fiber';

import TextGeometry from '../TextGeometry';

/**
 * Register TextGeometry with React Three Fiber.
 * Call this once in your app setup.
 *
 * @example
 * // Catalog pattern (R3F v8/v9)
 * import { extend } from '@react-three/fiber';
 * import { registerTextGeometry } from 'three-text-geometry';
 * registerTextGeometry(extend);
 * // <textGeometry ... />
 *
 * @example
 * // Factory pattern (R3F v9)
 * import { extend } from '@react-three/fiber';
 * import TextGeometry from 'three-text-geometry';
 * const TextGeometryEl = extend(TextGeometry);
 * // <TextGeometryEl ... />
 *
 * @param {function} extend - The extend function from @react-three/fiber.
 */
export function registerTextGeometry(extend: (catalog: Record<string, unknown>) => void): void {
  extend({ TextGeometry });
}

/**
 * TextGeometryProps is a type that defines the props for the TextGeometry component.
 * It is used to define the props for the TextGeometry component in React Three Fiber.
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
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    // interface IntrinsicElements {
    //   textGeometry: TextGeometryProps;
    // }
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface IntrinsicElements extends TextGeometryElements {}
  }
}
