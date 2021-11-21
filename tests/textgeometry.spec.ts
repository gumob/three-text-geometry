/**
 * @jest-environment jsdom
 */

import fs from 'fs'
import gl from 'gl'
import * as THREE from 'three'
import TextGeometry from '~/index'
import { BMFontXMLParser } from '~/parser'
import { TextLayoutAlign, WordWrapMode } from '~/types'

describe('TextGeometry', () => {
  /** Prepare Font */
  const xml = fs.readFileSync('tests/fonts/Roboto-Regular.xml').toString()
  const font = new BMFontXMLParser().parse(xml)

  /** Prepare WebGL */
  /** https://github.com/cognitedata/reveal/blob/9c248458a0c582a9a5f9f381323bfd2683648e82/viewer/test-utilities/src/createGlContext.ts */
  const width = 1024
  const height = 768
  const canvas: HTMLCanvasElement = window.document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const glContext: WebGLRenderingContext = gl(width, height, {})
  // let renderTarget: THREE.WebGLRenderTarget;
  let renderer: THREE.WebGLRenderer
  let scene: THREE.Scene
  let camera: THREE.Camera

  beforeEach(() => {
    renderer = new THREE.WebGLRenderer({ context: glContext })
    renderer.setSize(width, height)
    scene = new THREE.Scene()
    camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
    scene.add(camera)
  })

  describe('Option', () => {
    test('No Font', async () => {
      try {
        new TextGeometry('Hello World')
      } catch (e) {
        expect(e).toEqual(new TypeError('Must specify a `font` in options'))
      }
    })

    test('All', async () => {
      const option = {
        font: font,
        start: 1,
        end: 10,
        width: 3,
        align: TextLayoutAlign.Left,
        mode: WordWrapMode.Pre,
        letterSpacing: 1,
        lineHeight: font.common.lineHeight,
        tabSize: 1,
        flipY: true,
        multipage: false,
      }
      const geometry = new TextGeometry('Hello World', option)
      expect(geometry.option).toStrictEqual(option)
    })

    test('TextGeometry', async () => {
      const geometry = new TextGeometry('Hello World', { font: font })
      expect(geometry).toBeInstanceOf(TextGeometry)
    })
  })

  describe('Three.js', () => {
    test('2d context should be exist', async () => {
      expect(glContext).not.toBeNull()
      expect(renderer).not.toBeNull()
    })

    test('2d context should be exist', async () => {
      const geometry = new TextGeometry('Hello World\nHello Universe', { font: font })
      const textureLoader = new THREE.TextureLoader()
      const texture = textureLoader.load('tests/fonts/Roboto-Regular.png')
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        color: 0xaaffff,
      })
      const mesh = new THREE.Mesh(geometry, material)
      // console.log('mesh', mesh);
      scene.add(mesh)
      expect(true).toBe(true)

      renderer.render(scene, camera)

      const layout = geometry.layout
      expect(layout).not.toBeNull()
      const visibleGlyphs = geometry.visibleGlyphs
      expect(visibleGlyphs).not.toBeNull()

      geometry.computeBoundingBox()
      // const prev = geometry.boundingBox?.clone();
      // expect(geometry.boundingBox).not.toBeNull();
      // geometry.update('Hello Universe');
      // geometry.computeBoundingBox();
      // const curr = geometry.boundingBox?.clone();
      // console.log('prev', prev);
      // console.log('curr', curr);
      // expect(prev).not.toStrictEqual(curr);

      geometry.computeBoundingSphere()

      // console.log('layout', layout)
      // console.log('visibleGlyphs', visibleGlyphs)
      console.log('geometry.attributes', geometry.attributes)
      console.log('mesh.geometry.attributes', mesh.geometry.attributes)
    })
    // test('Compare Bounding Box', async () => {
    //   const uri = 'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fonts/Roboto-Regular.xml';
    //   const loader = new BMFontLoader();
    //   const font = await loader.loadXML(uri, config);

    //   const camera = createCamera(config);
    //   // const renderer = createRenderer(config);
    //   const scene = createScene();
    //   scene.add(camera);

    //   const geometry = new TextGeometry('Hello World', { font: font });
    //   scene.add(geometry);

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

    // test('Compare Bounding Box', async () => {
    //   const uri = 'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fonts/Roboto-Regular.xml';
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
    //   const uri = 'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fonts/Roboto-Regular.xml';
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
  })
})
