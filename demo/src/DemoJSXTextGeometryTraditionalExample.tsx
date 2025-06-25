import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import * as THREE from 'three';
import TextGeometry, { BMFontJsonParser, TextAlign, TextGeometryOption } from 'three-text-geometry';
import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

/**
 * Example 2: Using TextGeometry with traditional approach (Recommended)
 */
const DemoJSXTextGeometryTraditionalExample = (): React.ReactNode => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [font, setFont] = useState<any>(null);
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  const [geometry, setGeometry] = useState<TextGeometry | null>(null);

  useEffect(() => {
    // Load font and texture
    const loadAssets = async () => {
      try {
        const fontResponse = await axios.get('https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fonts/OdudoMono-Regular-64.json');
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

  useEffect(() => {
    if (font) {
      const textOption: TextGeometryOption = {
        font: font,
        align: TextAlign.Left,
        width: 1600,
        flipY: texture?.flipY ?? true,
      };

      const textGeometry = new TextGeometry('Hello World', textOption);
      textGeometry.computeBoundingBox();
      setGeometry(textGeometry);
    }
  }, [font, texture]);

  if (!geometry || !texture) return null;

  const material = new THREE.MeshBasicMaterial({
    map: texture,
    side: THREE.DoubleSide,
    transparent: true,
    color: 0x666666,
  });

  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <OrbitControls />
        <mesh ref={meshRef} geometry={geometry} material={material} />
      <OrbitControls />
    </Canvas>
  );
};

export default DemoJSXTextGeometryTraditionalExample;
