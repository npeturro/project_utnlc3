import React, { useState, useContext } from 'react';
import { Grid, Typography, Button, Card, CardMedia, CardContent, IconButton, TextField, Box, Drawer } from '@mui/material';
import { Delete, Add, Remove, ShoppingCart } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Checkout from '../checkout/Checkout';
import { Link } from 'react-router-dom';
import { CartContext } from '../../contexts/cart-context';

function Cart() {

    const [drawerOpen, setDrawerOpen] = useState(false);
    const { cart, removeCart, updateQuantity } = useContext(CartContext);

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
        updateQuantity(id, value);
    };

    const handleRemoveItem = (id) => {
        removeCart(id);
    };

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <Box sx={{ p: 5 }}>
            <Grid container justifyContent="center" alignItems="center" mb={4}>
                <Typography variant="h4" gutterBottom>CARRITO DE COMPRAS</Typography>
            </Grid>
            <Box sx={{ flexGrow: 1, overflowY: 'auto', position: 'relative', minHeight: '600px' }}>
                {cart.length >= 1 ? (
                    <Grid container spacing={2} sx={{ mb: 4 }}>
                        {cart.map((item) => (
                            <Grid item xs={12} key={item.id}>
                                <Card sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <CardMedia
                                        component="img"
                                        sx={{
                                            width: 100,
                                            height: 100,
                                            mr: 2
                                        }}
                                        image={item.image}
                                        alt={item.name}
                                    />

                                    <CardContent sx={{ flex: '1 0 auto', display: 'flex', alignItems: 'center' }}>
                                        <Typography component="div" variant="h6" sx={{ flex: '1', minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</Typography>
                                        <Typography variant="subtitle1" color="text.secondary" component="div" sx={{ flex: '1', textAlign: 'center', minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
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
                                        <Typography variant="h6" sx={{ flex: '1', textAlign: 'right', minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                            {(item.price * item.quantity).toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <Grid container justifyContent="center">
                        <Grid item xs={12} md={6}>
                            <div style={{ textAlign: 'center' }}>
                                <Card sx={{ p: 2 }}>
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
                )}

                <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', textAlign: 'center' }}>
                    <Card sx={{ p: 2 }}>
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
                            onClick={() => toggleDrawer(true)}
                        >
                            Realizar pedido
                        </Button>
                    </Card>
                </div>
            </Box>

            <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={() => toggleDrawer(false)}
            >
                <Box
                    sx={{ width: 500 }}
                    role="presentation"
                    onClick={() => toggleDrawer(false)}
                    onKeyDown={() => toggleDrawer(false)}
                >
                    {/* Componente Checkout */}
                    <Checkout products={cart} />
                </Box>
            </Drawer>
        </Box>
    );
}

export default Cart;
