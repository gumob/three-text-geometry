import type { ThreeElements } from '@react-three/fiber';

import type { TextGeometryProps } from '../../src/helpers/fiber';

describe('ThreeElements type extension', () => {
  /**
   * Type-level test: ThreeElements['textGeometry'] should be assignable to TextGeometryProps
   */
  test('ThreeElements["textGeometry"] is assignable to TextGeometryProps', () => {
    // TypeScript only: this will fail to compile if the type is not assignable
    type Assert<T extends true> = T;
    type IsAssignable = ThreeElements['textGeometry'] extends TextGeometryProps ? true : false;
    const _assert: Assert<IsAssignable> = true;
    expect(_assert).toBe(true);
  });
});
