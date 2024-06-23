import { useState, useRef, useContext } from 'react';
import { Button, TextField, Box, Typography, Container, Alert, Snackbar } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import useRegister from './Validate';
import { CartelContext } from '../../contexts/alert-context';

function Register(props) {

    // const { setUserLoged } = props

    const { handleCartel } = useContext(CartelContext);

    const navigate = useNavigate();
    const { authenticateRegister } = useRegister();

    const [values, setValues] = useState({
        user: '',
        email: '',
        password: '',
        name: '',
        lastname: '',
        number: '',
        street: ''
    });

    const [errors, setErrors] = useState({
        user: false,
        email: false,
        password: false,
        name: false,
        lastname: false,
        number: false,
        street: false
    })

    const nameRef = useRef(null);
    const lastnameRef = useRef(null);
    const userRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const numberRef = useRef(null);
    const streetRef = useRef(null);

    const [alert, setAlert] = useState({
        open: false,
        severity: 'success',
        message: ''
    });


    const showAlert = (message, severity) => {
        setAlert({ open: true, message, severity });
        setTimeout(() => {
            setAlert(prevAlert => ({ ...prevAlert, open: false }));
        }, 10000);
    };

    const handleClick = async () => {

        if (!nameRef.current.value) {
            nameRef.current.focus();
            setErrors(prevErrors => ({ ...prevErrors, name: true }));
            return;
        }

        if (!lastnameRef.current.value) {
            lastnameRef.current.focus();
            setErrors(prevErrors => ({ ...prevErrors, lastname: true }));
            return;
        }

        if (!userRef.current.value) {
            userRef.current.focus();
            setErrors(prevErrors => ({ ...prevErrors, user: true }));
            return;
        }

        if (!emailRef.current.value) {
            emailRef.current.focus();
            setErrors(prevErrors => ({ ...prevErrors, email: true }));
            return;
        }

        if (!passwordRef.current.value) {
            passwordRef.current.focus();
            setErrors(prevErrors => ({ ...prevErrors, password: true }));
            return;
        }

        if (!streetRef.current.value) {
            streetRef.current.focus();
            setErrors(prevErrors => ({ ...prevErrors, street: true }));
            return;
        }

        if (!numberRef.current.value) {
            numberRef.current.focus();
            setErrors(prevErrors => ({ ...prevErrors, number: true }));
            return;
        }


        if (!values.email.includes("@")) {
            showAlert("Debe ingresar un correo valido", "error");
            return;
        }

        const registerValidate = await authenticateRegister(values);

        if (registerValidate.success) {
            showAlert(registerValidate.success, "success");
            setValues({ email: '', password: '', name: '', lastname: '', street: '', number: '', user: '' });
            navigate('/');
        } else {
            showAlert(registerValidate.error, "error");
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues(prevValues => ({
            ...prevValues,
            [name]: value
        }));
        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: false
        }));
    };


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
                    boxShadow: 1
                }}
            >
                <Snackbar
                    open={alert.open}
                    autoHideDuration={10000}
                    onClose={() => setAlert(prevAlert => ({ ...prevAlert, open: false }))}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                    <Alert
                        onClose={() => setAlert(prevAlert => ({ ...prevAlert, open: false }))}
                        severity={alert.severity}
                        sx={{ width: '100%' }}
                    >
                        {alert.message}
                    </Alert>
                </Snackbar>
                <Typography variant="h5">
                    Registrarse
                </Typography>
                <Box sx={{ mt: 3 }}>
                    <TextField
                        required
                        fullWidth
                        id="name"
                        label="Nombre"
                        name="name"
                        type='text'
                        value={values.name}
                        onChange={handleChange}
                        inputRef={nameRef}
                        error={errors.name}
                        helperText={errors.name && "El campo nombre es obligatorio"}
                    />
                    <TextField
                        required
                        fullWidth
                        id="lastname"
                        label="Apellido"
                        name="lastname"
                        type='text'
                        value={values.lastname}
                        onChange={handleChange}
                        inputRef={lastnameRef}
                        error={errors.lastname}
                        helperText={errors.lastname && "El campo apellido es obligatorio"}
                        sx={{ mt: 2 }}
                    />
                    <TextField
                        required
                        fullWidth
                        id="user"
                        label="Nombre de usuario"
                        name="user"
                        type='text'
                        value={values.user}
                        onChange={handleChange}
                        inputRef={userRef}
                        error={errors.user}
                        helperText={errors.user && "El campo usuario es obligatorio"}
                        sx={{ mt: 2 }}
                    />
                    <TextField
                        required
                        fullWidth
                        id="email"
                        label="E-mail"
                        name="email"
                        type='email'
                        value={values.email}
                        onChange={handleChange}
                        inputRef={emailRef}
                        error={errors.email}
                        helperText={errors.email && "El campo email es obligatorio"}
                        sx={{ mt: 2 }}
                    />
                    <TextField
                        required
                        fullWidth
                        name="password"
                        label="Contraseña"
                        type="password"
                        id="password"
                        value={values.password}
                        onChange={handleChange}
                        inputRef={passwordRef}
                        error={errors.password}
                        helperText={errors.password && "El campo contraseña es obligatorio"}
                        sx={{ mt: 2 }}
                    />
                    <TextField
                        required
                        fullWidth
                        id="street"
                        label="Dirección"
                        name="street"
                        type='text'
                        value={values.street}
                        onChange={handleChange}
                        inputRef={streetRef}
                        error={errors.street}
                        helperText={errors.street && "El campo dirección es obligatorio"}
                        sx={{ mt: 2 }}
                    />
                    <TextField
                        required
                        fullWidth
                        name="number"
                        label="Número teléfonico"
                        type="number"
                        id="number"
                        value={values.number}
                        onChange={handleChange}
                        inputRef={numberRef}
                        error={errors.number}
                        helperText={errors.number && "El campo teléfono es obligatorio"}
                        sx={{ mt: 2 }}
                    />
                </Box>
                <Button
                    fullWidth
                    variant="contained"
                    sx={{
                        mt: 3, backgroundColor: '#051c67',
                        '&:hover': {
                            backgroundColor: '#051c40',
                        }
                    }}
                    onClick={handleClick}
                >
                    Continuar
                </Button>
            </Box>
        </Container >
    );
}

export default Register;