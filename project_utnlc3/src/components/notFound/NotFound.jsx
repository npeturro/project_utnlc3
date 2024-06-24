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
  Typography,
} from "@mui/material";

const NotFound = () => {

  return (
    <Container maxWidth="xs" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          p: 3,
          border: '1px solid #ccc',
          borderRadius: 8,
          bgcolor: 'background.paper',
          boxShadow: 1
        }}
      >
        <Typography variant="h5" >
          Lo sentimos!
        </Typography>
        <Typography variant="h6" sx={{ textAlign: 'center' }}>
          No encontramos la página que estas buscando!
        </Typography>
        <Typography variant="h7" sx={{ textAlign: 'center' }}>
          Por favor verifique si la dirección ingresada es correcta.
        </Typography>
        <Typography variant="h7" sx={{ textAlign: 'center' }}>
          Si el problema persiste comuniquese con <a>consultas@onetech.com.ar</a>.
        </Typography>

        <Link to='/'>
          <Button
            fullWidth
            variant="contained"
            sx={{
              mt: 3, backgroundColor: '#051c67',
              '&:hover': {
                backgroundColor: '#051c40',
              }
            }}
          >
            Ir al inicio
          </Button>
        </Link>
      </Box>
    </Container>
  );
};

export default NotFound;

