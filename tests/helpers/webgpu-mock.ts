/**
 * Mock for three/webgpu and three/tsl modules.
 *
 * The WebGPU and TSL builds of Three.js are ESM-only and depend on
 * internal node system initialization that is not available in jsdom.
 * This mock provides minimal stubs so that unit tests can verify
 * constructor logic (option handling, node assignment) without
 * requiring a real WebGPU/WebGL backend.
 */

import * as THREE from 'three';

/**
 * Minimal stub for a TSL node object.
 * Supports chained property access (.rgb, .a) and method calls (.mul()).
 */
class MockNode {
  /** Internal value for debugging. */
  _value: any;

  /**
   * Creates a MockNode.
   *
   * @param {any} value - The wrapped value.
   */
  constructor(value?: any) {
    this._value = value;
  }

  /**
   * Returns a new MockNode representing the rgb channel.
   *
   * @returns {MockNode} A MockNode for the rgb channel.
   */
  get rgb(): MockNode {
    return new MockNode('rgb');
  }

  /**
   * Returns a new MockNode representing the alpha channel.
   *
   * @returns {MockNode} A MockNode for the alpha channel.
   */
  get a(): MockNode {
    return new MockNode('a');
  }

  /**
   * Multiplies this node with another, returning a new MockNode.
   *
   * @param {any} _other - The other node to multiply with.
   * @returns {MockNode} A new MockNode representing the multiplication result.
   */
  mul(_other: any): MockNode {
    return new MockNode('mul');
  }
}

/**
 * Stub for MeshBasicNodeMaterial.
 * Stores colorNode, opacityNode, alphaTestNode, and transparent properties
 * so tests can verify that the BasicTextNodeMaterial constructor sets them.
 */
class MockMeshBasicNodeMaterial {
  /** Node controlling fragment color. */
  colorNode: any = null;

  /** Node controlling fragment opacity. */
  opacityNode: any = null;

  /** Node controlling the alpha test threshold. */
  alphaTestNode: any = null;

  /** Whether the material is transparent. */
  transparent = false;
}

/**
 * Mock for the TSL `texture()` function.
 *
 * @param {any} _map - The texture map.
 * @param {any} _uvNode - The UV node.
 * @returns {MockNode} A MockNode representing the texture sample.
 */
const mockTexture = (_map: any, _uvNode: any): MockNode => new MockNode('texture');

/**
 * Mock for the TSL `uv()` function.
 *
 * @returns {MockNode} A MockNode representing UV coordinates.
 */
const mockUv = (): MockNode => new MockNode('uv');

/**
 * Mock for the TSL `color()` function.
 *
 * @param {any} _col - The color value.
 * @returns {MockNode} A MockNode representing the color.
 */
const mockColor = (_col: any): MockNode => new MockNode('color');

/**
 * Mock for the TSL `float()` function.
 *
 * @param {any} _val - The float value.
 * @returns {MockNode} A MockNode representing the float.
 */
const mockFloat = (_val: any): MockNode => new MockNode('float');

jest.mock('three/webgpu', () => {
  const actualThree = jest.requireActual('three');
  return {
    ...actualThree,
    MeshBasicNodeMaterial: MockMeshBasicNodeMaterial,
  };
});

jest.mock('three/tsl', () => ({
  texture: mockTexture,
  uv: mockUv,
  color: mockColor,
  float: mockFloat,
}));

export { THREE, MockNode, MockMeshBasicNodeMaterial };
