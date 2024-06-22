import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import CarruselContainer from "../carruselContainer/CarruselContainer";
import { UserContext } from "../../contexts/user-context";
import Carousel from "react-bootstrap/Carousel";
import {
  Box,
  Container,
  Stack,
  Button,
  Popover,
  MenuItem,
  MenuList,
} from "@mui/material";

const Index = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const { userLoged } = useContext(UserContext);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Box>
      <Container maxWidth="xl" sx={{ mt: "7%", mb: "3%" }}>
        <Stack spacing={1}>
          {userLoged.authenticated &&
            (userLoged.role === "Admin" || userLoged.role === "SuperAdmin") && (
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
                        <Link
                          to="/product"
                          style={{ textDecoration: "none", color: "inherit" }}
                        >
                          <MenuItem onClick={handlePopoverClose}>
                            Ver productos
                          </MenuItem>
                        </Link>
                        {userLoged.authenticated &&
                          userLoged.role === "SuperAdmin" && (
                            <Link
                              to="/users"
                              style={{
                                textDecoration: "none",
                                color: "inherit",
                              }}
                            >
                              <MenuItem onClick={handlePopoverClose}>
                                Ver usuarios
                              </MenuItem>
                            </Link>
                          )}
                      </MenuList>
                    </div>
                  </Popover>
                </div>
              </Stack>
            )}
          <Carousel>
            <Carousel.Item interval={5000}>
              <img src="https://images.samsung.com/is/image/samsung/assets/ar/home-s24-series/ElegidodelMesHOTSALEPRINCIPALES_bannerS24UltraAI_1366x607.png?imwidth=1366"></img>
            </Carousel.Item>
            <Carousel.Item interval={5000}>
              <img src="https://images.samsung.com/is/image/samsung/assets/ar/copa-america-tv/copaamerica_1366x607.png?imwidth=1366"></img>
            </Carousel.Item>
            <Carousel.Item interval={5000}>
              <img src="https://images.samsung.com/is/image/samsung/assets/ar/bespoke-ai-2024/bannersbespokeAI_1366x607v2.png?imwidth=1366"></img>
            </Carousel.Item>
          </Carousel>
          <CarruselContainer />
          <img
            src="https://airoldi.com.ar/media/wysiwyg/Banner-CX_002_.jpg"
            alt="Banner"
          />
        </Stack>
      </Container>
    </Box>
  );
};

export default Index;
