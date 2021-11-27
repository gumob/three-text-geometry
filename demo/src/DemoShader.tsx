import * as THREE from 'three'
import TextGeometry, { TextAlign } from 'three-text-geometry'
import DemoBase from './DemoBase'
import { fragmentShader, vertexShader } from './shaders/effect'

export class DemoShader extends DemoBase {
  swapTimeoutID?: any
  time: number = 0
  textMaterial?: THREE.Material
  clock: THREE.Clock = new THREE.Clock();
  
  componentWillUnmount() {
    clearTimeout(this.swapTimeoutID)
    cancelAnimationFrame(this.animationFrameID)
    this.clock?.stop()
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
      depthTest: false
    })
    this.textMaterial.side = THREE.DoubleSide
    this.textMesh = new THREE.Mesh(textGeometry, this.textMaterial)
    this.textMesh.scale.multiply(new THREE.Vector3(1, -1, 1))
    this.textMesh.position.set(-box.x / 2, -box.y / 2, 0)
    this.scene?.add(this.textMesh)

    this.clock.start()
  }

  updateScene(): void {
    const dt = this.clock.getDelta()
    const duration = 3
    this.time += dt
    const mat = this.textMaterial as THREE.RawShaderMaterial
    mat.uniforms.iGlobalTime.value = this.time
    mat.uniforms.animate.value = this.time / duration
    mat.needsUpdate = true
    if (this.time > duration) {
      this.time = 0
      this.swapText()
    }
    super.updateScene()
  }

  swapText() {
    const geom = this.textMesh?.geometry as TextGeometry
    geom.update(this.randomText())
    const box = new THREE.Vector3()
    this.textMesh!.geometry.computeBoundingBox()
    this.textMesh!.geometry.boundingBox?.getSize(box)
    this.textMesh!.position.set(-box.x / 2, -box.y / 2, 0)
  }
}

export default DemoShader
