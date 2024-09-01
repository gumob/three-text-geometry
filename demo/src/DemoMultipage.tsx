import * as THREE from 'three';
import TextGeometry, { TextAlign, MultiPageShaderMaterialParameters } from 'three-text-geometry';
import DemoBase from '~/DemoBase';

class DemoMultipage extends DemoBase {
  fontUri: string =
    'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fonts/OdudoMono-Regular-64-Multipage.json';
  textureUri: string[] = [
    'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fonts/OdudoMono-Regular-64-Multipage-0.png',
    'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fonts/OdudoMono-Regular-64-Multipage-1.png',
    'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fonts/OdudoMono-Regular-64-Multipage-2.png',
  ];

  componentWillUnmount() {
    if (this.animationFrameID !== undefined) cancelAnimationFrame(this.animationFrameID);
  }

  initScene() {
    super.initScene();
    /** TextGeometryOption */
    this.textOption = {
      font: this.font,
      align: TextAlign.Left,
      width: 1600,
      flipY: this.textures[0].flipY,
      multipage: true,
    };

    /** Geometry */
    const textGeometry = new TextGeometry(this.staticText(), this.textOption);
    const box = new THREE.Vector3();
    textGeometry.computeBoundingBox();
    textGeometry.boundingBox?.getSize(box);

    /** Material */
    const params: MultiPageShaderMaterialParameters = new MultiPageShaderMaterialParameters({
      textures: this.textures,
      transparent: true,
      opacity: 0.95,
      alphaTest: 0.5,
      color: new THREE.Color(0x666666),
    });
    const textMaterial = new THREE.RawShaderMaterial(params);
    textMaterial.side = THREE.DoubleSide;

    this.textMesh = new THREE.Mesh(textGeometry, textMaterial)
      .rotateY(Math.PI)
      .rotateZ(Math.PI)
      .translateX(-box.x / 2)
      .translateY(-box.y / 2);
    this.scene?.add(this.textMesh);
  }
}

export default DemoMultipage;
