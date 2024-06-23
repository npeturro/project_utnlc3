import { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Container,
  Radio,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import axios from "axios";

const Checkout = (props) => {
  const [preferenceId, setPreferenceId] = useState(null);

  initMercadoPago("TEST-237a1067-59cb-4dd4-ac24-c796c2079e7b", {
    locale: "es-AR",
  });

  const location = useLocation();
  const { state } = location;
  const { products } = props;

  let total = 0;

  products.forEach((item) => {
    total += item.quantity * item.price;
  });

  const createPreference = async () => {
    try {
      const response = await axios.post(
        "http://onetechapi-utn.ddns.net/api/create-preference",
        {
          title: "producto",
          quantity: 1,
          price: 100,
        }
      );
      const { id } = response.data;
      return id;
    } catch (error) {
      console.log(error);
    }
  };

  const handleBuy = async () => {
    const id = await createPreference();
    if (id) {
      setPreferenceId(id);
    }
  };

  return (
    <>
      <Container maxWidth="xl">
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Card sx={{ maxWidth: 500, flex: 1 }}>
            <CardContent>
              <Typography variant="h6" component="div" color={"black"}>
                <b>Resumen del pedido</b>
              </Typography>
              <Divider sx={{ my: 2 }} />
              {products.map((producto) => (
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
                          Precio: ${producto.price.toFixed(2)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          <strong>Cantidad:</strong> {producto.quantity}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="body2">
                          <strong>Total:</strong> $
                          {(producto.quantity * producto.price).toFixed(2)}
                        </Typography>
                      </Grid>
                      <Divider sx={{ my: 2 }} />
                    </Grid>
                  </Grid>
                </Grid>
              ))}
              <Typography variant="h6" fontWeight="bold" sx={{ mt: 2 }}>
                Total:{" "}
                {total.toLocaleString("es-AR", {
                  style: "currency",
                  currency: "ARS",
                })}
              </Typography>
            </CardContent>
          </Card>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
          {/* <Button
                        variant="contained"
                        sx={{
                            mt: 2,
                            backgroundColor: '#051c67',
                            borderRadius: '50px',
                            '&:hover': {
                                backgroundColor: '#051c40',
                            }
                        }}>
                        Ir a pagar
                    </Button> */}
          <Wallet
            initialization={{ preferenceId: preferenceId }}
            customization={{ texts: { valueProp: "smart_option" } }}
          />
        </Box>
      </Container>
    </>
  );
};

export default Checkout;
