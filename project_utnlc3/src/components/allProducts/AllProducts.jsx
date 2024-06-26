import { useState, useEffect } from 'react';
import CardProductLogged from '../cardProductLogged/CardProductLogged';
import { Get } from '../fetch';
import { Box, Container, Stack } from '@mui/material';
import { useLocation } from 'react-router-dom';

const AllProducts = () => {
  const location = useLocation();
  const { state } = location;
  console.log(state);

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const get = await Get("productos");
      setProducts(get);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (state && state.searchText && state.searchText.length > 0) {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(state.searchText.toLowerCase()) ||
        product.category.toLowerCase().includes(state.searchText.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [state, products]);

  return (
    <Box>
      <Container maxWidth="xl" sx={{ mt: "1%", mb: "3%" }}>
        <Stack spacing={1}>
          <h1 style={{ padding: '15px' }}>Todos los productos</h1>
          {filteredProducts.length > 0 ? (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
              {filteredProducts.map(product => (
                <CardProductLogged key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p>No hay productos que coincidan con la búsqueda.</p>
          )}
        </Stack>
      </Container>
    </Box>
  );
};

export default AllProducts;
