import * as React from 'react';
import Dropdown from '@mui/joy/Dropdown';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';

export default function NavTrack() {
  return (
    <Dropdown>
      <MenuButton variant="nautral">TRACK</MenuButton>
      <Menu variant="nautral">
        <MenuItem>FRONT-END</MenuItem>
        <MenuItem>BACK-END</MenuItem>
        <MenuItem>PM/DESIGN</MenuItem>
      </Menu>
    </Dropdown>
  );
}