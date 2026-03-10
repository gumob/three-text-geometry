import { useEffect, useRef } from 'react';
import { OrbitControls, Stats } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

export default function SceneSetup() {
  const controlsRef = useRef<React.ComponentRef<typeof OrbitControls>>(null);
  const { gl } = useThree();

  useEffect(() => {
    const handleClick = () => {
      if (controlsRef.current) {
        controlsRef.current.autoRotate = false;
      }
    };
    gl.domElement.addEventListener('click', handleClick, { once: true });
    return () => {
      gl.domElement.removeEventListener('click', handleClick);
    };
  }, [gl]);

  return (
    <>
      <color attach="background" args={[new THREE.Color(0x000000)]} />
      <fogExp2 attach="fog" args={[0x000104, 0.00035]} />
      <axesHelper args={[1000]} />
      <OrbitControls ref={controlsRef} autoRotate />
      <Stats />
    </>
  );
}
