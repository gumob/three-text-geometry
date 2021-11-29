import * as THREE from 'three'
import TextGeometry, { TextAlign } from 'three-text-geometry'
import ShuffleText, { ShuffleOption, ShuffleState } from './effects/shuffle'
import DemoBase from './DemoBase'
import { fragmentShader, vertexShader } from './shaders/effect'

export class DemoShuffleShader extends DemoBase {
  shuffle?: ShuffleText
  swapTimeoutID?: any
  time: number = 0
  textMaterial?: THREE.Material
  clock: THREE.Clock = new THREE.Clock()

  componentWillUnmount() {
    this.shuffle?.cancel()
    cancelAnimationFrame(this.animationFrameID)
  }

  initScene() {
    super.initScene()

    /** TextGeometryOption */
    this.textOption = {
      font: this.font,
      align: TextAlign.Left,
      width: 1600,
      flipY: this.textures[0].flipY,
    }

    /** Geometry */
    const textGeometry = new TextGeometry(this.staticText(), this.textOption)
    const box = new THREE.Vector3()
    textGeometry.computeBoundingBox()
    textGeometry.boundingBox?.getSize(box)
    /** Material */
    this.textMaterial = new THREE.RawShaderMaterial({
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      uniforms: {
        animate: { value: 1 },
        iGlobalTime: { value: 0 },
        map: { value: this.textures[0] },
        color: { value: new THREE.Color(0x666666) },
      },
      transparent: true,
      side: THREE.DoubleSide,
      depthTest: false,
    })
    this.textMaterial.side = THREE.DoubleSide
    this.textMesh = new THREE.Mesh(textGeometry, this.textMaterial)
      .rotateY(Math.PI)
      .rotateZ(Math.PI)
      .translateX(-box.x / 2)
      .translateY(-box.y / 2)
    this.scene?.add(this.textMesh)

    this.clock.start()
  }

  updateScene(): void {
    const dt = this.clock.getDelta()
    const duration = 5
    this.time += dt
    const mat = this.textMaterial as THREE.RawShaderMaterial
    mat.uniforms.iGlobalTime.value = this.time
    mat.uniforms.animate.value = this.time / duration
    mat.needsUpdate = true
    if (this.time > duration) {
      this.time = 0
      this.shuffleText()
    }
    super.updateScene()
  }

  shuffleText() {
    const option: ShuffleOption = {
      shuffleText: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
      ignoreRegex: /\s|\t|\n|\r|(\n\r|\.|,)/,
      delay: { min: 0, max: 0 },
      fadeDuration: { min: 500, max: 700 },
      shuffleDuration: { min: 1000, max: 2500 },
      interval: { min: 20, max: 60 },
    }
    const self = this
    this.shuffle?.cancel()
    this.shuffle = new ShuffleText(this.staticText(), option, (text: string, state: ShuffleState) => {
      const geom = this.textMesh?.geometry as TextGeometry
      geom.update(text)
    })
    self.shuffle?.cancel()
    self.shuffle?.start()
  }
}

export default DemoShuffleShader
