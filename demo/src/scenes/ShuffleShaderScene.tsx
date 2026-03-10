import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import TextGeometry, { TextAlign, useFont } from 'three-text-geometry';

import ShuffleText, { ShuffleOption, ShuffleState } from '~/effects/shuffle';
import { useTextData } from '~/hooks/useTextData';
import { fragmentShader, vertexShader } from '~/shaders/effect';

const fontUrl = 'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fonts/OdudoMono-Regular-64.json';
const textureUrl = 'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fonts/OdudoMono-Regular-64.png';

const DURATION = 5;

const shuffleOption: ShuffleOption = {
  shuffleText: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
  ignoreRegex: /\s|\t|\n|\r|(\n\r|\.|,)/,
  delay: { min: 0, max: 0 },
  fadeDuration: { min: 500, max: 700 },
  shuffleDuration: { min: 1000, max: 2500 },
  interval: { min: 20, max: 60 },
};

export default function ShuffleShaderScene() {
  const { font, texture, isLoading } = useFont(fontUrl, textureUrl);
  const { staticText } = useTextData();
  const meshRef = useRef<THREE.Mesh>(null);
  const geometryRef = useRef<TextGeometry>(null);
  const timeRef = useRef(0);
  const shuffleRef = useRef<ShuffleText | null>(null);

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

  const triggerShuffle = useCallback(() => {
    if (!geometryRef.current) return;
    shuffleRef.current?.cancel();
    shuffleRef.current = new ShuffleText(staticText(), shuffleOption, (text: string, _: ShuffleState) => {
      geometryRef.current?.update(text);
    });
    shuffleRef.current.start();
  }, [staticText]);

  useEffect(() => {
    if (!meshRef.current || !geometryRef.current) return;
    const geom = geometryRef.current;
    geom.computeBoundingBox();
    const box = new THREE.Vector3();
    geom.boundingBox?.getSize(box);
    meshRef.current.position.set(-box.x / 2, box.y / 2, 0);
  }, [font, texture]);

  useEffect(() => {
    return () => {
      shuffleRef.current?.cancel();
      material?.dispose();
    };
  }, [material]);

  useFrame((_, delta) => {
    if (!material || !geometryRef.current || !meshRef.current) return;
    timeRef.current += delta;
    material.uniforms.iGlobalTime.value = timeRef.current;
    material.uniforms.animate.value = timeRef.current / DURATION;
    if (timeRef.current > DURATION) {
      timeRef.current = 0;
      triggerShuffle();
    }
  });

  if (isLoading || !font || !texture || !material) return null;

  return (
    <mesh ref={meshRef} rotation={[Math.PI, 0, 0]} material={material}>
      <textGeometry ref={geometryRef} args={[staticText(), { font, align: TextAlign.Left, width: 1600, flipY: texture.flipY }]} />
    </mesh>
  );
}
