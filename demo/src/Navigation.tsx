import { MenuItem, MenuList, Paper } from '@mui/material';
import { NavLink } from 'react-router-dom';

import './Navigation.css';

export default function Navigation() {
  return (
    <Paper sx={{ width: 160 }} className="Navigation">
      <MenuList dense>
        <MenuItem component={NavLink} to="/simple">
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
  );
}
