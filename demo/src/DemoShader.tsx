import * as THREE from 'three'
import TextGeometry, { TextAlign } from 'three-text-geometry'
import DemoBase from './DemoBase'

export class DemoShader extends DemoBase {
  swapTimeoutID?: any

  componentWillUnmount() {
    clearTimeout(this.swapTimeoutID)
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

    // const text = this.textList[0]
    const text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.\nNulla enim odio, tincidunt sed fringilla sed, placerat vel lectus.`
    const textGeometry = new TextGeometry(text, this.textOption)
    console.clear()
    // console.log('textGeometry.option', textGeometry.option)
    // console.log('textGeometry.layout', textGeometry.layout)
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

    textGeometry.update(text, this.textOption)
    textGeometry.update(text, this.textOption)
    textGeometry.update(text, this.textOption)
    textGeometry.update(text, this.textOption)
    textGeometry.update(text, this.textOption)
    textGeometry.update(text, this.textOption)
    textGeometry.update(text, this.textOption)

    /** Render scene */
    // this.swapText(3000)
  }

  swapText(timeout: number) {
    const self = this
    clearTimeout(this.swapTimeoutID)
    this.swapTimeoutID = setTimeout(() => {
      const text = self.textList[0]
      const geom = self.textMesh?.geometry as TextGeometry
      geom.update(text)
      console.log('geom.option', geom.option)
      this.swapText(3000)
    }, timeout)
  }
}

export default DemoShader
