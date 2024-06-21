import { useState } from "react";
import {
  Box,
  Container,
  Stack,
  Button,
  Popover,
  MenuItem,
  MenuList,
} from "@mui/material";
import { Link } from "react-router-dom";
import CarruselContainer from "../carruselContainer/CarruselContainer";

const Index = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <Box>
        <Container maxWidth="xl" sx={{ mt: "7%" }}>
          <Stack spacing={1}>
            <Stack>
              <div style={{ marginLeft: "auto" }}>
                <Button variant="contained" onClick={handlePopoverOpen}>
                  Opciones de administrador
                </Button>
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
                  <div style={{ padding: "5px" }}>
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
                      <MenuItem>Ver productos</MenuItem>
                      <Link
                        to="/product"
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <MenuItem onClick={handlePopoverClose}>
                          Crear producto
                        </MenuItem>
                      </Link>
                      <Link
                        to="/users"
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <MenuItem>Ver usuarios</MenuItem>
                      </Link>
                      <MenuItem>Crear usuario</MenuItem>
                    </MenuList>
                  </div>
                </Popover>
              </div>
            </Stack>
            <CarruselContainer />
            <img src="https://airoldi.com.ar/media/wysiwyg/Banner-CX_002_.jpg"></img>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Index;
