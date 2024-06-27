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
import NotFound from "../notFound/NotFound";
import { Get } from "../fetch";
import axios from "axios";

const AllOrders = () => {

    const { userLoged, setUserLoged } = useContext(UserContext);

    if (userLoged.authenticated == false) {
        return (
            <NotFound />
        )
    }

    const [value, setValues] = useState('')
    useEffect(() => {
        const fetchData = async () => {
            const get = await Get(`Compras/all`);
            setValues(get);
        };

        fetchData();
    }, []);

    return (
        <Box sx={{ mt: 4 }}>
            <Container maxWidth="xl">
                <Grid container justifyContent="center" alignItems="center" mb={4}>
                    <Typography variant="h4" gutterBottom>ORDENES DE COMPRA</Typography>
                </Grid>
                {(value !== '') ? (
                    <Grid>
                        <TableContainer>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell><b>Número de orden</b></TableCell>
                                        <TableCell align="center"><b>Usuario</b></TableCell>
                                        <TableCell align="center"><b>Total</b></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {value.map((row) => (
                                        <TableRow
                                            key={row.numeroOrden}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {row.numeroOrden}
                                            </TableCell>
                                            <TableCell align="center">{row.emailUsuario}</TableCell>
                                            <TableCell align="center">{parseInt(row.montoTotal).toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</TableCell>
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
                            <Typography variant="h6" gutterBottom>No existen compras registradas en el sistema</Typography>
                        </Grid>
                    </>
                )}
            </Container>
        </Box>
    );
};

export default AllOrders;