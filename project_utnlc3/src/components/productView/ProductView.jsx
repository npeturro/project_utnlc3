import PropTypes from "prop-types";
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import { Box, Grid, Card, CardMedia, CardContent } from '@mui/material';
import { Button, Typography } from "@mui/joy";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { CartContext } from "../../contexts/cart-context";
import { UserContext } from "../../contexts/user-context";
import Carrusel from "../carrusel/Carrusel"; // Import the Carrusel component
import axios from 'axios';

const ProductView = () => {
  const location = useLocation();
  const { addCart } = useContext(CartContext);
  const { userLoged } = useContext(UserContext);
  const [product, setProduct] = useState(location.state?.product || null);
  const [products, setProducts] = useState([]); // Initialize products as an empty array
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios
      .get("http://onetechapi-utn.ddns.net/api/productos")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  };

  useEffect(() => {
    if (location.state?.product) {
      setProduct(location.state.product);
    }
  }, [location.state]);

  useEffect(() => {
    if (product && products.length > 0) { // Ensure products is not empty
      const filtered = products.filter(p => p.category === product.category);
      setFilteredProducts(filtered);
      window.scrollTo(0, 0); // Scroll to the top of the page when product changes
    }
  }, [product, products]);

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
              sx={{ height: 350, objectFit: 'contain' }} // Adjust the height and object-fit properties
              image={product.image}
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ padding: 2, height: 350, objectFit: 'contain' }}>
            <CardContent>
              <Typography level="h2" gutterBottom>
                {product.name}
              </Typography>
              <Typography level="h3" gutterBottom>
                {product.category}
              </Typography>
              <Typography level="h2" color="primary" gutterBottom>
                {product.price.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}
              </Typography>
              <Typography level="body1" color="success" gutterBottom>
                Hasta 12 cuotas
              </Typography>
              <Typography level="body1" color="success" gutterBottom>
                Envío a todo el país
              </Typography>
              <Box display="flex" alignItems="center" mt={2} mb={2}>
              </Box>
              {userLoged.authenticated ? (
                <Button
                  variant="solid"
                  color="primary"
                  size="lg"
                  startDecorator={<AddShoppingCartIcon />}
                  onClick={() => addCart(product)}
                >
                  Agregar al carrito
                </Button>
              ) : (
                <Button
                  variant="solid"
                  color="primary"
                  size="lg"
                  onClick={handleClickLogin}
                >
                  Iniciar sesión
                </Button>
              )}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sx={{ marginTop: 0 }}>
          <Carrusel products={filteredProducts} text="Productos similares" />
        </Grid>
      </Grid>
    </Box>
  );
};

ProductView.propTypes = {
  products: PropTypes.array
};

export default ProductView;
