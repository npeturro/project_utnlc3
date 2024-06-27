import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../contexts/user-context";
import {
    Box,
    Container,
    TableCell,
    TableBody,
    Table,
    Typography,
    Grid,
    TableContainer,
    TableHead,
    TableRow,
    Divider
} from "@mui/material";
import { Get } from '../fetch';

const MyAccount = () => {
    const { userLoged, setUserLoged } = useContext(UserContext);

    if (userLoged.authenticated == false) {
        return (
            <Box sx={{ mt: 4 }}>
                <Container maxWidth="xl">
                    <Grid container justifyContent="center" alignItems="center" mb={4} mt={3}>
                        <Typography variant="h6" gutterBottom>Usted no se encuentra ingresado en la plataforma. Inicie sesión</Typography>
                    </Grid>
                </Container>
            </Box>
        )
    }

    const [value, setValues] = useState('')
    useEffect(() => {
        const fetchData = async () => {
            const get = await Get(`Compras/user/${userLoged.email}`);
            setValues(get);
        };

        fetchData();
    }, []);


    return (
        <Box sx={{ mt: 4 }}>
            <Container maxWidth="xl">
                <Grid container justifyContent="center" alignItems="center" mb={4}>
                    <Typography variant="h4" gutterBottom>MIS COMPRAS</Typography>
                </Grid>
                {(value !== '') ? (
                    <Grid>
                        <TableContainer>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Número de orden</TableCell>
                                        <TableCell align="right">Total</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {value.map((row) => (
                                        <TableRow
                                            key={row.numeroOrden}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                <b>{row.numeroOrden}</b>
                                            </TableCell>
                                            <TableCell align="right"><b>{parseInt(row.montoTotal).toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</b></TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                ) : (
                    <>
                        <Divider></Divider>
                        <Grid container justifyContent="center" alignItems="center" mb={4} mt={3}>
                            <Typography variant="h6" gutterBottom>No tiene compras realizadas</Typography>
                        </Grid>
                    </>
                )}
            </Container>
        </Box>
    );
};

export default MyAccount;

