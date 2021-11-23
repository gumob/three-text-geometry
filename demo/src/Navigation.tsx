import React from 'react'
import { NavLink } from 'react-router-dom'
import './Navigation.css'

export class Navigation extends React.Component {
  render() {
    return (
      <div className="Navigation">
        <ul>
          <li>
            <NavLink to="/simple">Simple</NavLink>
          </li>
          <li>
            <NavLink to="/shuffle">Shuffle</NavLink>
          </li>
          <li>
            <NavLink to="/shader">Shader</NavLink>
          </li>
        </ul>
      </div>
    )
  }
}

export default Navigation
