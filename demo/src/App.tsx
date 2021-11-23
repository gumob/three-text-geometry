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
        this.initScene(font)
      })
      .catch((e) => {
        console.error(e)
      })
  }

  initScene(font: BMFont) {
    /** Renderer */
    this.renderer = new THREE.WebGLRenderer({ alpha: true })
    this.renderer.setClearColor(0x000000, 0)
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
    this.scene.background = new THREE.Color(0x000000)

    /** Camera */
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 100000)
    this.camera.position.set(500, 500, 1000)
    this.camera.lookAt(0, 0, 0)

    /** Control */
    this.controls = new OrbitControls(this.camera!, this.renderer.domElement!)
    this.controls.target.set(0, 0, 0)
    this.controls.autoRotate = true
    this.controls.update()
    // this.control.addEventListener('change', this.updateScene.bind(this))

    /** AxesHelper */
    this.scene?.add(new THREE.AxesHelper(1000))

    /** Text Mesh */
    const textureLoader = new THREE.TextureLoader()
    const texture = textureLoader.load(
      'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fonts/lato.png'
    )
    const textGeometry = new TextGeometry('this bitmap text\nis rendered with \nan PerspectiveCamera', {
      font: font,
      align: TextAlign.Left,
      width: 1000,
      flipY: texture.flipY,
    })
    const box = new Vector3()
    textGeometry.computeBoundingBox()
    textGeometry.boundingBox?.getSize(box)
    const textMaterial = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.DoubleSide,
      transparent: true,
      color: 0x666666,
    })
    this.textMesh = new THREE.Mesh(textGeometry, textMaterial)
    this.textMesh.scale.multiply(new THREE.Vector3(1, -1, 1))
    this.textMesh.position.set(-box.x / 2, -box.y / 2, 0)
    this.scene.add(this.textMesh)

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
    this.camera!.aspect = window.innerWidth / window.innerHeight
    this.camera?.updateProjectionMatrix()
    this.renderer?.setSize(window.innerWidth, window.innerHeight)
  }

  render() {
    return <div id="App" className="App"></div>
  }
}

export default App
