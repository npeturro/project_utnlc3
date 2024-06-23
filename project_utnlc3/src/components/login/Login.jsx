import { useState, useRef , useContext} from 'react';
import { Button, TextField, Box, Typography, Container, Alert, Snackbar } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import useAuthentication from './Authentication';
import { UserContext } from '../../contexts/user-context';
import { CartelContext } from '../../contexts/alert-context';

function Login (props) {

  // const { setUserLoged } = props

  const { userLoged, setUserLoged } = useContext(UserContext);
  const { handleCartel } = useContext(CartelContext);

  const navigate = useNavigate();
  const { authenticate } = useAuthentication();

  const [values, setValues] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    email: false,
    password: false
  })

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

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

  const handleClick = () => {

    if (!emailRef.current.value) {
      emailRef.current.focus();
      setErrors(prevErrors => ({ ...prevErrors, email: true }));
      showAlert("El campo usuario es obligatorio", "error");
      return;
    }

    if (!passwordRef.current.value) {
      passwordRef.current.focus();
      setErrors(prevErrors => ({ ...prevErrors, password: true }));
      showAlert("El campo contraseña es obligatorio", "error");
      return;
    }

    if (!values.email.includes("@")) {
      showAlert("Debe ingresar un correo valido", "error");
      return;
    }

    const { authenticated, role, name } = authenticate(values.email, values.password);
    
    if (authenticated) {
      showAlert("¡Usuario ingresado correctamente!", "success");
      setValues({ email: '', password: '' });
      navigate('/');
      setUserLoged({ authenticated, role, name })
    } else {
      showAlert("Credenciales incorrectas", "error");
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

    <Container maxWidth="xs" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: '5%' }}>
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
          Iniciar sesión
        </Typography>
        <Box sx={{ mt: 3 }}>
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
            helperText={errors.email && "El campo de usuario es obligatorio"}
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
            inputRef={passwordRef}
            error={errors.password}
            helperText={errors.password && "El campo de contraseña es obligatorio"}
          />
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
        <Box sx={{ mt: 3 }}><p>No tenes cuenta? <a href='/register'>Registrate</a></p></Box>
      </Box>
    </Container>
  );
}

export default Login;