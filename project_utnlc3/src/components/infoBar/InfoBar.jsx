import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const InfoBar = () => {
  return (
    <Box
      sx={{
        backgroundColor: "rgb(25, 35, 255)",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        padding: "20px 0",
        color: "#fff",
      }}
    >
      <Box sx={{ textAlign: "center" }}>
        <FontAwesomeIcon icon="fa-regular fa-truck-fast" />
        <Typography sx={{ mt: 1 }}>Envio a todo el pais</Typography>
      </Box>
      <Box sx={{ textAlign: "center" }}>
        <FontAwesomeIcon icon="fa-regular fa-truck-fast" />
        <Typography sx={{ mt: 1 }}>
          Hasta 12 cuotas con todas las tarjetas
        </Typography>
      </Box>
      <Box sx={{ textAlign: "center" }}>
        <FontAwesomeIcon icon="fa-regular fa-truck-fast" />
        <Typography sx={{ mt: 1 }}>
          Precio mas bajo del mercado garantizado
        </Typography>
      </Box>
    </Box>
  );
};

InfoBar.propTypes = {
  icons: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default InfoBar;
