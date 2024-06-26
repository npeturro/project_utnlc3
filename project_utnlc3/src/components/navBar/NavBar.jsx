import { useEffect, useState, useContext } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link, useNavigate } from "react-router-dom";
import {
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
  Switch,
} from "@mui/material";
import fondo from "../../images/fondo.png";
import logoImage from "../../images/icon one tech_Blanco fondo transparente.png";
import Drawer from "../drawer/Drawer";
import { UserContext } from "../../contexts/user-context";
import { CartContext } from "../../contexts/cart-context";

const NavBar = () => {
  const [searchText, setSearchText] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [darkMode, setDarkMode] = useState(false); 
  const navigate = useNavigate();
  const { userLoged, setUserLoged } = useContext(UserContext);
  const { count } = useContext(CartContext);

  useEffect(() => {
    
    if (darkMode) {
      document.body.classList.add("dark-mode");
      document.body.classList.remove("light-mode");
    } else {
      document.body.classList.add("light-mode");
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  const handleSearchChange = (event) => {
    const text = event.target.value;
    setSearchText(text);
    if (text.length > 2) {
      navigate("/products", { state: { searchText: text } });
    }
  };

  const handleSearch = () => {
    if (searchText.trim().length > 0) {
      navigate("/products", { state: { searchText: searchText } });
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
      name: ""
    });
    setCart([]);
    setCount(0);
    navigate('/');
    handlePopoverClose();
  };

  const handleCompras = () => {
    navigate('/account');
  };
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
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
              <IconButton color="black" aria-label="search" onClick={handleSearch}>
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

          <Switch
            checked={darkMode}
            onChange={toggleDarkMode}
            name="darkModeSwitch"
            inputProps={{ 'aria-label': 'toggle dark mode' }}
            sx={{
              '& .MuiSwitch-thumb': {
                bgcolor: darkMode ? '#A9CCE3' : '#85929E',
              },
              '& .MuiSwitch-track': {
                bgcolor: darkMode ? '#ffffff' : '#000000',
              },
            }}
          />
        </Toolbar>
      </AppBar>
    </>
  );
};

export default NavBar;
