import './index.css';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import DemoJSX from '~/DemoJSX';
import DemoMultipage from '~/DemoMultipage';
import DemoShader from '~/DemoShader';
import DemoShuffle from '~/DemoShuffle';
import DemoShuffleShader from '~/DemoShuffleShader';
import DemoSimple from '~/DemoSimple';
// import reportWebVitals from '~/reportWebVitals'
import Navigation from '~/Navigation';

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <BrowserRouter>
    <Navigation />
    <Routes>
      <Route path="*" element={<Navigate to="/simple" />} />
      <Route path="/jsx" element={<DemoJSX />} />
      <Route path="/simple" element={<DemoSimple />} />
      <Route path="/multipage" element={<DemoMultipage />} />
      <Route path="/shuffle" element={<DemoShuffle />} />
      <Route path="/shader" element={<DemoShader />} />
      <Route path="/shuffleshader" element={<DemoShuffleShader />} />
    </Routes>
  </BrowserRouter>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals()
