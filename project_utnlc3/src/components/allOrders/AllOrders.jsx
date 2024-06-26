import { useState, useContext } from "react";
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

const AllOrders = () => {

    const { userLoged, setUserLoged } = useContext(UserContext);

    if (userLoged.authenticated == false) {
        return (
            <NotFound/>
        )
    }

    const [rows, setRows] = useState([
        {
            orden: '#12345', total: 1200, user: 'npesturro'
        },
        {
            orden: '#12348', total: 120000, user: 'npeturro123'
        }
    ]);

    return (
        <Box sx={{ mt: 4 }}>
            <Container maxWidth="xl">
                <Grid container justifyContent="center" alignItems="center" mb={4}>
                    <Typography variant="h4" gutterBottom>ORDENES DE COMPRA</Typography>
                </Grid>
                {rows.length > 0 ? (
                    <Grid>
                        <TableContainer>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Número de orden</TableCell>
                                        <TableCell align="right">Usuario</TableCell>
                                        <TableCell align="right">Total</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row) => (
                                        <TableRow
                                            key={row.orden}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {row.orden}
                                            </TableCell>
                                            <TableCell align="right">{row.user}</TableCell>
                                            <TableCell align="right">{row.total.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</TableCell>
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

export default AllOrders;