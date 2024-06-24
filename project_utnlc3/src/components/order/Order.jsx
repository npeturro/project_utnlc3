import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // Asegúrate de importar useLocation si necesitas el estado de la navegación
import {
    Box,
    Container,
    Typography,
    Divider
} from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';

const Order = () => {
    const location = useLocation();
    const { state } = location;

    // Generar un número de orden aleatorio
    const [orderNumber, setOrderNumber] = useState('');

    useEffect(() => {
        const generateOrderNumber = () => {
            return Math.floor(100000 + Math.random() * 900000);
        };
        setOrderNumber(generateOrderNumber());
    }, []);

    return (
        <Container maxWidth="xs" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    p: 3,
                    border: '1px solid #ccc',
                    borderRadius: 8,
                    bgcolor: 'background.paper',
                    height: '300px'
                }}
            >
                <CheckIcon></CheckIcon>
                <Typography variant="h5" component="div" color={"black"}>
                    <b>Pedido finalizado!</b>
                </Typography>
                <Typography variant="h7" component="div" color={"black"}>
                    Su pedido ha sido realizado correctamente
                </Typography>
                <Typography variant="h7" component="div" color={"blue"}>
                    <b>Número de orden #{orderNumber}</b>
                </Typography>
                <Divider sx={{ my: 2, backgroundColor:'black' }} />
                {
                    (state.method == 'sucursal') ? (
                        <>
                            <Typography variant="h7" >
                                A retirar en Zeballos 1341, Rosario, Argentina.
                            </Typography>
                            <Typography variant="h7" >
                                No olvide su número de orden!
                            </Typography>
                        </>
                    ) : (
                        <Typography variant="h7" textAlign={'center'}>
                            Ya comenzamos con el proceso de envío para realizar a su dirección!<br />En breve le llegará un correo con el número de seguimiento correspondiente.
                        </Typography>
                    )
                }
            </Box>
        </Container>
    );
};

export default Order;


