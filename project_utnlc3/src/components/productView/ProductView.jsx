import PropTypes from "prop-types";
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useState, useContext } from 'react';
import { Box, Grid, Card, CardMedia, CardContent } from '@mui/material';
import { Button, Typography } from "@mui/joy";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { CartContext } from "../../contexts/cart-context";
import { UserContext } from "../../contexts/user-context";
import { Link as MUILink } from "@mui/joy";



const ProductView = () => {
  const location = useLocation();
  const { addCart } = useContext(CartContext);
  const { userLoged } = useContext(UserContext);
  const [product, setProduct] = useState(location.state?.product || null);
  const navigate = useNavigate();

  const handleClickLogin = (event) => {
    event.preventDefault();
    navigate(`/login`);
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ padding: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} sx={{ padding: 4, marginLeft: 15 }}>
          <Card>
            <CardMedia
              component="img"
              height="450"
              image={product.image}
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ padding: 2 }}>
            <CardContent>
              <Typography level="h2" gutterBottom>
                {product.name}
              </Typography>
              <Typography level="h3" gutterBottom>
                {product.category}
              </Typography>
              <Typography level="h2" color="primary" gutterBottom>
                $ {product.price}
              </Typography>
              <Typography level="body1" color="success" gutterBottom>
                Hasta 12 cuotas
              </Typography>
              <Typography level="body1" color="success" gutterBottom>
                Envío a todo el país
              </Typography>
              <Box display="flex" alignItems="center" mt={2} mb={2}>
              </Box>
              {userLoged.authenticated ? <Button
                variant="solid"
                color="primary"
                size="lg"
                startDecorator={<AddShoppingCartIcon />}
                onClick={() => addCart(product)}
              >
                Agregar al carrito
              </Button>
                :
                  <Button
                    variant="solid"
                    color="primary"
                    size="lg"
                    onClick={handleClickLogin}
                  >
                    Iniciar sesión
                  </Button>}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box >
  );
};

export default ProductView;