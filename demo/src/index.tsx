import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import reportWebVitals from './reportWebVitals'
import './index.css'
import App from './App'
import DemoSimple from './DemoSimple'
import DemoShuffle from './DemoShuffle'
import DemoShader from './DemoShader'
import Navigation from './Navigation'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/simple" element={<DemoSimple />} />
        <Route path="/shuffle" element={<DemoShuffle />} />
        <Route path="/shader" element={<DemoShader />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
