import * as THREE from 'three'
import TextGeometry, { TextAlign, MultiPageShaderMaterialParameters } from 'three-text-geometry'
import ShuffleText, { ShuffleOption, ShuffleState } from './effects/shuffle'
import DemoBase from './DemoBase'

export class DemoMultipage extends DemoBase {
  fontUri: string =
    'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fonts/Norwester-Multi-64.fnt'
  textureUri: string[]= [
    'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fonts/Norwester-Multi_0.png',
    'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fonts/Norwester-Multi_1.png',
    'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fonts/Norwester-Multi_2.png',
    'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fonts/Norwester-Multi_3.png',
  ]

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
      multipage: true,
    }

    /** Geometry */
    const textGeometry = new TextGeometry(this.staticText(), this.textOption)
    const box = new THREE.Vector3()
    textGeometry.computeBoundingBox()
    textGeometry.boundingBox?.getSize(box)

    /** Material */
    const params: MultiPageShaderMaterialParameters = new MultiPageShaderMaterialParameters({
      textures: this.textures,
      transparent: true,
      opacity: 0.95,
      color: new THREE.Color(0x666666),
    })
    const textMaterial = new THREE.RawShaderMaterial(params)
    textMaterial.side = THREE.DoubleSide

    this.textMesh = new THREE.Mesh(textGeometry, textMaterial)
    this.textMesh.scale.multiply(new THREE.Vector3(1, -1, 1))
    this.textMesh.position.set(-box.x / 2, -box.y / 2, 0)
    this.scene?.add(this.textMesh)
  }
}

export default DemoMultipage
