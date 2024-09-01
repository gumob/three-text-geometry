import * as THREE from 'three';
import TextGeometry, { TextAlign } from 'three-text-geometry';
import DemoBase from '~/DemoBase';

class DemoSimple extends DemoBase {
  fontUri: string =
    'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fonts/Lato-Regular-64.fnt';
  textureUri: string[] = [
    'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fonts/lato.png',
  ];

  initScene() {
    super.initScene();

    /** TextGeometryOption */
    this.textOption = {
      font: this.font,
      align: TextAlign.Left,
      width: 1600,
      flipY: this.textures[0].flipY,
    };

    const textGeometry = new TextGeometry(this.randomText(), this.textOption);
    textGeometry.computeBoundingBox();
    const box = new THREE.Vector3();
    textGeometry.boundingBox?.getSize(box);

    const textMaterial = new THREE.MeshBasicMaterial({
      map: this.textures[0],
      side: THREE.DoubleSide,
      transparent: true,
      color: 0x999999,
    });

    this.textMesh = new THREE.Mesh(textGeometry, textMaterial)
      .rotateY(Math.PI)
      .rotateZ(Math.PI)
      .translateX(-box.x / 2)
      .translateY(-box.y / 2);

    this.scene?.add(this.textMesh);
  }
}

export default DemoSimple;
