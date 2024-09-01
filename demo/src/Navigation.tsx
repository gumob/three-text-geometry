import React from 'react'
import { NavLink } from 'react-router-dom'
import { Paper, MenuList, MenuItem } from '@mui/material'
import './Navigation.css'

export class Navigation extends React.Component {
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
          {/* <MenuItem component={NavLink} to="/multipage">
          Multipage
          </MenuItem> */}
          <MenuItem component={NavLink} to="/shuffle">
            Shuffle
          </MenuItem>
          <MenuItem component={NavLink} to="/shader">
            Shader
          </MenuItem>
          <MenuItem component={NavLink} to="/shuffleshader">
            Shuffle and Shader
          </MenuItem>
          {/* <MenuItem>
            <FormGroup>
              <FormControlLabel control={<Checkbox defaultChecked size="small" />} label={<Typography variant="body2">Show Axes</Typography>} />
            </FormGroup>
          </MenuItem> */}
        </MenuList>
      </Paper>
    )
  }
}

export default Navigation
