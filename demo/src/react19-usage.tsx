import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import * as THREE from 'three';
import TextGeometry, { BMFontJsonParser, TextAlign, TextGeometryOption } from 'three-text-geometry';
import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

/**
 * Example 1: Using TextGeometry with JSX (if working)
 */
function TextGeometryJSXExample(): React.ReactNode {
  const [font, setFont] = useState<any>(null);
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    // Load font and texture
    const loadAssets = async () => {
      try {
        const fontResponse = await axios.get('path/to/font.json');
        const fontData = new BMFontJsonParser().parse(fontResponse.data);
        setFont(fontData);

        const textureLoader = new THREE.TextureLoader();
        const loadedTexture = await textureLoader.loadAsync('path/to/texture.png');
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
    <mesh>
      <textGeometry args={["Hello World", textOption]} />
      <meshBasicMaterial
        map={texture}
        side={THREE.DoubleSide}
        transparent={true}
        color={0x666666}
      />
    </mesh>
  );
}

/**
 * Example 2: Using TextGeometry with traditional approach (Recommended)
 */
function TextGeometryTraditionalExample() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [font, setFont] = useState<any>(null);
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  const [geometry, setGeometry] = useState<TextGeometry | null>(null);

  useEffect(() => {
    // Load font and texture
    const loadAssets = async () => {
      try {
        const fontResponse = await axios.get('path/to/font.json');
        const fontData = new BMFontJsonParser().parse(fontResponse.data);
        setFont(fontData);

        const textureLoader = new THREE.TextureLoader();
        const loadedTexture = await textureLoader.loadAsync('path/to/texture.png');
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

      const textGeometry = new TextGeometry("Hello World", textOption);
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

  return <mesh ref={meshRef} geometry={geometry} material={material} />;
}

/**
 * Example 3: Dynamic text update
 */
function DynamicTextExample() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [font, setFont] = useState<any>(null);
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  const [text, setText] = useState("Hello World");
  const [geometry, setGeometry] = useState<TextGeometry | null>(null);

  useEffect(() => {
    // Load font and texture
    const loadAssets = async () => {
      try {
        const fontResponse = await axios.get('path/to/font.json');
        const fontData = new BMFontJsonParser().parse(fontResponse.data);
        setFont(fontData);

        const textureLoader = new THREE.TextureLoader();
        const loadedTexture = await textureLoader.loadAsync('path/to/texture.png');
        setTexture(loadedTexture);
      } catch (error) {
        console.error('Failed to load assets:', error);
      }
    };

    loadAssets();
  }, []);

  useEffect(() => {
    if (font && text) {
      const textOption: TextGeometryOption = {
        font: font,
        align: TextAlign.Left,
        width: 1600,
        flipY: texture?.flipY ?? true,
      };

      const textGeometry = new TextGeometry(text, textOption);
      textGeometry.computeBoundingBox();
      setGeometry(textGeometry);
    }
  }, [font, texture, text]);

  // Update text every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setText(prev => prev === "Hello World" ? "Updated Text!" : "Hello World");
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  if (!geometry || !texture) return null;

  const material = new THREE.MeshBasicMaterial({
    map: texture,
    side: THREE.DoubleSide,
    transparent: true,
    color: 0x666666,
  });

  return <mesh ref={meshRef} geometry={geometry} material={material} />;
}

/**
 * Main App Component
 */
function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />

        {/* Choose one of the examples */}
        {/* <TextGeometryJSXExample /> */}
        <TextGeometryTraditionalExample />
        {/* <DynamicTextExample /> */}

        <OrbitControls />
      </Canvas>
    </div>
  );
}

export default App;