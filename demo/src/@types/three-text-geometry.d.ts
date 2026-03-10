import type { ThreeElement } from '@react-three/fiber';
import type TextGeometry from 'three-text-geometry';

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      textGeometry: ThreeElement<typeof TextGeometry>;
    }
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      textGeometry: ThreeElement<typeof TextGeometry>;
    }
  }
}
