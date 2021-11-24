import React from 'react'
import * as THREE from 'three'
import Stats from 'three/examples/jsm/libs/stats.module'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { BMFontLoader, BMFont, TextAlign } from 'three-text-geometry'

import './Demo.css'
import { TextGeometryOption } from 'three-text-geometry/dist-cjs/types'

export class DemoBase extends React.Component {
  stats?: Stats | undefined
  controls?: OrbitControls | undefined

  divID: string = 'Demo'

  renderer?: THREE.WebGLRenderer
  scene?: THREE.Scene
  camera?: THREE.PerspectiveCamera

  fontUri: string =
    'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fonts/Lato-Regular-64.fnt'
  textureUri: string =
    'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fonts/lato.png'

  font?: BMFont
  texture?: THREE.Texture
  text: string = `Lorem Ipsum is simply dummy text of the printing and typesetting industry.\nLorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.\nIt has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.`
  textOption?: TextGeometryOption
  textMesh?: THREE.Mesh

  animationFrameID?: any

  componentDidMount() {
    new BMFontLoader()
      .loadAscii(this.fontUri)
      .then((font: BMFont) => {
        this.fontDidLoad(font)
      })
      .catch((e) => {
        console.error(e)
      })
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.animationFrameID)
  }

  private fontDidLoad(font: BMFont) {
    /** Dwnloaded data */
    this.font = font
    this.texture = new THREE.TextureLoader().load(this.textureUri)

    /** Renderer */
    this.renderer = new THREE.WebGLRenderer({ alpha: true })
    this.renderer.setClearColor(0x000000, 0)
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    // this.renderer.autoClear = false

    const container = document.querySelector(`#${this.divID}`)
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
    this.camera.position.set(1000, 1000, 2000)
    this.camera.lookAt(0, 0, 0)

    /** Control */
    this.controls = new OrbitControls(this.camera!, this.renderer.domElement!)
    this.controls.target.set(0, 0, 0)
    this.controls.autoRotate = true
    this.controls.update()

    /** AxesHelper */
    this.scene?.add(new THREE.AxesHelper(1000))

    /** AxesHelper */
    this.textOption = {
      font: this.font,
      align: TextAlign.Left,
      width: 1000,
      flipY: this.texture.flipY,
    }

    window.addEventListener('resize', this.onWindowResize.bind(this))

    this.initScene()
  }

  initScene() {}

  updateScene() {
    this.controls?.update()
    this.renderer?.render(this.scene!, this.camera!)
    this.stats?.update()
    this.animationFrameID = requestAnimationFrame(this.updateScene.bind(this))
  }

  onWindowResize() {
    this.camera!.aspect = window.innerWidth / window.innerHeight
    this.camera?.updateProjectionMatrix()
    this.renderer?.setSize(window.innerWidth, window.innerHeight)
  }

  render() {
    return <div id={this.divID} className="Demo"></div>
  }
}

export default DemoBase
