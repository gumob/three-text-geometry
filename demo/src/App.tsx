import React from 'react'
import { Outlet } from 'react-router-dom'
import './App.css'
import Navigation from './Navigation'

export class App extends React.Component {
  render() {
    return (
      <div id="App" className="App">
        <Navigation />
        {/* <Outlet /> */}
      </div>
    )
  }
}

export default App
