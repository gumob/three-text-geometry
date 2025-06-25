import React, { useEffect, useMemo, useRef, useCallback } from 'react';
import { GizmoHelper, GizmoViewport, OrbitControls, PerspectiveCamera, useTexture } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import useSWR from 'swr';
import * as THREE from 'three';
import TextGeometry, { TextAlign, TextGeometryOption } from 'three-text-geometry';
import { FONT_URL, fetchFont, randomText, TEXTURE_URL } from './utils';
import ShuffleText, { ShuffleOption, ShuffleState } from '~/effects/shuffle';
import { fragmentShader, vertexShader } from '~/shaders/effect';

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
      <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0, 1600]} fov={45} aspect={window.innerWidth / window.innerHeight} near={1} far={100000} />
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
  const matRef = useRef<THREE.RawShaderMaterial>(null!);
  const text = useRef(randomText());

  /************************************
   * Effects
   ************************************/

  const resetMesh = useCallback(() => {
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
  }, []);

  useEffect(() => {
    resetMesh();
  }, [meshRef, geomRef, resetMesh]);

  const time = useRef(0);

  useFrame((state, delta) => {
    const duration = 60;
    time.current += delta;
    matRef.current.uniforms.iGlobalTime.value = time.current;
    matRef.current.uniforms.animate.value = time.current / duration;
    matRef.current.needsUpdate = true;
    if (time.current > duration) {
      time.current = 0;
      text.current = randomText();
      resetMesh();
    }
  });

  /************************************
   * Render
   ************************************/

  return (
    <mesh ref={meshRef}>
      <textGeometry ref={geomRef} args={[text.current, option]} />
      {/* <meshBasicMaterial map={texture} side={THREE.DoubleSide} transparent={true} color={0x666666} /> */}
      <rawShaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          animate: { value: 1 },
          iGlobalTime: { value: 0 },
          map: { value: texture },
          color: { value: new THREE.Color(0x999999) }
        }}
        transparent={true}
        side={THREE.DoubleSide}
        depthTest={false}
      />
    </mesh>
  );
};

export default DemoJSXShader;
