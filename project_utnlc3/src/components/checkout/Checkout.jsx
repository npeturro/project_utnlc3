import { useState, useContext, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import {
    Box,
    Container,
    Radio,
    RadioGroup,
    FormControlLabel,
    Typography,
    Card,
    CardContent,
    Grid,
    Button,
    Divider,
    TextField,
    Stack,
    CircularProgress
} from "@mui/material";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../contexts/cart-context";
import { UserContext } from "../../contexts/user-context";
import axios from "axios";

const Checkout = (props) => {

    const { cart } = useContext(CartContext);
    const { userLoged } = useContext(UserContext);

    initMercadoPago("TEST-237a1067-59cb-4dd4-ac24-c796c2079e7b", {
        locale: "es-AR",
    });

    const location = useLocation();
    const { state } = location;
    const navigate = useNavigate();

    const [orderNumber, setOrderNumber] = useState('');

    useEffect(() => {
        const generateOrderNumber = () => {
            return Math.floor(100000 + Math.random() * 900000);
        };
        setOrderNumber(generateOrderNumber());
    }, []);

    const [method, setMethod] = useState('sucursal');

    const products = cart.map((row) => ({
        productoId: row.id,
        cantidad: row.quantity,
    }));

    const sendOrder = async () => {
        try {
            const response = await axios.post(
                "http://onetechapi-utn.ddns.net/api/Compras",
                {
                    emailUsuario: userLoged.email,
                    montoTotal: `${state.total}`,
                    numeroOrden: `#${orderNumber}`,
                    detalles: products
                }
            );
            return response.data.id;
        } catch (error) {
            console.log(error);
        }
    };

    const handleMethod = (event) => {
        setMethod(event.target.value);
    };

    const [isLoading, setIsLoading] = useState(false);

    const handleEfectivo = async () => {
        setIsLoading(true);
        const fetch = await sendOrder()
        setTimeout(() => {
            navigate('/order', { state: { method, orderNumber } });
        }, 2000);
    };



    return (
        <>
            <Container maxWidth="xl">
                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4, width: "100%" }}>
                    <Stack sx={{ width: "48%" }}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" component="div" color={"black"}>
                                    <b>Forma de envío</b>
                                </Typography>
                                <Divider sx={{ my: 2 }} />
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue="sucursal"
                                    name="radio-buttons-group"
                                    value={method}
                                    onChange={handleMethod}
                                >
                                    <FormControlLabel value="sucursal" control={<Radio />} label="Retiro en sucursal" />
                                    <FormControlLabel value="domicilio" control={<Radio />} label="Entrega a domicilio" />
                                </RadioGroup>
                                {method === 'sucursal' && (
                                    <Typography sx={{ mt: 2 }}>
                                        Dirección de retiro: Zeballos 1341, Rosario, Argentina.
                                    </Typography>
                                )}
                                {method === 'domicilio' && (
                                    <TextField
                                        sx={{ mt: 2 }}
                                        fullWidth
                                        label="Dirección de entrega"
                                        variant="outlined"
                                    />
                                )}
                            </CardContent>
                        </Card>
                    </Stack>
                    <Stack sx={{ width: "48%" }}>
                        <Card sx={{ maxWidth: "100%", flex: 1 }}>
                            <CardContent>
                                <Typography variant="h6" component="div" color={"black"}>
                                    <b>Resumen del pedido</b>
                                </Typography>
                                <Divider sx={{ my: 2 }} />
                                {state.cart.map((producto) => (
                                    <Grid container spacing={2} key={producto.id}>
                                        <Grid item xs={12} sm container>
                                            <Grid item xs container direction="column" spacing={2}>
                                                <Grid item xs>
                                                    <Typography
                                                        gutterBottom
                                                        variant="subtitle1"
                                                        component="div"
                                                    >
                                                        {producto.name}
                                                    </Typography>
                                                    <Typography variant="body2" gutterBottom>
                                                        {producto.price > 1500000 ? (
                                                            <>
                                                                Precio con descuento: {((producto.price * 0.95)).toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}
                                                            </>
                                                        ) : (
                                                            <>
                                                                Precio: {(producto.price).toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}
                                                            </>
                                                        )}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        <strong>Cantidad:</strong> {producto.quantity}
                                                    </Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Typography variant="body2">
                                                        <strong>Total:</strong>
                                                        {producto.price > 1500000 ? (
                                                            <>
                                                                {((producto.price * 0.95) * producto.quantity).toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}{" "}
                                                            </>
                                                        ) : (
                                                            (producto.price * producto.quantity).toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })
                                                        )}
                                                    </Typography>
                                                </Grid>
                                                <Divider sx={{ my: 2 }} />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                ))}
                                <Typography variant="h6" fontWeight="bold" sx={{ mt: 2 }}>
                                    Total:{" "}
                                    {state.total.toLocaleString("es-AR", {
                                        style: "currency",
                                        currency: "ARS",
                                    })}
                                </Typography>
                            </CardContent>
                        </Card>
                        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>

                            <Button
                                sx={{ mr: '20px' }}
                                onClick={handleEfectivo}
                                disabled={isLoading}
                                startIcon={isLoading && <CircularProgress size={20} />}
                            >
                                {isLoading ? 'Cargando...' : 'Pagar en efectivo'}
                            </Button>

                            <Wallet
                                initialization={{ preferenceId: state.id }}
                                customization={{ texts: { valueProp: "smart_option" } }}
                            />
                        </Box>
                    </Stack>
                </Box>

            </Container>
        </>
    );
};

export default Checkout;
