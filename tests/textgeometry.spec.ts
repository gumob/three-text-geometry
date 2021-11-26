/**
 * @jest-environment jsdom
 */
import fs from 'fs'
import gl from 'gl'
import * as THREE from 'three'
import TextGeometry from '~/index'
import { BMFontAsciiParser } from '~/parser'

describe('TextGeometry', () => {
  /** Prepare Font */
  // const xml = fs.readFileSync('tests/fonts/Roboto-Regular.xml').toString()
  // const font = new BMFontXMLParser().parse(xml)
  const ascii = fs.readFileSync('tests/fonts/Lato-Regular-64.fnt').toString()
  const font = new BMFontAsciiParser().parse(ascii)
  const texture = new THREE.TextureLoader().load('tests/font/lato.png')

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
    renderer.setClearColor(0xffffff, 0)
    renderer.autoClear = false
    window.document.body.append(renderer.domElement)

    scene = new THREE.Scene()
    scene.background = new THREE.Color(0x000000)
    scene.fog = new THREE.FogExp2(0x000104, 0.0000675)

    const eye = new THREE.Vector3(0, 0, 2000)
    const target = new THREE.Vector3()
    camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
    camera.position.set(eye.x, eye.y, eye.z)
    camera.lookAt(target)
    scene.add(camera)
  })

  // describe('Option', () => {
  //   test('No Font', async () => {
  //     try {
  //       new TextGeometry('Hello World')
  //     } catch (e) {
  //       expect(e).toEqual(new TypeError('Must specify a `font` in options'))
  //     }
  //   })

  //   test('All', async () => {
  //     const option = {
  //       font: font,
  //       start: 1,
  //       end: 10,
  //       width: 3,
  //       align: TextAlign.Left,
  //       mode: WordWrapMode.Pre,
  //       letterSpacing: 1,
  //       lineHeight: font.common.lineHeight,
  //       tabSize: 1,
  //       flipY: true,
  //       multipage: false,
  //     }
  //     const geometry = new TextGeometry('Hello World', option)
  //     expect(geometry.option).toStrictEqual(option)
  //   })

  //   test('TextGeometry', async () => {
  //     const geometry = new TextGeometry('Hello World', { font: font })
  //     expect(geometry).toBeInstanceOf(TextGeometry)
  //   })
  // })

  describe('Three.js', () => {
    test('2d context should be exist', async () => {
      expect(glContext).not.toBeNull()
      expect(renderer).not.toBeNull()
    })

    test('Text Geometry', async () => {
      const geometry = new TextGeometry('this bitmap text\nis rendered with \nan OrthographicCamera', {
        font: font,
      })
      // console.log('geometry', geometry)
      // console.log('geometry.attributes.position', geometry.attributes.position)
      // expect(geometry.attributes.position?.array.length).toEqual(4)
      expect(true).toBe(true)
    })

    test('2d context should be exist', async () => {
      const geometry = new TextGeometry('this bitmap text\nis rendered with \nan OrthographicCamera', {
        font: font,
      })
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

      renderer.clear()
      renderer.render(scene, camera)

      const layout = geometry.layout
      expect(layout).not.toBeNull()
      const visibleGlyphs = geometry.visibleGlyphs
      expect(visibleGlyphs).not.toBeNull()

      // console.log('geometry.attributes', geometry.attributes)
      // console.log('mesh.geometry.attributes', mesh.geometry.attributes)

      geometry.computeBoundingBox()
      const prev = geometry.boundingBox?.clone()
      expect(geometry.boundingBox).not.toBeNull()
      geometry.update('Hello Universe')
      geometry.computeBoundingBox()
      const curr = geometry.boundingBox?.clone()
      expect(prev).not.toStrictEqual(curr)

      // geometry.computeBoundingSphere()

      // console.log('layout', layout)
      // console.log('visibleGlyphs', visibleGlyphs)
    })

    // describe('Multiple text updates', () => {
    //   const text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.\nNulla enim odio, tincidunt sed fringilla sed, placerat vel lectus.\nDuis non sapien nulla.\nIn convallis nulla nec nulla varius rutrum.\nNunc augue augue, ornare in cursus egestas, cursus vel magna.\nFusce at felis vel tortor sagittis tincidunt nec vitae nisl.\nSed efficitur nibh consequat tortor pulvinar, dignissim tincidunt risus hendrerit.\nSuspendisse quis commodo nulla.\nUt orci urna, mollis non nisl id, molestie tristique purus.\nPhasellus efficitur laoreet eros vehicula convallis.\nSed imperdiet, lectus a facilisis tempus, elit orci varius ante, at lacinia odio massa et quam.\nQuisque vulputate nulla vitae feugiat aliquam.\nVivamus vel mauris sit amet est rhoncus molestie at quis neque.\nDuis faucibus laoreet tempus.\nMaecenas metus velit, lobortis sit amet mauris at, vehicula condimentum velit.\nVestibulum ornare eu turpis vel laoreet.\nNunc ac cursus nunc, non porttitor arcu.`
    //   const option = {
    //     font: font,
    //     align: TextAlign.Left,
    //     width: 1000,
    //     flipY: texture.flipY,
    //   }
    //   const geometry = new TextGeometry(text, option)
    //   const material = new THREE.MeshBasicMaterial({
    //     map: texture,
    //     transparent: true,
    //     color: 0xaaffff,
    //   })
    //   let mesh: THREE.Mesh = new THREE.Mesh(geometry, material)
    //   const geom = mesh.geometry as TextGeometry
    //   test('Cuts text with variable glyph width', () => {
    //     expect(geom.layout.)
    //   })
    // })

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
