/**
 * @jest-environment jsdom
 */
import './helpers/webgpu-mock';

import fs from 'fs';

import { BasicTextNodeMaterial, MSDFTextNodeMaterial, MultiPageTextNodeMaterial, SDFTextNodeMaterial } from '@three-text-geometry/materials';
import { BMFontAsciiParser } from '@three-text-geometry/parser';
import TextGeometry from '@three-text-geometry/TextGeometry';
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

describe('SDFTextNodeMaterial', () => {
  test('creates with default options', () => {
    const material = new SDFTextNodeMaterial();
    expect(material).toBeDefined();
    expect(material.transparent).toBe(true);
  });

  test('creates with custom options', () => {
    const tex = new THREE.Texture();
    const col = new THREE.Color(0x00ff00);
    const material = new SDFTextNodeMaterial({
      map: tex,
      color: col,
      opacity: 0.5,
      alphaTest: 0.01,
      transparent: true,
    });
    expect(material).toBeDefined();
    expect(material.transparent).toBe(true);
  });

  test('sets colorNode and opacityNode', () => {
    const material = new SDFTextNodeMaterial({ map: new THREE.Texture() });
    expect(material.colorNode).not.toBeNull();
    expect(material.opacityNode).not.toBeNull();
  });
});

describe('MSDFTextNodeMaterial', () => {
  test('creates with default options', () => {
    const material = new MSDFTextNodeMaterial();
    expect(material).toBeDefined();
    expect(material.transparent).toBe(true);
  });

  test('creates with custom options', () => {
    const tex = new THREE.Texture();
    const col = new THREE.Color(0x0000ff);
    const material = new MSDFTextNodeMaterial({
      map: tex,
      color: col,
      opacity: 0.7,
      alphaTest: 0.05,
      negate: false,
      transparent: true,
    });
    expect(material).toBeDefined();
    expect(material.transparent).toBe(true);
  });

  test('sets colorNode and opacityNode', () => {
    const material = new MSDFTextNodeMaterial({ map: new THREE.Texture() });
    expect(material.colorNode).not.toBeNull();
    expect(material.opacityNode).not.toBeNull();
  });
});

describe('MultiPageTextNodeMaterial', () => {
  test('creates with default options', () => {
    const material = new MultiPageTextNodeMaterial();
    expect(material).toBeDefined();
    expect(material.transparent).toBe(true);
  });

  test('creates with custom options', () => {
    const textures = [new THREE.Texture(), new THREE.Texture()];
    const col = new THREE.Color(0xffffff);
    const material = new MultiPageTextNodeMaterial({
      textures: textures,
      color: col,
      opacity: 0.9,
      alphaTest: 0.001,
      transparent: true,
    });
    expect(material).toBeDefined();
    expect(material.transparent).toBe(true);
  });

  test('sets colorNode and opacityNode', () => {
    const textures = [new THREE.Texture(), new THREE.Texture()];
    const material = new MultiPageTextNodeMaterial({ textures });
    expect(material.colorNode).not.toBeNull();
    expect(material.opacityNode).not.toBeNull();
  });

  test('creates a Mesh with TextGeometry', () => {
    const ascii = fs.readFileSync('tests/fonts/Norwester-Multi-64.fnt').toString();
    const font = new BMFontAsciiParser().parse(ascii);
    const textures = [new THREE.Texture(), new THREE.Texture(), new THREE.Texture(), new THREE.Texture()];
    const material = new MultiPageTextNodeMaterial({
      textures: textures,
      color: new THREE.Color(0xffffff),
      opacity: 0.95,
      transparent: true,
    });
    const geometry = new TextGeometry('Hello Multi-Page', { font: font });
    const mesh = new THREE.Mesh(geometry, material);
    expect(mesh).toBeDefined();
    expect(geometry.getAttribute('position')).toBeDefined();
  });
});
