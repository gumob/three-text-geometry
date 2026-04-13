/**
 * Ambient module declarations for Three.js WebGPU and TSL subpath imports.
 *
 * These are needed because tsconfig.cjs.json uses moduleResolution: "node"
 * which does not support package.json exports field. The ESM build uses
 * moduleResolution: "bundler" which resolves these natively; these
 * declarations are harmless there (native resolution takes precedence).
 *
 * @module three-webgpu
 */

declare module 'three/webgpu' {
  export * from 'three/src/Three.WebGPU.js';
}

declare module 'three/tsl' {
  export * from 'three/src/Three.TSL.js';
}
