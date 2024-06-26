import { useState, useEffect, useContext } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";
import CardProductLogged from '../cardProductLogged/CardProductLogged';
import {
  Box, 
  Container, 
  Stack,
  Popover,
  MenuList,
  MenuItem,
  Tooltip,
  Badge,
  Grid,
  Button,
  InputBase,
  IconButton,
  Toolbar,
  AppBar,
  Typography,
} from "@mui/material";
import fondo from "../../images/fondo.png";
import logoImage from "../../images/icon one tech_Blanco fondo transparente.png";
import axios from "axios";
import { UserContext } from "../../contexts/user-context";
import Drawer from "../drawer/Drawer";
import { CartContext } from "../../contexts/cart-context";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const [searchText, setSearchText] = useState("");
  const [productos, setProductos] = useState([]);
  const [filteredProductos, setFilteredProductos] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  const { userLoged, setUserLoged } = useContext(UserContext);
  const { count, setCart, setCount } = useContext(CartContext);
  const navigate = useNavigate();

   useEffect(() => {
     const fetchProductos = async () => {
      try {
         const response = await axios.get('http://onetechapi-utn.ddns.net/api/Productos');
         setProductos(response.data);
         //setFilteredProductos(response.data);
       } catch (error) {
         console.error('Error fetching products:', error);
       }
     };

     fetchProductos();
   }, []);

  const handleSearchChange = (event) => {
    const text = event.target.value;
    setSearchText(text);
    filterProducts(text);
  };

  const filterProducts = (text) => {
    if (text.trim() === "") {
      setFilteredProductos([]);
    } else {
      const filtered = productos.filter((producto) =>
        producto.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredProductos(filtered);
    }
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
      role: "",
    });
    setCart([]);
    setCount(0);
    handlePopoverClose();
  };

  const handleCompras = () => {
    navigate('/account');
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <AppBar
        position="fixed"
        sx={{ backgroundImage: `url(${fondo})`, backgroundSize: "cover" }}
      >
        <Toolbar
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Grid
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <Grid style={{ display: "flex", alignItems: "center" }}>
              <Link to="/">
                <img
                  src={logoImage}
                  alt="Logo"
                  style={{ width: 50, marginRight: 10 }}
                />
              </Link>
              <Typography variant="h6" component="Grid">
                ONE TECH
              </Typography>
            </Grid>
            <Drawer />
          </Grid>
          <Grid style={{ display: "flex", flex: 1, justifyContent: "center" }}>
            <Grid
              style={{
                display: "flex",
                width: "500px",
                alignItems: "center",
                backgroundColor: "white",
                padding: "2px 10px",
                borderRadius: "50px",
              }}
            >
              <IconButton color="black" aria-label="search">
                <SearchIcon />
              </IconButton>
              <InputBase
                placeholder="Buscar..."
                inputProps={{ "aria-label": "buscar" }}
                style={{ color: "black", marginLeft: 10, width: "500px" }}
                value={searchText}
                onChange={handleSearchChange}
              />
            </Grid>
          </Grid>
          <Grid
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Grid
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <Tooltip title="Carrito de compras">
                <Link
                  to="/cart"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Badge color="secondary" badgeContent={count}>
                    <ShoppingCartIcon />
                  </Badge>
                </Link>
              </Tooltip>
              <Tooltip title="Perfil">
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
                  vertical: "bottom",
                  horizontal: "center",
                }}
              >
                <Grid style={{ padding: "5px" }}>
                  <MenuList
                    disablePadding
                    dense
                    sx={{
                      p: "8px",
                      "& > *": {
                        borderRadius: 1,
                      },
                    }}
                  >
                    {!userLoged.authenticated && (
                      <Link
                        to="/login"
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <MenuItem onClick={handlePopoverClose}>
                          Iniciar sesión
                        </MenuItem>
                      </Link>
                    )}
                    {!userLoged.authenticated && (
                      <Link
                        to="/register"
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <MenuItem onClick={handlePopoverClose}>
                          Registrarse
                        </MenuItem>
                      </Link>
                    )}
                    {userLoged.authenticated && (
                      <MenuItem onClick={handleCompras}>Mis compras</MenuItem>
                    )}
                    {userLoged.authenticated && (
                      <MenuItem onClick={handleCerrar}>Cerrar sesión</MenuItem>
                    )}
                  </MenuList>
                </Grid>
              </Popover>
            </Grid>
            <Link to="/about">
              <Button sx={{ color: "white" }}>Nosotros</Button>
            </Link>
          </Grid>
        </Toolbar>
      </AppBar>

      { /*<Grid style={{ marginTop: '80px', padding: '20px' }}>
        <Typography variant="h6">Resultados de búsqueda:</Typography>
        <ul>
          {filteredProductos.map((producto) => (
            <li key={producto.id}>{producto.name}</li>
          ))}
        </ul>
      </Grid> */}
      {/* <Box>
            <Container maxWidth="xl" sx={{ mt: "1%", mb: "3%" }}>
                <Stack spacing={1}>
                    <h1 style={{ padding: '15px' }}>Resultados de búsqueda</h1>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                        {filteredProductos.map(product => (
                            <CardProductLogged product={product} />
                        ))}
                    </div>
                </Stack>
            </Container>
        </Box> */}
    </>
  );
};

export default NavBar;
