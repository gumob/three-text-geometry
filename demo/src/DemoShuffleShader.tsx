import * as THREE from 'three'
import TextGeometry, { TextAlign } from 'three-text-geometry'
import ShuffleText, { ShuffleOption, ShuffleState } from './effects/shuffle'
import DemoBase from './DemoBase'

export class DemoShuffleShader extends DemoBase {
  shuffleTimeoutID?: any
  shuffle?: ShuffleText

  componentWillUnmount() {
    this.shuffle?.cancel()
    clearTimeout(this.shuffleTimeoutID)
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

    /** Text Mesh */
    const textGeometry = new TextGeometry(this.staticText(), this.textOption)
    const box = new THREE.Vector3()
    textGeometry.computeBoundingBox()
    textGeometry.boundingBox?.getSize(box)
    const textMaterial = new THREE.MeshBasicMaterial({
      map: this.textures[0],
      side: THREE.DoubleSide,
      transparent: true,
      color: 0x666666,
    })
    this.textMesh = new THREE.Mesh(textGeometry, textMaterial)
    this.textMesh.scale.multiply(new THREE.Vector3(1, -1, 1))
    this.textMesh.position.set(-box.x / 2, -box.y / 2, 0)
    this.scene?.add(this.textMesh)

    /** Shuffle text */
    this.suffleText(1000)
  }

  suffleText(timeout: number) {
    const option: ShuffleOption = {
      shuffleText: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
      ignoreRegex: /\s|\t|\n|\r|(\n\r|\.|,)/,
      delay: { min: 0, max: 0 },
      fadeDuration: { min: 500, max: 700 },
      shuffleDuration: { min: 1000, max: 2000 },
      interval: { min: 20, max: 40 },
    }
    const self = this
    this.shuffle?.cancel()
    this.shuffle = new ShuffleText(this.staticText(), option, (text: string, state: ShuffleState) => {
      const geom = this.textMesh?.geometry as TextGeometry
      geom.update(text)
      if (state === ShuffleState.Completed) self.suffleText(3000)
    })
    clearTimeout(this.shuffleTimeoutID)
    this.shuffleTimeoutID = setTimeout(() => {
      self.shuffle?.start()
    }, timeout)
  }
}

export default DemoShuffleShader
