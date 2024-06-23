import { useState, useEffect } from 'react';
import CardProductLogged from '../cardProductLogged/CardProductLogged';
import { Get } from '../fetch';
import { Box, Container, Stack } from '@mui/material';

const AllProducts = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const get = await Get("productos");
            setProducts(get);
        };

        fetchData();
    }, []);

    return (
        <Box>
            <Container maxWidth="xl" sx={{ mt: "1%", mb: "3%" }}>
                <Stack spacing={1}>
                    <h1 style={{ padding: '15px' }}>Todos los productos</h1>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                        {products.map(product => (
                            <CardProductLogged product={product} />
                        ))}
                    </div>
                </Stack>
            </Container>
        </Box>
    );
}

export default AllProducts;
