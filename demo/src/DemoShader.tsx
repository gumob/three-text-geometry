import * as THREE from 'three'
import TextGeometry from 'three-text-geometry'
import DemoBase from './DemoBase'

export class DemoShader extends DemoBase {
  swapTimeoutID?: any

  componentWillUnmount() {
    clearTimeout(this.swapTimeoutID)
    cancelAnimationFrame(this.animationFrameID)
  }

  initScene() {
    super.initScene()
    
    const textGeometry = new TextGeometry(this.text, this.textOption)
    const box = new THREE.Vector3()
    textGeometry.computeBoundingBox()
    textGeometry.boundingBox?.getSize(box)
    const textMaterial = new THREE.MeshBasicMaterial({
      map: this.texture,
      side: THREE.DoubleSide,
      transparent: true,
      color: 0x666666,
    })
    this.textMesh = new THREE.Mesh(textGeometry, textMaterial)
    this.textMesh.scale.multiply(new THREE.Vector3(1, -1, 1))
    this.textMesh.position.set(-box.x / 2, -box.y / 2, 0)
    this.scene?.add(this.textMesh)

    /** Render scene */
    this.updateScene()
    this.swapText(3000)
  }

  swapText(timeout: number) {
    const self = this
    clearTimeout(this.swapTimeoutID)
    this.swapTimeoutID = setTimeout(() => {
      const text = self.textList[this.textIndex < this.textList.length - 1 ? this.textIndex++ : 0]
      const geom = self.textMesh?.geometry as TextGeometry
      geom.update(text)
      this.swapText(3000)
    }, timeout)
  }
}

export default DemoShader
