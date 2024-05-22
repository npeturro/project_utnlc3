import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
//import Logo from '../logo/logo';
import fondo from 'C:/Users/Lucio/Desktop/Programacion/3er Cuatrimestre/Laboratorio de computacion 3/tpi-test/src/images/fondo.png'
import logoImage from 'C:/Users/Lucio/Desktop/Programacion/3er Cuatrimestre/Laboratorio de computacion 3/tpi-test/src/images/icon one tech_Blanco fondo transparente.png'

const NavBar = () => {
  return (
    <AppBar
    position="fixed" sx={{ backgroundImage: `url(${fondo})`, backgroundSize: 'cover' }}
    >
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={logoImage} alt="Logo de tu empresa" style={{ width: 50, marginRight: 10 }} />
          <Typography variant="h6" component="div">
            ONE TECHE
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
          <IconButton color="inherit" aria-label="login">
            <AccountCircleIcon />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
