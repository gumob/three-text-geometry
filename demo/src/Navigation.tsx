import React from 'react'
import { NavLink } from 'react-router-dom'
import Paper from '@mui/material/Paper'
import MenuList from '@mui/material/MenuList'
import MenuItem from '@mui/material/MenuItem'
// import ListItemIcon from '@mui/material/ListItemIcon'
// import Check from '@mui/icons-material/Check';

import './Navigation.css'

export class Navigation extends React.Component {
  constructor(props: any) {
    super(props)
  }

  render(): React.ReactNode {
    // const path = this.props.location.pathname;
    return (
      <Paper sx={{ width: 160 }} className="Navigation">
        <MenuList dense>
          {/* <MenuItem component={NavLink} to="/simple" selected={location === '/simple' ? true : false}> */}
          <MenuItem component={NavLink} to="/simple">
            {/* <ListItemIcon>
              <Check />
            </ListItemIcon> */}
            Simple
          </MenuItem>
          <MenuItem component={NavLink} to="/shuffle">
            Shuffle
          </MenuItem>
          <MenuItem component={NavLink} to="/shader">
            Shader
          </MenuItem>
          <MenuItem component={NavLink} to="/shuffleshader">
            Shuffle and Shader
          </MenuItem>
        </MenuList>
      </Paper>
    )
  }
}

export default Navigation
