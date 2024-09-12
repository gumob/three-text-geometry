/**
 * @jest-environment jsdom
 */
import * as fs from 'fs';
import TextGeometry, { TextAlign, WordWrapMode } from '@three-text-geometry/index';
import { BMFontAsciiParser } from '@three-text-geometry/parser';
import { MultiPageShaderMaterialParameters } from '@three-text-geometry/shader';

import THREE from './helpers/webgl-mock';

describe('TextGeometry', () => {
  /** Setup Font */
  // const xml = fs.readFileSync('tests/fonts/Roboto-Regular.xml').toString()
  // const font = new BMFontXMLParser().parse(xml)
  const ascii = fs.readFileSync('tests/fonts/Lato-Regular-64.fnt').toString();
  const font = new BMFontAsciiParser().parse(ascii);
  const _texture = new THREE.TextureLoader().load('tests/font/lato.png');

  /** Setup Renderer */
  const width = 1024;
  const height = 768;
  let renderer: THREE.WebGLRenderer;
  let scene: THREE.Scene;
  let camera: THREE.Camera;

  beforeEach(() => {
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    renderer.setClearColor(0xffffff, 0);
    window.document.body.append(renderer.domElement);

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    scene.fog = new THREE.FogExp2(0x000104, 0.0000675);

    const eye = new THREE.Vector3(0, 0, 2000);
    const target = new THREE.Vector3();
    camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(eye.x, eye.y, eye.z);
    camera.lookAt(target);
    scene.add(camera);

    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('Option', () => {
    test('No Font', async () => {
      new TextGeometry('Hello World');
      expect(console.warn).toHaveBeenCalledWith('Must specify a `font` in options');
      // try {
      //   new TextGeometry('Hello World');
      // } catch (e) {
      //   expect(e).toEqual(new TypeError('Must specify a `font` in options'));
      // }
    });

    test('All', async () => {
      const option = {
        font: font,
        start: 1,
        end: 10,
        width: 3,
        align: TextAlign.Left,
        mode: WordWrapMode.Pre,
        letterSpacing: 1,
        lineHeight: font.common.lineHeight,
        tabSize: 1,
        flipY: true,
        multipage: false,
      };
      const geometry = new TextGeometry('Hello World', option);
      expect(geometry.option).toStrictEqual(option);
    });

    test('TextGeometry', async () => {
      const geometry = new TextGeometry('Hello World', { font: font });
      expect(geometry).toBeInstanceOf(TextGeometry);
    });
  });

  describe('Three.js', () => {
    test('Renderer should be exist', async () => {
      expect(renderer).not.toBeNull();
    });

    test('Text Geometry', async () => {
      const text = 'this bitmap text\nis rendered with \nan OrthographicCamera';
      const geometry = new TextGeometry(text, {
        font: font,
      });
      expect(geometry.visibleGlyphs.length).toEqual(text.replace(/\n|\r|\n\r|\s/gi, '').length);
      expect(geometry.attributes.position?.array.length).toEqual(384);
    });

    test('Compute Bounding Box', async () => {
      /** Create geometry */
      const geometry = new TextGeometry('this bitmap text\nis rendered with \nan OrthographicCamera', {
        font: font,
      });
      const textureLoader = new THREE.TextureLoader();
      const texture = textureLoader.load('tests/fonts/Roboto-Regular.png');
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        color: 0xaaffff,
      });
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);
      /** Render scene */
      renderer.render(scene, camera);
      /** Compute Bounding Box */
      expect(geometry.boundingBox).toBeNull();
      geometry.computeBoundingBox();
      expect(geometry.boundingBox).not.toBeNull();
      /** Update geometry */
      const prev = geometry.boundingBox?.clone();
      geometry.update('Hello Universe');
      geometry.computeBoundingBox();
      const curr = geometry.boundingBox?.clone();
      expect(prev).not.toBeNull();
      expect(prev).not.toStrictEqual(curr);
    });

    test('Compute Bounding Sphere', async () => {
      /** Create geometry */
      const geometry = new TextGeometry('this bitmap text\nis rendered with \nan OrthographicCamera', {
        font: font,
      });
      const textureLoader = new THREE.TextureLoader();
      const texture = textureLoader.load('tests/fonts/Roboto-Regular.png');
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        color: 0xaaffff,
      });
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);
      /** Render scene */
      renderer.render(scene, camera);
      /** Compute Bounding Sphere */
      geometry.computeBoundingSphere();
      expect(geometry.boundingSphere).not.toBeNull();
      /** Update geometry */
      const prev = geometry.boundingSphere?.clone();
      geometry.update('Hello Universe');
      geometry.computeBoundingSphere();
      const curr = geometry.boundingSphere?.clone();
      expect(prev).not.toBeNull();
      expect(prev).not.toStrictEqual(curr);
    });

    test('Multiple textures', async () => {
      /** Load assets */
      const ascii = fs.readFileSync('tests/fonts/Norwester-Multi-64.fnt').toString();
      const font = new BMFontAsciiParser().parse(ascii);
      const textureLoader = new THREE.TextureLoader();
      const textures = [
        textureLoader.load('tests/fonts/Norwester-Multi_0.png'),
        textureLoader.load('tests/fonts/Norwester-Multi_1.png'),
        textureLoader.load('tests/fonts/Norwester-Multi_2.png'),
        textureLoader.load('tests/fonts/Norwester-Multi_3.png'),
      ];
      /** Material */
      const params: MultiPageShaderMaterialParameters = new MultiPageShaderMaterialParameters({
        textures: textures,
        transparent: true,
        opacity: 0.95,
        color: new THREE.Color('rgb(230, 230, 230)'),
      });
      const material = new THREE.RawShaderMaterial(params);
      /** Geometry */
      const geometry = new TextGeometry('This bitmap text\nis rendered with \nan OrthographicCamera', {
        font: font,
        multipage: true,
        width: 700,
      });
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);
      /** Render scene */
      renderer.render(scene, camera);
      /** Compute Bounding Box */
      expect(geometry.boundingBox).toBeNull();
      geometry.computeBoundingBox();
      expect(geometry.boundingBox).not.toBeNull();
      /** Update geometry */
      const prev = geometry.boundingBox?.clone();
      geometry.update('Hello Universe');
      geometry.computeBoundingBox();
      const curr = geometry.boundingBox?.clone();
      expect(prev).not.toBeNull();
      expect(prev).not.toStrictEqual(curr);
    });
  });
});
