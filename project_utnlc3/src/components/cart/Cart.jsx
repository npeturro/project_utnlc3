import React, { useState } from 'react';
import { Grid, Typography, Button, Card, CardMedia, CardContent, IconButton, TextField, Box } from '@mui/material';
import { Delete, Add, Remove, ShoppingCart } from '@mui/icons-material';

function Cart() {

    const [product, setProduct] = useState([
        {
            id: 1,
            name: 'Notebook Gamer',
            price: 8000,
            quantity: 1,
            image: "https://airoldi.com.ar/media/catalog/product/cache/a3a61ce6d0a1e741ba8660988e04b8f1/6/2/62a0f694a61291bd2fb48a0e5202af0d29fbdb5e6fece4c23fda1fe571e1556c.jpeg"
        },
        {
            id: 2,
            name: 'Notebook Gamer 2',
            price: 3000,
            quantity: 1,
            image: "https://airoldi.com.ar/media/catalog/product/cache/a3a61ce6d0a1e741ba8660988e04b8f1/6/2/62a0f694a61291bd2fb48a0e5202af0d29fbdb5e6fece4c23fda1fe571e1556c.jpeg"
        },
        {
            id: 3,
            name: 'Notebook Gamer 3',
            price: 6000,
            quantity: 1,
            image: "https://airoldi.com.ar/media/catalog/product/cache/a3a61ce6d0a1e741ba8660988e04b8f1/6/2/62a0f694a61291bd2fb48a0e5202af0d29fbdb5e6fece4c23fda1fe571e1556c.jpeg"
        }
    ]);

    const handleQuantityChange = (id, value) => {
        setProduct(product.map(item => item.id === id ? { ...item, quantity: item.quantity + value } : item));
    };

    const handleRemoveItem = (id) => {
        setProduct(product.filter(item => item.id !== id));
    };

    const total = product.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <Box sx={{ p: 5, mt: 5 }}>
            <Typography variant="h4" gutterBottom>CARRITO DE COMPRAS</Typography>
            {
                product.length >= 1 ? (
                    <Grid container spacing={2}>
                        {product.map((item) => (
                            <Grid item xs={12} key={item.id}>
                                <Card sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <CardMedia
                                        component="img"
                                        sx={{ width: 100, height: 100, mr: 2 }}
                                        image={item.image}
                                        alt={item.name}
                                    />
                                    <CardContent sx={{ flex: '1 0 auto', display: 'flex', alignItems: 'center' }}>
                                        <Typography component="div" variant="h5" sx={{ flex: 1 }}>{item.name}</Typography>
                                        <Typography variant="subtitle1" color="text.secondary" component="div" sx={{ flex: 1 }}>
                                            {item.price.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}
                                        </Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                                            <IconButton onClick={() => handleQuantityChange(item.id, -1)} disabled={item.quantity === 1}>
                                                <Remove />
                                            </IconButton>
                                            <TextField
                                                type="text"
                                                value={item.quantity}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                                variant="outlined"
                                                size="small"
                                                sx={{ width: 50, textAlign: 'center', mx: 1 }}
                                            />
                                            <IconButton onClick={() => handleQuantityChange(item.id, 1)}>
                                                <Add />
                                            </IconButton>
                                            <IconButton onClick={() => handleRemoveItem(item.id)}>
                                                <Delete />
                                            </IconButton>
                                        </Box>
                                        <Typography variant="h6" sx={{ flex: 1, textAlign: 'right' }}>
                                            {(item.price * item.quantity).toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                        <Grid item xs={12} md={6} >
                            <Card sx={{ p: 2, backgroundColor: '#ffe6e6' }}>
                                <Typography variant="h6">Subtotal: {total.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</Typography>
                                <Typography variant="h5" fontWeight="bold" sx={{ mt: 2 }}>Total: {total.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</Typography>
                                <Button variant="contained" sx={{ mt: 2, backgroundColor: '#2FD34F', borderRadius: '50px' }}>
                                    Realizar pedido
                                </Button>
                            </Card>
                            <Button variant="contained" color="secondary" sx={{borderRadius: '50px', mt: '10px', backgroundColor: '#d32f2f' }}>Seguir comprando</Button>
                        </Grid>
                    </Grid>
                ) : (
                    <Grid item xs={12}>
                        <Card sx={{ p: 2, backgroundColor: '#ffe6e6' }}>
                            <CardContent>
                                <ShoppingCart fontSize='large'/>
                                <Typography>Tu carrito está vacío</Typography>
                            </CardContent>
                            
                        </Card>
                        <Button variant="contained" color="secondary" sx={{borderRadius: '50px', mt: '10px', backgroundColor: '#d32f2f'}}>Seguir comprando</Button>
                    </Grid>
                )

            }

        </Box>
    );
}

export default Cart;