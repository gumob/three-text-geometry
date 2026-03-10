import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import TextGeometry, { TextAlign, useFont } from 'three-text-geometry';

import { useTextData } from '~/hooks/useTextData';
import { fragmentShader, vertexShader } from '~/shaders/effect';

const fontUrl = 'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fonts/OdudoMono-Regular-64.json';
const textureUrl = 'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fonts/OdudoMono-Regular-64.png';

const DURATION = 3;

export default function ShaderScene() {
  const { font, texture, isLoading } = useFont(fontUrl, textureUrl);
  const { staticText, randomText } = useTextData();
  const meshRef = useRef<THREE.Mesh>(null);
  const geometryRef = useRef<TextGeometry>(null);
  const timeRef = useRef(0);

  const material = useMemo(() => {
    if (!texture) return null;
    return new THREE.RawShaderMaterial({
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      uniforms: {
        animate: { value: 1 },
        iGlobalTime: { value: 0 },
        map: { value: texture },
        color: { value: new THREE.Color(0x999999) },
      },
      transparent: true,
      side: THREE.DoubleSide,
      depthTest: false,
    });
  }, [texture]);

  useEffect(() => {
    if (!meshRef.current || !geometryRef.current) return;
    const geom = geometryRef.current;
    geom.computeBoundingBox();
    const box = new THREE.Vector3();
    geom.boundingBox?.getSize(box);
    meshRef.current.position.set(-box.x / 2, box.y / 2, 0);
  }, [font, texture]);

  useFrame((_, delta) => {
    if (!material || !geometryRef.current || !meshRef.current) return;
    timeRef.current += delta;
    material.uniforms.iGlobalTime.value = timeRef.current;
    material.uniforms.animate.value = timeRef.current / DURATION;
    if (timeRef.current > DURATION) {
      timeRef.current = 0;
      geometryRef.current.update(randomText());
      geometryRef.current.computeBoundingBox();
      const box = new THREE.Vector3();
      geometryRef.current.boundingBox?.getSize(box);
      meshRef.current.position.set(-box.x / 2, box.y / 2, 0);
    }
  });

  useEffect(() => {
    return () => {
      material?.dispose();
    };
  }, [material]);

  if (isLoading || !font || !texture || !material) return null;

  return (
    <mesh ref={meshRef} rotation={[Math.PI, 0, 0]} material={material}>
      <textGeometry ref={geometryRef} args={[staticText(), { font, align: TextAlign.Left, width: 1600, flipY: texture.flipY }]} />
    </mesh>
  );
}
