import React from 'react'
import { Link } from 'react-router-dom'
import './Navigation.css'

export class Navigation extends React.Component {
  render() {
    return (
      <nav className="Navigation">
        <Link to="/simple">Simple</Link> | <Link to="/shuffle">Shuffle</Link> |{' '}
        <Link to="/shader">Shader</Link>
      </nav>
    )
  }
}

export default Navigation
