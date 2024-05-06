import { useState } from 'react';
import { Button, TextField, Box, Typography, Container, Grid } from '@mui/material'
import { useAuth0 } from '@auth0/auth0-react';


function NewUser() {

    const [values, setValues] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [passwordConfirm, setPasswordConfirm] = useState(false)

    const handleClick = () => {
        console.log(values);
        if (values.password !== values.confirmPassword) {
            setPasswordConfirm(true);
            return;
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues(prevValues => ({
            ...prevValues,
            [name]: value
        }));
        if (passwordConfirm) {
            setPasswordConfirm(false);
        }
    };


    return (
        <Container maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Box>

                </Box>
                <Typography variant="h5">
                    Registrarse
                </Typography>
                <Box sx={{ mt: 3 }}>
                    <TextField
                        required
                        fullWidth
                        id="email"
                        label="E-mail"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                    />
                    <TextField
                        sx={{ mt: 3 }}
                        required
                        fullWidth
                        name="password"
                        label="Contraseña"
                        type="password"
                        id="password"
                        value={values.password}
                        onChange={handleChange}
                    />
                    <TextField
                        sx={{ mt: 3 }}
                        required
                        fullWidth
                        name="confirmPassword"
                        label="Confirmar contraseña"
                        type="password"
                        id="confirmPassword"
                        value={values.confirmPassword}
                        onChange={handleChange}
                    />
                    {passwordConfirm && (
                        <Typography color="error">
                            Las contraseñas no coinciden. Por favor, inténtelo de nuevo.
                        </Typography>
                    )}
                    <Button
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3 }}
                        onClick={handleClick}
                    >
                        Crear usuario
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}

export default NewUser;
