import React, { useEffect, useMemo, useRef, useState } from 'react';
import { GizmoHelper, GizmoViewcube, GizmoViewport, OrbitControls, PerspectiveCamera, useHelper, useTexture } from '@react-three/drei';
import { Canvas, type ThreeElements } from '@react-three/fiber';
import axios from 'axios';
import useSWR from 'swr';
import * as THREE from 'three';
import TextGeometry, { BMFontJsonParser, TextAlign, TextGeometryOption } from 'three-text-geometry';
import { BoxHelper } from 'three';
import { randomText } from './utils/Text';

/**
 * Example 1: Using TextGeometry with JSX
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

const DemoJSXSimple = (): React.ReactNode => {
  return (
    <Canvas>
      <DemoJSXRenderer />
    </Canvas>
  );
};

const DemoJSXRenderer = (): React.ReactNode => {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null!);

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
      flipY: texture.flipY, /** Apply flipY to textOption  */
    };
  }, [font, texture]);

  const autoRotate = useRef(true);

  useEffect(() => {
    if (fontError) console.error('Failed to load font:', fontError);
  }, [fontError]);

  useEffect(() => {
    if (cameraRef.current) cameraRef.current.lookAt(0, 0, 0);
  }, [cameraRef]);

  return (
    <>
      <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0, 2000]} fov={45} aspect={window.innerWidth / window.innerHeight} near={1} far={100000} />
      <ambientLight intensity={0.1} />
      <pointLight position={[1000, 1000, 1000]} />
      <OrbitControls autoRotate={true} />
      <GizmoHelper alignment="bottom-right" margin={[80, 80]} onClick={
        () => autoRotate.current = false
      }>
        {/* <GizmoViewport axisColors={['red', 'green', 'blue']} labelColor="black" /> */}
        <GizmoViewcube />
      </GizmoHelper>
      <axesHelper args={[300]} />
      {option && <TextMesh texture={texture} option={option} />}
    </>
  );
};

const TextMesh = ({ texture, option }: { texture: THREE.Texture; option: TextGeometryOption }) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  useHelper(meshRef, BoxHelper, new THREE.Color(0.02, 0.02, 0.02))
  const geomRef = useRef<TextGeometry>(null!);

  useEffect(() => {
    /** Get the bounding box of the text geometry */
    const box = new THREE.Vector3();
    geomRef.current.computeBoundingBox();
    geomRef.current.boundingBox?.getSize(box);
    /** Reset the mesh position */
    meshRef.current.scale.set(0.5, 0.5, 0.5);
    meshRef.current.position.set(0, 0, 0);
    meshRef.current.rotation.set(0, 0, 0);
    /** Rotate and translate the mesh to center the text */
    meshRef.current
      .rotateY(Math.PI)
      .rotateZ(Math.PI)
      .translateX(-box.x / 4)
      .translateY(-box.y / 4);
  }, [meshRef, geomRef]);

  return (
    <mesh ref={meshRef}>
      <textGeometry ref={geomRef} args={[randomText(), option]} />
      <meshBasicMaterial map={texture} side={THREE.DoubleSide} transparent={true} color={0xffffff} />
    </mesh>
  );
};

export default DemoJSXSimple;
