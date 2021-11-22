import React from 'react'
import * as THREE from 'three'
import TextGeometry, { BMFontLoader, BMFont } from 'three-text-geometry'

import './App.css'

export class App extends React.Component {

  renderer?: THREE.WebGLRenderer
  scene?: THREE.Scene
  camera?: THREE.Camera
  mesh?: THREE.Mesh

  constructor(props: any) {
    super(props)
  }

  componentDidMount() {
    const uri = 'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fonts/Roboto-Regular.xml'
    new BMFontLoader().loadXML(uri)
    .then((font: BMFont) => {
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

    /** Text Mesh */
    const geometry = new TextGeometry('Hello World', { font: font })
    const textureLoader = new THREE.TextureLoader()
    const texture = textureLoader.load('tests/fonts/Roboto-Regular.png')
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      color: 0xaaffff,
    })
    this.mesh = new THREE.Mesh(geometry, material)
    this.scene.add(this.mesh)
  }
  
  updateScene() {
    this.renderer?.clear()
    this.renderer?.render(this.scene!, this.camera!)
  }

  render() {
    return (
      <div id="App" className="App">
      </div>
    )
  }
}

export default App
