import React, { useState } from 'react';
import { Grid, Typography, Button, Card, CardMedia, CardContent, IconButton, TextField, Box, Drawer, Divider } from '@mui/material';
import { Delete, Add, Remove, ShoppingCart } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Checkout from '../checkout/Checkout';
import { Link } from 'react-router-dom';

function Cart() {
    const [product, setProduct] = useState([
        {
            id: 1,
            name: 'Notebook Lenovo 15.6 TBOOK I7-1255U',
            price: 1151733,
            quantity: 1,
            image: "https://airoldi.com.ar/media/catalog/product/cache/a3a61ce6d0a1e741ba8660988e04b8f1/6/2/62a0f694a61291bd2fb48a0e5202af0d29fbdb5e6fece4c23fda1fe571e1556c.jpeg"
        },
        {
            id: 2,
            name: 'Silla Gamer Primus Thronos 200S Negra con Purpura',
            price: 482662,
            quantity: 1,
            image: "https://airoldi.com.ar/media/catalog/product/cache/a3a61ce6d0a1e741ba8660988e04b8f1/c/9/c9014594b3bad2d87835d1fa65ba8f79f84f66595d02b492e84f9009936658b0.jpeg"
        },
        {
            id: 3,
            name: 'Celular Xiaomi Poco F4 GT 5G 12GB 256GB Negro',
            price: 842405,
            quantity: 1,
            image: "https://airoldi.com.ar/media/catalog/product/cache/a3a61ce6d0a1e741ba8660988e04b8f1/e/9/e95f1c0ccd035e4ab4367ce801753b96db40fe580645e95fe749f7bcce115640.jpeg"
        }
    ]);

    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = (open) => (event) => {
        if (
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }
        setDrawerOpen(open);
    };

    const handleQuantityChange = (id, value) => {
        setProduct(product.map(item => item.id === id ? { ...item, quantity: item.quantity + value } : item));
    };

    const handleRemoveItem = (id) => {
        setProduct(product.filter(item => item.id !== id));
    };

    const total = product.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <Box sx={{ p: 5, mt: 5 }}>
            <Grid textAlign={'center'}>
                <Typography variant="h4" gutterBottom>CARRITO DE COMPRAS</Typography>
            </Grid>
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
                                        <Typography component="div" variant="h6" sx={{ flex: 1 }}>{item.name}</Typography>
                                        <Typography variant="subtitle1" color="text.secondary" component="div" sx={{ flex: 1 }}>
                                            {item.price.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}
                                        </Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid #ccc', borderRadius: '4px', p: 0.5 }}>
                                                <IconButton onClick={() => handleQuantityChange(item.id, -1)} disabled={item.quantity === 1}>
                                                    <Remove />
                                                </IconButton>
                                                <TextField
                                                    type="text"
                                                    value={item.quantity}
                                                    InputProps={{
                                                        readOnly: true,
                                                        disableUnderline: true,
                                                        sx: {
                                                            textAlign: 'center',
                                                            '& input': {
                                                                textAlign: 'center',
                                                                padding: 0,
                                                                height: 'auto',
                                                            },
                                                        },
                                                    }}
                                                    variant="standard"
                                                    size="small"
                                                    sx={{
                                                        width: 50,
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                    }}
                                                />
                                                <IconButton onClick={() => handleQuantityChange(item.id, 1)}>
                                                    <Add />
                                                </IconButton>
                                            </Box>
                                            <IconButton onClick={() => handleRemoveItem(item.id)} sx={{ ml: 1 }}>
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
                        <Grid container justifyContent="center">
                            <Grid item xs={12} md={6}>
                                <div style={{ textAlign: 'center' }}>
                                    <Card sx={{ p: 2, backgroundColor: '#ffe6e6' }}>
                                        <Typography variant="h7">Subtotal: {total.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</Typography>
                                        <Typography variant="h6" fontWeight="bold" sx={{ mt: 2 }}>Total: {total.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</Typography>
                                        <Button variant="contained"
                                            sx={{
                                                mt: 2,
                                                backgroundColor: '#051c67',
                                                borderRadius: '50px',
                                                '&:hover': {
                                                    backgroundColor: '#051c40',
                                                }
                                            }}
                                            onClick={toggleDrawer(true)}
                                        >
                                            Realizar pedido
                                        </Button>
                                    </Card>
                                    <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                                        <Button
                                            sx={{
                                                mt: 2,
                                                borderRadius: '50px',
                                            }}>Seguir comprando</Button>
                                    </Link>
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                ) : (
                    <Grid container justifyContent="center">
                        <Grid item xs={12} md={6}>
                            <div style={{ textAlign: 'center' }}>
                                <Card sx={{ p: 2, backgroundColor: '#ffe6e6' }}>
                                    <CardContent>
                                        <ShoppingCart fontSize='large' />
                                        <Typography>Tu carrito está vacío</Typography>
                                    </CardContent>

                                </Card>
                                <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <Button
                                        sx={{
                                            mt: 2,
                                            borderRadius: '50px',
                                        }}>Seguir comprando</Button>
                                </Link>
                            </div>
                        </Grid>
                    </Grid>
                )
            }

            <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
            >
                <Box
                    sx={{ width: 500 }}
                    role="presentation"
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}
                >
                    <Checkout products={product} />

                </Box>
            </Drawer>
        </Box>
    );
}

export default Cart;