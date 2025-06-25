import React, { useEffect, useRef, useMemo } from 'react';
import axios from 'axios';
import useSWR from 'swr';
import * as THREE from 'three';
import { BMFontJsonParser, TextAlign, TextGeometryOption } from 'three-text-geometry';
import { PerspectiveCamera, OrbitControls, useTexture } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

/**
 * Example 1: Using TextGeometry with JSX (if working)
 */
const fontUrl = 'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fonts/OdudoMono-Regular-64.json';
const textureUrl = 'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fonts/OdudoMono-Regular-64.png';

/**
 * Fetcher for font JSON and parse with BMFontJsonParser
 *
 * @param {string} url - The URL of the font JSON file
 * @returns {Promise<BMFont>} The parsed font data
 */
const fetchFont = async (url: string) => {
  const response = await axios.get(url);
  return new BMFontJsonParser().parse(response.data);
};

const DemoJSX = (): React.ReactNode => {
  return (
    <Canvas>
      <DemoJSXRenderer />
    </Canvas>
  );
};

const DemoJSXRenderer = (): React.ReactNode => {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);

  const { data: font, error: fontError, isLoading: fontLoading } = useSWR(fontUrl, fetchFont);
  const texture = useTexture(textureUrl);

  const option: TextGeometryOption | null = useMemo(() => {
    if (!font || !texture) return null;
    console.log('font', font);
    console.log('texture', texture);
    return {
      font: font,
      align: TextAlign.Left,
      width: 1600,
      /** Apply flipY to textOption  */
      flipY: texture.flipY
    };
  }, [font, texture]);

  useEffect(() => {
    if (fontError) {
      console.error('Failed to load font:', fontError);
    }
  }, [fontError]);

  useEffect(() => {
    if (cameraRef.current) {
      cameraRef.current.lookAt(0, 0, 0);
    }
  }, [cameraRef]);

  return (
    <>
      <PerspectiveCamera ref={cameraRef} makeDefault position={[1000, 1000, 2000]} fov={45} aspect={window.innerWidth / window.innerHeight} near={1} far={100000} />
      <ambientLight intensity={1.0} />
      <pointLight position={[10, 10, 10]} />
      <OrbitControls />
      {option && <TextMesh texture={texture} option={option} />}
      <OrbitControls />
    </>
  );
}

const TextMesh = ({ texture, option }: { texture: THREE.Texture, option: TextGeometryOption }) => {
  if (!option) return null;
  return (
    <mesh>
      <textGeometry args={["Hello World", option]} />
      <meshBasicMaterial
        map={texture}
        side={THREE.DoubleSide}
        transparent={true}
        color={0xffffff}
      />
    </mesh>
  );
};

export default DemoJSX;