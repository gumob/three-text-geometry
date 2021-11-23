import React from 'react'
import * as THREE from 'three'
import Stats from 'three/examples/jsm/libs/stats.module'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// import { GPUStatsPanel } from 'three/examples/jsm/utils/GPUStatsPanel'
import TextGeometry, { BMFontLoader, BMFont, TextAlign } from 'three-text-geometry'

import './App.css'

export class App extends React.Component {
  stats?: Stats | undefined
  control?: OrbitControls | undefined
  // gpuPanel?: GPUStatsPanel | undefined;

  renderer?: THREE.WebGLRenderer
  scene?: THREE.Scene
  camera?: THREE.OrthographicCamera
  testMesh?: THREE.Mesh

  componentDidMount() {
    const uri =
      'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fonts/Lato-Regular-64.fnt'
    new BMFontLoader()
      .loadAscii(uri)
      .then((font: BMFont) => {
        console.log('font', font)
        this.initScene(font)
      })
      .catch((e) => {
        console.error(e)
      })
  }

  initScene(font: BMFont) {
    /** Renderer */
    this.renderer = new THREE.WebGLRenderer({ alpha: true })
    this.renderer.setClearColor(0xaaaaaa, 0)
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.autoClear = false

    const container = document.querySelector('#App')
    container?.append(this.renderer.domElement)

    /** Stats Panel */
    // this.gpuPanel = new GPUStatsPanel(this.renderer.getContext());
    this.stats = Stats()
    // this.stats?.addPanel(this.gpuPanel);
    this.stats?.showPanel(0)
    document.body.appendChild(this.stats.dom)

    /** Scene */
    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color(0xaaaaaa)
    this.scene.fog = new THREE.FogExp2(0x000104, 0.0000675)

    /** Camera */
    this.camera = new THREE.OrthographicCamera(0, 0, 0, 0, -100, 100)
    this.scene.add(this.camera)

    /** Control */
    this.control = new OrbitControls(this.camera!, this.renderer.domElement!)
    // this.control.addEventListener('change', this.updateScene.bind(this))

    /** Text Mesh */
    const textureLoader = new THREE.TextureLoader()
    const texture = textureLoader.load(
      'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fonts/lato.png'
    )
    const geometry = new TextGeometry('this bitmap text\nis rendered with \nan OrthographicCamera', {
      font: font,
      align: TextAlign.Left,
      width: 700,
      flipY: texture.flipY,
    })
    console.log('geometry.attributes.position', geometry.attributes.position)
    console.log('geometry.attributes.uv', geometry.attributes.uv)
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      color: 0xaaffff,
    })
    this.testMesh = new THREE.Mesh(geometry, material)
    const layout = geometry.layout
    const padding = 40
    this.testMesh.position.set(padding, -layout!.descender + layout!.height + padding, 0)
    // this.scene.add(this.mesh)

    const textAnchor = new THREE.Object3D()
    textAnchor.add(this.testMesh)
    textAnchor.scale.multiplyScalar(1 / (window.devicePixelRatio || 1))
    this.scene.add(textAnchor)

    /** Render scene */
    this.updateScene()
  }

  updateScene() {
    // this.gpuPanel?.startQuery();
    this.control?.update()

    this.renderer?.clear()
    this.renderer?.render(this.scene!, this.camera!)
    // console.log('geometry', this.testMesh?.geometry)

    this.stats?.update()
    // this.gpuPanel?.endQuery();

    requestAnimationFrame(this.updateScene.bind(this))
  }

  render() {
    return <div id="App" className="App"></div>
  }
}

export default App
