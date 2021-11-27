import * as THREE from 'three'
import TextGeometry, { TextAlign } from 'three-text-geometry'
import DemoBase from './DemoBase'
import { fragmentShader, vertexShader } from './shaders/effect'

export class DemoShader extends DemoBase {
  swapTimeoutID?: any
  time: number = 0
  textMaterial?: THREE.RawShaderMaterial

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
        color: { value: new THREE.Color(0x000000) },
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
  }

  updateScene(): void {
    const dt = performance.now()
    const duration = 3
    this.time += dt / 1000
    this.textMaterial!.uniforms.iGlobalTime.value = this.time
    this.textMaterial!.uniforms.animate.value = this.time / duration
    this.textMaterial!.needsUpdate = true
    if (this.time > duration) {
      this.time = 0
    }
    super.updateScene()
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
