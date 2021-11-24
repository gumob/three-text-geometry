import React from 'react'
import * as THREE from 'three'
import Stats from 'three/examples/jsm/libs/stats.module'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import TextGeometry, { BMFontLoader, BMFont, TextAlign } from 'three-text-geometry'

import './Demo.css'
import ShuffleText, { ShuffleOption, ShuffleState } from './effects/shuffle'
import { TextGeometryOption } from 'three-text-geometry/dist-cjs/types'

export class DemoShuffle extends React.Component {
  stats?: Stats | undefined
  controls?: OrbitControls | undefined

  renderer?: THREE.WebGLRenderer
  scene?: THREE.Scene
  camera?: THREE.PerspectiveCamera
  textMesh?: THREE.Mesh
  text?: string
  textOption?: TextGeometryOption

  animationFrameID?: any
  timeoutID?: any
  shuffle?: ShuffleText

  componentDidMount() {
    const uri =
      'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fonts/Lato-Regular-64.fnt'
    // const uri =
    //   'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fonts/Roboto-Regular.fnt'
    new BMFontLoader()
      .loadAscii(uri)
      .then((font: BMFont) => {
        this.initScene(font)
      })
      .catch((e) => {
        console.error(e)
      })
  }

  componentWillUnmount() {
    this.shuffle?.cancel()
    clearTimeout(this.timeoutID)
    cancelAnimationFrame(this.animationFrameID)
  }

  initScene(font: BMFont) {
    /** Renderer */
    this.renderer = new THREE.WebGLRenderer({ alpha: true })
    this.renderer.setClearColor(0x000000, 0)
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    // this.renderer.autoClear = false

    const container = document.querySelector('#DemoShuffle')
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
    // this.control.addEventListener('change', this.updateScene.bind(this))

    /** AxesHelper */
    this.scene?.add(new THREE.AxesHelper(1000))

    /** Text Mesh */
    const textureLoader = new THREE.TextureLoader()
    const texture = textureLoader.load(
      'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fonts/lato.png'
      // 'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fonts/Roboto-Regular.png'
    )
    this.text = `Lorem Ipsum is simply dummy text of the printing and typesetting industry.\nLorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.\nIt has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.`
    this.textOption = {
      font: font,
      align: TextAlign.Left,
      width: 1000,
      flipY: texture.flipY,
    }
    const textGeometry = new TextGeometry(this.text, this.textOption)
    const box = new THREE.Vector3()
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

    /** Shuffle text */
    this.suffleText(1000)
  }

  suffleText(timeout: number) {
    const option: ShuffleOption = {
      shuffleText: this.text!,
      delay: { min: 0, max: 0 },
      fadeDuration: { min: 500, max: 700 },
      shuffleDuration: { min: 1000, max: 2000 },
      interval: { min: 20, max: 40 },
    }
    const self = this
    this.shuffle?.cancel()
    this.shuffle = new ShuffleText(this.text!, option, (text: string, state: ShuffleState) => {
      console.log(state)
      console.log(text)
      const geom = this.textMesh?.geometry as TextGeometry
      geom.update(text)
      if (state === ShuffleState.Completed) self.suffleText(3000)
    })
    clearTimeout(this.timeoutID)
    this.timeoutID = setTimeout(() => {
      self.shuffle?.start()
    }, timeout)
  }

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
    return <div id="DemoShuffle" className="Demo"></div>
  }
}

export default DemoShuffle
