import React from 'react'
import * as THREE from 'three'
import Stats from 'three/examples/jsm/libs/stats.module'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// import { GPUStatsPanel } from 'three/examples/jsm/utils/GPUStatsPanel'
import TextGeometry, { BMFontLoader, BMFont } from 'three-text-geometry'

import './App.css'

export class App extends React.Component {

  stats?: Stats | undefined
  control?: OrbitControls | undefined
  // gpuPanel?: GPUStatsPanel | undefined;

  renderer?: THREE.WebGLRenderer
  scene?: THREE.Scene
  camera?: THREE.Camera
  mesh?: THREE.Mesh

  componentDidMount() {
    const uri = 'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fonts/Roboto-Regular.xml'
    new BMFontLoader().loadXML(uri)
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
    this.renderer.setClearColor(0xffffff, 0)
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.autoClear = false

    const container = document.querySelector("#App")
    container?.append(this.renderer.domElement)
    
    /** Stats Panel */
    // this.gpuPanel = new GPUStatsPanel(this.renderer.getContext());
    this.stats = Stats();
    // this.stats?.addPanel(this.gpuPanel);
    this.stats?.showPanel(0);
    document.body.appendChild(this.stats.dom)

    /** Scene */
    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color(0x000000)
    this.scene.fog = new THREE.FogExp2(0x000104, 0.0000675)

    /** Camera */
    const eye = new THREE.Vector3(0, 0, 2600)
    const target = new THREE.Vector3()
    this.camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.01, 6000)
    this.camera.position.set(eye.x, eye.y, eye.z)
    this.camera.lookAt(target)
    this.scene.add(this.camera)

    /** Control */
    this.control = new OrbitControls(this.camera!, this.renderer.domElement!)
    // this.control.addEventListener('change', this.updateScene.bind(this))

    /** Text Mesh */
    const geometry = new TextGeometry('Hello World', { font: font })
    const textureLoader = new THREE.TextureLoader()
    const texture = textureLoader.load('https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fonts/Roboto-Regular.png')
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      color: 0xaaffff,
    })
    this.mesh = new THREE.Mesh(geometry, material)
    this.scene.add(this.mesh)

    /** Render scene */
    this.updateScene()
  }

  updateScene() {
    // this.gpuPanel?.startQuery();

    this.renderer?.clear()
    this.renderer?.render(this.scene!, this.camera!)
    // console.log('geometry', this.mesh?.geometry);

    this.stats?.update();
    // this.gpuPanel?.endQuery();

    requestAnimationFrame(this.updateScene.bind(this));
  }

  render() {
    return (
      <div id="App" className="App">
      </div>
    )
  }
}

export default App
