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
   * Returns a new MockNode representing the x component.
   *
   * @returns {MockNode} A MockNode for the x component.
   */
  get x(): MockNode {
    return new MockNode('x');
  }

  /**
   * Returns a new MockNode representing the y component.
   *
   * @returns {MockNode} A MockNode for the y component.
   */
  get y(): MockNode {
    return new MockNode('y');
  }

  /**
   * Returns a new MockNode representing the z component.
   *
   * @returns {MockNode} A MockNode for the z component.
   */
  get z(): MockNode {
    return new MockNode('z');
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

  /**
   * Subtracts another node from this node, returning a new MockNode.
   *
   * @param {any} _other - The other node to subtract.
   * @returns {MockNode} A new MockNode representing the subtraction result.
   */
  sub(_other: any): MockNode {
    return new MockNode('sub');
  }

  /**
   * Divides this node by another, returning a new MockNode.
   *
   * @param {any} _other - The other node to divide by.
   * @returns {MockNode} A new MockNode representing the division result.
   */
  div(_other: any): MockNode {
    return new MockNode('div');
  }

  /**
   * Adds another node to this node, returning a new MockNode.
   *
   * @param {any} _other - The other node to add.
   * @returns {MockNode} A new MockNode representing the addition result.
   */
  add(_other: any): MockNode {
    return new MockNode('add');
  }

  /**
   * Returns the length of this node as a new MockNode.
   *
   * @returns {MockNode} A new MockNode representing the length.
   */
  length(): MockNode {
    return new MockNode('length');
  }

  /**
   * Tests equality with another node, returning a new MockNode.
   *
   * @param {any} _other - The other node to compare.
   * @returns {MockNode} A new MockNode representing the equality test.
   */
  equal(_other: any): MockNode {
    return new MockNode('equal');
  }

  /**
   * Converts this node to a variable, returning a new MockNode.
   *
   * @returns {MockNode} A new MockNode representing the variable.
   */
  toVar(): MockNode {
    return new MockNode('var');
  }

  /**
   * Assigns a value to this node, returning a new MockNode.
   *
   * @param {any} _other - The value to assign.
   * @returns {MockNode} A new MockNode representing the assignment.
   */
  assign(_other: any): MockNode {
    return new MockNode('assign');
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

/**
 * Mock for the TSL `Fn()` higher-order function.
 * Wraps a shader function definition and returns a callable that produces a MockNode.
 *
 * @param {(...args: any[]) => any} fn - The shader function to wrap.
 * @returns {(...args: any[]) => MockNode} A function that calls fn and returns a MockNode.
 */
const mockFn = (fn: (...args: any[]) => any): ((...args: any[]) => MockNode) => {
  return (...args: any[]) => {
    fn(args);
    return new MockNode('Fn');
  };
};

/**
 * Mock for the TSL `dFdx()` function.
 *
 * @param {any} _val - The value to differentiate.
 * @returns {MockNode} A MockNode representing the derivative.
 */
const mockDFdx = (_val: any): MockNode => new MockNode('dFdx');

/**
 * Mock for the TSL `dFdy()` function.
 *
 * @param {any} _val - The value to differentiate.
 * @returns {MockNode} A MockNode representing the derivative.
 */
const mockDFdy = (_val: any): MockNode => new MockNode('dFdy');

/**
 * Mock for the TSL `vec2()` function.
 *
 * @param {any} _x - X component.
 * @param {any} _y - Y component.
 * @returns {MockNode} A MockNode representing the vec2.
 */
const mockVec2 = (_x: any, _y?: any): MockNode => new MockNode('vec2');

/**
 * Mock for the TSL `smoothstep()` function.
 *
 * @param {any} _edge0 - Lower edge.
 * @param {any} _edge1 - Upper edge.
 * @param {any} _x - Value to interpolate.
 * @returns {MockNode} A MockNode representing the smoothstep result.
 */
const mockSmoothstep = (_edge0: any, _edge1: any, _x: any): MockNode => new MockNode('smoothstep');

/**
 * Mock for the TSL `clamp()` function.
 *
 * @param {any} _val - The value to clamp.
 * @param {any} _min - Minimum bound.
 * @param {any} _max - Maximum bound.
 * @returns {MockNode} A MockNode representing the clamped value.
 */
const mockClamp = (_val: any, _min: any, _max: any): MockNode => new MockNode('clamp');

/**
 * Mock for the TSL `fwidth()` function.
 *
 * @param {any} _val - The value to compute fwidth of.
 * @returns {MockNode} A MockNode representing the fwidth result.
 */
const mockFwidth = (_val: any): MockNode => new MockNode('fwidth');

/**
 * Mock for the TSL `max()` function.
 *
 * @param {any} _a - First value.
 * @param {any} _b - Second value.
 * @returns {MockNode} A MockNode representing the max.
 */
const mockMax = (_a: any, _b: any): MockNode => new MockNode('max');

/**
 * Mock for the TSL `min()` function.
 *
 * @param {any} _a - First value.
 * @param {any} _b - Second value.
 * @returns {MockNode} A MockNode representing the min.
 */
const mockMin = (_a: any, _b: any): MockNode => new MockNode('min');

/**
 * Mock for the TSL `vec4()` function.
 *
 * @param {any} _x - X component.
 * @param {any} _y - Y component.
 * @param {any} _z - Z component.
 * @param {any} _w - W component.
 * @returns {MockNode} A MockNode representing the vec4.
 */
const mockVec4 = (_x: any, _y?: any, _z?: any, _w?: any): MockNode => new MockNode('vec4');

/**
 * Mock for the TSL `attribute()` function.
 *
 * @param {any} _name - The attribute name.
 * @param {any} _type - The attribute type.
 * @returns {MockNode} A MockNode representing the attribute.
 */
const mockAttribute = (_name: any, _type?: any): MockNode => new MockNode('attribute');

/**
 * Mock for the TSL `If()` conditional function.
 * Returns an object with an ElseIf method for chaining.
 *
 * @param {any} _condition - The condition node.
 * @param {() => void} _body - The body to execute if true.
 * @returns {object} An object with an ElseIf method.
 */
type MockIfFn = (_condition: any, _body: () => void) => { ElseIf: MockIfFn };

/** @type {MockIfFn} */
const mockIf: MockIfFn = (_condition: any, _body: () => void) => {
  if (typeof _body === 'function') _body();
  return { ElseIf: mockIf };
};

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
  Fn: mockFn,
  dFdx: mockDFdx,
  dFdy: mockDFdy,
  vec2: mockVec2,
  smoothstep: mockSmoothstep,
  clamp: mockClamp,
  fwidth: mockFwidth,
  max: mockMax,
  min: mockMin,
  vec4: mockVec4,
  attribute: mockAttribute,
  If: mockIf,
}));

export { THREE, MockNode, MockMeshBasicNodeMaterial };
