import { useState } from 'react';
import { Button, TextField, Box, Typography, Container, Grid } from '@mui/material'
import { useAuth0 } from '@auth0/auth0-react';


function Login() {

    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    const handleClick = () => {
        console.log(values);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues(prevValues => ({
            ...prevValues,
            [name]: value
        }));
    };

    const { loginWithRedirect } = useAuth0();

    const handleGoogleLogin = () => {
        window.location.href = "https://dev-4pyd2iup4jqltzrw.us.auth0.com/authorize?client_id=W5LKpDGS14SqQLKFBEy9MlJwgqHwYkTg&response_type=code&redirect_uri=http://localhost:8080/&connection=google-oauth2";
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
                    Iniciar sesión
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
                    <Button
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3 }}
                        onClick={handleClick}
                    >
                        Continuar
                    </Button>
                </Box>
                <Box sx={{ mt: 3 }}><p>No tenes cuenta? <a href='#'>Registrate</a></p></Box>
            </Box>
        </Container>
    );
}

export default Login;
