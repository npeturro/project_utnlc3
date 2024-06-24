import React, { useState, useContext } from 'react';
import { Grid, Typography, Button, Card, CardMedia, CardContent, IconButton, TextField, Box, Drawer, Chip } from '@mui/material';
import { Delete, Add, Remove, ShoppingCart } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Checkout from '../checkout/Checkout';
import { Link } from 'react-router-dom';
import { CartContext } from '../../contexts/cart-context';
import axios from 'axios';

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

        console.log(open)
        setDrawerOpen(open);
    };
    const navigate = useNavigate();

    const handleQuantityChange = (id, value) => {
        updateQuantity(id, value);
    };

    const handleRemoveItem = (id) => {
        removeCart(id);
    };

    const subtotal = cart.reduce((sum, product) => sum + product.price * product.quantity, 0);

    const total = cart.reduce((sum, product) => sum + (product.price > 1500000 ? product.price * 0.95 : product.price) * product.quantity, 0);

    const [preferenceId, setPreferenceId] = useState('');

    const createPreference = async (total) => {
        try {
            const response = await axios.post(
                "http://onetechapi-utn.ddns.net/api/Payments/create-preference",
                {
                    title: "Compra",
                    quantity: 1,
                    unitPrice: total,
                    currencyId: "ARS"
                }
            );


            return response.data.id;
        } catch (error) {
            console.log(error);
        }
    };

    const handleBuy = async (total, cart) => {
        const id = await createPreference(total);
        console.log(id)
        navigate("/Checkout", { state: { id, total, cart } })
    };



    return (
        <Box sx={{ p: 5, mt: 8 }}>
            <Grid container justifyContent="center" alignItems="center" mb={4}>
                <Typography variant="h4" gutterBottom>CARRITO DE COMPRAS</Typography>
            </Grid>
            {
                cart.length >= 1 ? (
                    <Box sx={{ flexGrow: 1, overflowY: 'auto', position: 'relative', minHeight: '600px' }}>
                        <Grid container spacing={2} sx={{ mb: 4 }}>
                            {cart.map((product) => (
                                <Grid item xs={12} key={product.id}>
                                    <Card sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                        <CardMedia
                                            component="img"
                                            sx={{
                                                width: 100,
                                                height: 100,
                                                mr: 2
                                            }}
                                            image={product.image}
                                            alt={product.name}
                                        />

                                        <CardContent sx={{ flex: '1 0 auto', display: 'flex', alignItems: 'center' }}>
                                            <Typography component="div" variant="h6" sx={{ flex: '1', minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{product.name}</Typography>
                                            <Typography variant="subtitle1" color="text.secondary" component="div" sx={{ flex: '1', textAlign: 'center', minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                {
                                                    product.price > 1500000 ? (
                                                        <>
                                                            <span style={{ textDecoration: 'line-through' }}>
                                                                {product.price.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}
                                                            </span>
                                                            <br />
                                                            {((product.price * 0.95)).toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}
                                                        </>
                                                    ) : (
                                                        product.price.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })
                                                    )
                                                }
                                            </Typography>
                                            <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid #ccc', borderRadius: '4px', p: 0.5 }}>
                                                    <IconButton onClick={() => handleQuantityChange(product.id, -1)} disabled={product.quantity === 1}>
                                                        <Remove />
                                                    </IconButton>
                                                    <TextField
                                                        type="text"
                                                        value={product.quantity}
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
                                                    <IconButton onClick={() => handleQuantityChange(product.id, 1)}>
                                                        <Add />
                                                    </IconButton>
                                                </Box>
                                                <IconButton onClick={() => handleRemoveItem(product.id)} sx={{ ml: 1 }}>
                                                    <Delete />
                                                </IconButton>
                                            </Box>
                                            <Typography variant="h6" sx={{ flex: '1', textAlign: 'right', minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                {
                                                    product.price > 1500000 ? (
                                                        <>
                                                            {((product.price * 0.95) * product.quantity).toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}{" "}
                                                        </>
                                                    ) : (
                                                        (product.price * product.quantity).toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })
                                                    )
                                                }
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>

                        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', textAlign: 'center' }}>
                            <Card sx={{ p: 2 }}>
                                <Typography variant="h7">Subtotal: {subtotal.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</Typography>
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
                                    onClick={() => handleBuy(total, cart)}
                                >
                                    Ir a pagar
                                </Button>
                            </Card>
                        </div>
                    </Box>
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
                )
            }

            {/* <Drawer
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
                    <Checkout products={cart} preferenceId={preferenceId}  />
                </Box>
            </Drawer> */}
        </Box>
    );
}

export default Cart;
