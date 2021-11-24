import * as THREE from 'three'
import TextGeometry from 'three-text-geometry'
import DemoBase from './DemoBase'

export class DemoSimple extends DemoBase {
  initScene() {
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
  }
}

export default DemoSimple
