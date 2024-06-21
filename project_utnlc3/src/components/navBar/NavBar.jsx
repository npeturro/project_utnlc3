import { useState, useEffect, useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { Popover, MenuList, MenuItem, Tooltip } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import fondo from '../../images/fondo.png'
import logoImage from '../../images/icon one tech_Blanco fondo transparente.png'
import axios from 'axios';
import { UserContext } from '../../contexts/user-context';
import Drawer from '../drawer/Drawer';

const NavBar = () => {

  const [searchText, setSearchText] = useState('');
  const [productos, setProductos] = useState([]);
  const [filteredProductos, setFilteredProductos] = useState(productos);
  const [anchorEl, setAnchorEl] = useState(null);

  const { userLoged, setUserLoged } = useContext(UserContext);

  // useEffect(() => {
  //   const fetchProductos = async () => {
  //     try {
  //       const response = await axios.get('https://localhost:7088/api/productos');
  //       setProductos(response.data);
  //       setFilteredProductos(response.data);
  //     } catch (error) {
  //       console.error('Error fetching products:', error);
  //     }
  //   };

  //   fetchProductos();
  // }, []);

  const handleSearchChange = (event) => {
    const text = event.target.value;
    setSearchText(text);
    filterProducts(text);
  };

  const filterProducts = (text) => {
    const filtered = productos.filter((producto) =>
      producto.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredProductos(filtered);
  };

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleCerrar = () => {
    setUserLoged({
      authenticated: false,
      role: ''
    });
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;


  return (
    <>
      <AppBar
        position="fixed" sx={{ backgroundImage: `url(${fondo})`, backgroundSize: 'cover' }}
      >
        <Toolbar style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Link to="/">
              <img src={logoImage} alt="Logo de tu empresa" style={{ width: 50, marginRight: 10 }} />
            </Link>
            <Typography variant="h6" component="div">
              ONE TECH
            </Typography>
          </div>
          <Drawer />
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
              value={searchText}
              onChange={handleSearchChange}
            />
          </div>

          <Tooltip title='Carrito de compras'>
            <Link to="/cart" style={{ textDecoration: 'none', color: 'inherit' }}>
              <IconButton color="inherit" aria-label="carrito de compras">
                <ShoppingCartIcon />
              </IconButton>
            </Link>
          </Tooltip>
          <Tooltip title='Perfil'>
            <IconButton
              color="inherit"
              aria-label="login"
              onClick={handlePopoverOpen}
            >
              <AccountCircleIcon />
            </IconButton>
          </Tooltip>
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
              <MenuList
                disablePadding
                dense
                sx={{
                  p: '8px',
                  '& > *': {
                    borderRadius: 1
                  }
                }}
              >
                {!userLoged.authenticated && (
                  <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <MenuItem onClick={handlePopoverClose}>
                      Iniciar sesión
                    </MenuItem>
                  </Link>
                )}
                {!userLoged.authenticated && (
                  <MenuItem>
                    Registrarse
                  </MenuItem>
                )}
                {userLoged.authenticated && (
                  <MenuItem onClick={handleCerrar}>
                    Cerrar sesión
                  </MenuItem>
                )}
              </MenuList>
            </div>
          </Popover>
        </div>
      </Toolbar>
    </AppBar>

      {/* <div style={{ marginTop: '80px', padding: '20px' }}>
        <Typography variant="h6">Resultados de búsqueda:</Typography>
        <ul>
          {filteredProductos.map((producto) => (
            <li key={producto.id}>{producto.name}</li>
          ))}
        </ul>
      </div> */}
    </>
  );
};

export default NavBar;
