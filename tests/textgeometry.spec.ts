import * as THREE from 'three';
import TextGeometry, { BMFontLoader } from '~/index';
import { isBMFont } from '~/types';

const config = {
  headers: {
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
    'Expires': '0',
  }
}

describe('TextGeometry', () => {
  // const width = 1024;
  // const height = 768;
  // const scene = new THREE.Scene();
  // const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  // const renderer = new THREE.WebGLRenderer();
  // renderer.setSize(width, height);

  test('No Font', async () => {
    try {
      new TextGeometry('Hello World');
    }
    catch (e) {
      expect(e).toEqual(new TypeError('Must specify a `font` in options'));
    }
  });

  test('XML / Cache / Valid Single Page', async () => {
    const uri = 'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fnt/Roboto-Regular.xml';
    const loader = new BMFontLoader();
    const font = await loader.loadXML(uri, config);
    expect(isBMFont(font)).toEqual(true);
    const geometry = new TextGeometry('Hello World', { font: font });
    expect(geometry).toBeInstanceOf(TextGeometry);
  });

  test('Bounding Box', async () => {
    const uri = 'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fnt/Roboto-Regular.xml';
    const loader = new BMFontLoader();
    const font = await loader.loadXML(uri, config);
    const geometry = new TextGeometry('Hello World', { font: font });
    expect(geometry.boundingBox).toBeNull();
    geometry.computeBoundingBox();
    expect(geometry.boundingBox).not.toBeNull();
  });

  test('Bounding Sphere', async () => {
    const uri = 'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fnt/Roboto-Regular.xml';
    const loader = new BMFontLoader();
    const font = await loader.loadXML(uri, config);
    const geometry = new TextGeometry('Hello World', { font: font });
    expect(geometry.boundingSphere).toBeNull();
    geometry.computeBoundingSphere();
    expect(geometry.boundingSphere).not.toBeNull();
  });

  // test('Compare Bounding Box', async () => {
  //   const uri = 'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fnt/Roboto-Regular.xml';
  //   const loader = new BMFontLoader();
  //   const font = await loader.loadXML(uri, config);
  //   const geometry = new TextGeometry('Hello World', { font: font });
  //   geometry.computeBoundingBox();
  //   const prev = geometry.boundingBox?.clone();
  //   expect(geometry.boundingBox).not.toBeNull();
  //   geometry.update('Hello Universe');
  //   geometry.computeBoundingBox();
  //   const curr = geometry.boundingBox?.clone();
  //   console.log('prev', prev);
  //   console.log('curr', curr);
  //   expect(prev).not.toStrictEqual(curr);
  // });

  // test('Compare Bounding Spheres', async () => {
  //   const uri = 'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fnt/Roboto-Regular.xml';
  //   const loader = new BMFontLoader();
  //   const font = await loader.loadXML(uri, config);
  //   const geometry = new TextGeometry('Hello World', { font: font });
  //   geometry.computeBoundingSphere();
  //   const prev = geometry.boundingSphere?.clone();
  //   expect(geometry.boundingSphere).not.toBeNull();
  //   geometry.update('Hello Universe');
  //   geometry.computeBoundingSphere();
  //   const curr = geometry.boundingSphere?.clone();
  //   console.log('prev', prev);
  //   console.log('curr', curr);
  //   expect(prev).not.toStrictEqual(geometry.boundingSphere);
  // });

});