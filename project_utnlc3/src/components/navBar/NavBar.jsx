import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import { Popover, Button, MenuItem } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import fondo from '../../images/fondo.png'
import logoImage from '../../images/icon one tech_Blanco fondo transparente.png'

const NavBar = () => {

  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;


  return (
    <AppBar
      position="fixed" sx={{ backgroundImage: `url(${fondo})`, backgroundSize: 'cover' }}
    >
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/">
            <img src={logoImage} alt="Logo de tu empresa" style={{ width: 50, marginRight: 10 }} />
          </Link>
          <Typography variant="h6" component="div">
            ONE TECH
          </Typography>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ marginRight: 10 }}>
            <IconButton color="inherit" aria-label="search">
              <SearchIcon />
            </IconButton>
          </div>
          <div style={{ marginRight: 10 }}>
            <InputBase
              placeholder="Buscar..."
              inputProps={{ 'aria-label': 'buscar' }}
              style={{ color: 'white' }}
            />
          </div>
          <IconButton color="inherit" aria-label="carrito de compras">
            <ShoppingCartIcon />
          </IconButton>
          <IconButton
            color="inherit"
            aria-label="login"
            onClick={handlePopoverOpen}
          >
            <AccountCircleIcon />
          </IconButton>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handlePopoverClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
          >
            <div style={{ padding: '5px' }}>
              <Link to="/login" style={{ textDecoration: 'none' }}>
                <MenuItem variant="contained" color="primary" onClick={handlePopoverClose}>
                  Iniciar sesión
                </MenuItem>
              </Link>
            </div>
          </Popover>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
