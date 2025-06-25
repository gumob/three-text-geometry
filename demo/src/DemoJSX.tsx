import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as THREE from 'three';
import { BMFontJsonParser, TextAlign, TextGeometryOption } from 'three-text-geometry';
import { PerspectiveCamera, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

/**
 * Example 1: Using TextGeometry with JSX (if working)
 */
const DemoJSX = (): React.ReactNode => {
  const [font, setFont] = useState<any>(null);
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    // Load font and texture
    const loadAssets = async () => {
      try {
        const fontResponse = await axios.get('https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fonts/OdudoMono-Regular-64.json');
        console.log("fontResponse.data", fontResponse.data);
        const fontData = new BMFontJsonParser().parse(fontResponse.data);
        setFont(fontData);

        const textureLoader = new THREE.TextureLoader();
        const loadedTexture = await textureLoader.loadAsync('https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fonts/OdudoMono-Regular-64.png');
        setTexture(loadedTexture);
      } catch (error) {
        console.error('Failed to load assets:', error);
      }
    };

    loadAssets();
  }, []);

  if (!font || !texture) return null;

  const textOption: TextGeometryOption = {
    font: font,
    align: TextAlign.Left,
    width: 1600,
    flipY: texture.flipY,
  };

  return (
    <Canvas>
      <PerspectiveCamera makeDefault position={[1000, 1000, 2000]} lookAt={[0, 0, 0]} fov={45} aspect={window.innerWidth / window.innerHeight} near={1} far={100000} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <OrbitControls />
        <mesh>
          <textGeometry args={["Hello World", textOption]} />
          <meshBasicMaterial
            map={texture}
            side={THREE.DoubleSide}
            transparent={true}
            color={0x666666}
          />
        </mesh>
      <OrbitControls />
    </Canvas>
  );
}

export default DemoJSX;