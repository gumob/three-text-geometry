/**
 * @jest-environment jsdom
 */
import './helpers/webgpu-mock';

import { BasicTextNodeMaterial } from '@three-text-geometry/materials';
import * as THREE from 'three';

describe('BasicTextNodeMaterial', () => {
  test('creates with default options', () => {
    const material = new BasicTextNodeMaterial();
    expect(material).toBeDefined();
    expect(material.transparent).toBe(true);
  });

  test('creates with custom options', () => {
    const tex = new THREE.Texture();
    const col = new THREE.Color(0xff0000);
    const material = new BasicTextNodeMaterial({
      map: tex,
      color: col,
      opacity: 0.8,
      alphaTest: 0.5,
      transparent: true,
    });
    expect(material).toBeDefined();
    expect(material.transparent).toBe(true);
  });

  test('sets colorNode and opacityNode', () => {
    const material = new BasicTextNodeMaterial({ map: new THREE.Texture() });
    expect(material.colorNode).not.toBeNull();
    expect(material.opacityNode).not.toBeNull();
  });
});
