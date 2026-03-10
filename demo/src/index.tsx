import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { extend } from '@react-three/fiber';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { registerTextGeometry } from 'three-text-geometry';

import DemoPage from '~/pages/DemoPage';
import MultipageScene from '~/scenes/MultipageScene';
import ShaderScene from '~/scenes/ShaderScene';
import ShuffleScene from '~/scenes/ShuffleScene';
import ShuffleShaderScene from '~/scenes/ShuffleShaderScene';
import SimpleScene from '~/scenes/SimpleScene';

import './index.css';

registerTextGeometry(extend);

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Navigate to="/simple" />} />
        <Route path="/simple" element={<DemoPage><SimpleScene /></DemoPage>} />
        <Route path="/multipage" element={<DemoPage><MultipageScene /></DemoPage>} />
        <Route path="/shuffle" element={<DemoPage><ShuffleScene /></DemoPage>} />
        <Route path="/shader" element={<DemoPage><ShaderScene /></DemoPage>} />
        <Route path="/shuffleshader" element={<DemoPage><ShuffleShaderScene /></DemoPage>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
