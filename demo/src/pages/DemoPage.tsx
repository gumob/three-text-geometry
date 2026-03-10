import { ReactNode, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';

import SceneSetup from '~/components/SceneSetup';
import Navigation from '~/Navigation';

interface DemoPageProps {
  children: ReactNode;
}

export default function DemoPage({ children }: DemoPageProps) {
  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      <Canvas
        camera={{ fov: 45, position: [1000, 1000, 2000], near: 1, far: 100000 }}
        gl={{ alpha: true }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
          gl.setPixelRatio(window.devicePixelRatio);
        }}
      >
        <SceneSetup />
        <Suspense fallback={null}>
          {children}
        </Suspense>
      </Canvas>
      <Navigation />
    </div>
  );
}
