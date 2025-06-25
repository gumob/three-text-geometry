import React, { useEffect, useMemo, useRef, useCallback } from 'react';
import { GizmoHelper, GizmoViewport, OrbitControls, PerspectiveCamera, useTexture } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import useSWR from 'swr';
import * as THREE from 'three';
import TextGeometry, { TextAlign, TextGeometryOption } from 'three-text-geometry';
import { FONT_URL, fetchFont, randomText, TEXTURE_URL } from './utils';
import ShuffleText, { ShuffleOption, ShuffleState } from '~/effects/shuffle';

/**
 * DemoJSXShader
 *
 * @returns {React.ReactNode}
 */
const DemoJSXShader = (): React.ReactNode => {
  return (
    <Canvas>
      <DemoJSXRenderer />
    </Canvas>
  );
};

/**
 * The component that displays the text geometry
 *
 * @returns {React.ReactNode}
 */
const DemoJSXRenderer = (): React.ReactNode => {
  /************************************
   * References
   ************************************/

  const cameraRef = useRef<THREE.PerspectiveCamera>(null!);

  const { data: font, error: fontError, isLoading: fontLoading } = useSWR(FONT_URL, fetchFont);
  const texture = useTexture(TEXTURE_URL);

  const option: TextGeometryOption | null = useMemo(() => {
    if (!font || !texture) return null;
    return {
      font: font,
      align: TextAlign.Left,
      width: 1600,
      flipY: texture.flipY, /** Apply flipY to textOption  */
    };
  }, [font, texture]);

  /************************************
   * Effects
   ************************************/

  useEffect(() => {
    if (fontError) console.error('Failed to load font:', fontError);
  }, [fontError]);

  useEffect(() => {
    if (cameraRef.current) cameraRef.current.lookAt(0, 0, 0);
  }, [cameraRef]);

  /************************************
   * Render
   ************************************/

  return (
    <>
      <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0, 2000]} fov={45} aspect={window.innerWidth / window.innerHeight} near={1} far={100000} />
      <ambientLight intensity={0.1} />
      <pointLight position={[1000, 1000, 1000]} />
      <OrbitControls autoRotate={true} />
      <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
        <GizmoViewport axisColors={['red', 'green', 'blue']} labelColor="black" />
      </GizmoHelper>
      <axesHelper args={[250]} />
      {option && <TextMesh texture={texture} option={option} />}
    </>
  );
};

/**
 * The component that displays the text geometry
 */
const TextMesh = ({ texture, option }: { texture: THREE.Texture; option: TextGeometryOption }) => {
  /************************************
   * References
   ************************************/

  const meshRef = useRef<THREE.Mesh>(null!);
  const geomRef = useRef<TextGeometry>(null!);
  const text = useMemo(() => randomText(), []);

  /************************************
   * Shuffle Effect
   ************************************/

  const shuffleTimeoutID = useRef<any>(null);
  const shuffle = useRef<ShuffleText | null>(null);

  const shuffleText = useCallback((timeout: number) => {
    const option: ShuffleOption = {
      shuffleText: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
      ignoreRegex: /\s|\t|\n|\r|(\n\r|\.|,)/,
      delay: { min: 0, max: 0 },
      fadeDuration: { min: 500, max: 700 },
      shuffleDuration: { min: 1000, max: 2000 },
      interval: { min: 20, max: 40 },
    };
    shuffle.current?.cancel();
    shuffle.current = new ShuffleText(text, option, (text: string, state: ShuffleState) => {
      const geom = meshRef.current.geometry as TextGeometry;
      geom.update(text);
      if (state === ShuffleState.Completed) shuffleText(3000);
    });
    clearTimeout(shuffleTimeoutID.current);
    shuffleTimeoutID.current = setTimeout(() => {
      shuffle.current?.start();
    }, timeout);
  }, [text]);

  /************************************
   * Effects
   ************************************/

  useEffect(() => {
    /** Get the bounding box of the text geometry */
    const box = new THREE.Vector3();
    geomRef.current.computeBoundingBox();
    geomRef.current.boundingBox?.getSize(box);
    /** Reset the mesh position */
    const scale = 0.5;
    meshRef.current.scale.set(scale, scale, scale);
    meshRef.current.position.set(0, 0, 0);
    meshRef.current.rotation.set(0, 0, 0);
    /** Rotate and translate the mesh to center the text */
    meshRef.current
      .rotateY(Math.PI)
      .rotateZ(Math.PI)
      .translateX(-(box.x / 2) * scale)
      .translateY(-(box.y / 2) * scale);
  }, [meshRef, geomRef]);

  useEffect(() => {
    shuffleText(1000);
    return () => {
      clearTimeout(shuffleTimeoutID.current);
      shuffle.current?.cancel();
    };
  }, [shuffleText]);

  /************************************
   * Render
   ************************************/

  return (
    <mesh ref={meshRef}>
      <textGeometry ref={geomRef} args={[text, option]} />
      <meshBasicMaterial map={texture} side={THREE.DoubleSide} transparent={true} color={0x666666} />
    </mesh>
  );
};

export default DemoJSXShader;
