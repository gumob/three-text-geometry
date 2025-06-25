import './Navigation.css';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { MenuItem, MenuList, Paper } from '@mui/material';

export const Navigation = (): React.ReactNode => {
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
};

export default Navigation;
