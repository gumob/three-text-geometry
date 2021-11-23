import React from 'react'
import * as THREE from 'three'
import Stats from 'three/examples/jsm/libs/stats.module'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import TextGeometry, { BMFontLoader, BMFont, TextAlign } from 'three-text-geometry'

import './App.css'
import { Vector3 } from 'three'

export class App extends React.Component {
  stats?: Stats | undefined
  controls?: OrbitControls | undefined

  renderer?: THREE.WebGLRenderer
  scene?: THREE.Scene
  camera?: THREE.PerspectiveCamera
  textMesh?: THREE.Mesh

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

  initScene2(font: BMFont) {
    /** Render scene */
    this.updateScene()
  }

  initScene(font: BMFont) {
    /** Renderer */
    this.renderer = new THREE.WebGLRenderer({ alpha: true })
    this.renderer.setClearColor(0xaaaaaa, 0)
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    // this.renderer.autoClear = false

    const container = document.querySelector('#App')
    container?.append(this.renderer.domElement)

    /** Stats Panel */
    this.stats = Stats()
    this.stats?.showPanel(0)
    document.body.appendChild(this.stats.dom)

    /** Scene */
    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color(0xaaaaaa)

    /** Camera */
    // this.camera = new THREE.OrthographicCamera(0, 0, 0, 0, -100, 100)
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000)
    this.camera.position.set(0, 0, 1000)
    this.camera.lookAt(0, 0, 0)
    // this.scene.add(this.camera)

    /** Control */
    this.controls = new OrbitControls(this.camera!, this.renderer.domElement!)
    this.controls.target.set(0, 0, 0)
    this.controls.update()
    // this.control.addEventListener('change', this.updateScene.bind(this))

    /** Text Mesh */
    const textureLoader = new THREE.TextureLoader()
    const texture = textureLoader.load(
      'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fonts/lato.png'
    )
    const textGeometry = new TextGeometry('this bitmap text\nis rendered with \nan OrthographicCamera', {
      font: font,
      align: TextAlign.Left,
      width: 1000,
      flipY: texture.flipY,
    })
    const box = new Vector3
    textGeometry.computeBoundingBox()
    textGeometry.boundingBox?.getSize(box)
    const textMaterial = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.DoubleSide,
      transparent: true,
      color: 0xaaffff,
    })
    this.textMesh = new THREE.Mesh(textGeometry, textMaterial)
    // const layout = textGeometry.layout
    // const padding = 40
    // this.textMesh.position.set(padding, -layout!.descender + layout!.height + padding, 0)
    this.textMesh.scale.multiply(new THREE.Vector3(1, -1, 1))
    this.textMesh.position.set(-box.x / 2, -box.y / 2, 0)
    this.scene.add(this.textMesh)

    // const lineMaterial = new THREE.LineBasicMaterial({ color: 0x0000ff })
    // const points = [new THREE.Vector3(-100, 0, 0), new THREE.Vector3(0, 100, 0), new THREE.Vector3(100, 0, 0)]
    // const lineGeometry = new THREE.BufferGeometry().setFromPoints(points)
    // const line = new THREE.Line(lineGeometry, lineMaterial)
    // this.scene?.add(line)

    this.scene?.add(new THREE.AxesHelper(1000))

    window.addEventListener('resize', this.onWindowResize.bind(this))

    /** Render scene */
    this.updateScene()
  }

  updateScene() {
    this.controls?.update()
    this.renderer?.render(this.scene!, this.camera!)
    this.stats?.update()

    requestAnimationFrame(this.updateScene.bind(this))
  }

  onWindowResize() {
    this.camera!.aspect = window.innerWidth / window.innerHeight;
    this.camera?.updateProjectionMatrix()
    this.renderer?.setSize(window.innerWidth, window.innerHeight)
  }

  render() {
    return <div id="App" className="App"></div>
  }
}

export default App
