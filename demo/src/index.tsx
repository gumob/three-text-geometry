import './index.css';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import DemoJSXSimple from '~/DemoJSXSimple';
import DemoJSXShuffle from '~/DemoJSXShuffle';
import DemoJSXShader from '~/DemoJSXShader';
import DemoMultipage from '~/DemoMultipage';
import DemoJSXShuffleShader from '~/DemoJSXShuffleShader';
import Navigation from '~/Navigation';

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <BrowserRouter>
    <Navigation />
    <Routes>
      <Route path="*" element={<Navigate to="/simple" />} />
      <Route path="/simple" element={<DemoJSXSimple />} />
      <Route path="/multipage" element={<DemoMultipage />} />
      <Route path="/shuffle" element={<DemoJSXShuffle />} />
      <Route path="/shader" element={<DemoJSXShader />} />
      <Route path="/shuffleshader" element={<DemoJSXShuffleShader />} />
    </Routes>
  </BrowserRouter>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals()
