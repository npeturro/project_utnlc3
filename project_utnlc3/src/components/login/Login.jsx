import { useState, useRef , useContext} from 'react';
import { Button, TextField, Box, Typography, Container, Alert, Snackbar } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import useAuthentication from './Authentication';
import { UserContext } from '../../contexts/user-context';
import { CartelContext } from '../../contexts/alert-context';

function Login (props) {

  const { setUserLoged } = useContext(UserContext);

  const navigate = useNavigate();
  const { authenticate } = useAuthentication();
  const cartel = useContext(CartelContext)

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

  const handleClick = () => {

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

    if (!values.email.includes("@")) {
      cartel({
        tipo: 'error',
        text: 'Debe ingresar un correo valido'
      })
      return;
    }

    const { authenticated, role, name, email } = authenticate(values.email, values.password);
    
    if (authenticated) {
      setValues({ email: '', password: '' });
      navigate('/');
      localStorage.setItem('userLoged', JSON.stringify({ authenticated, email }));
      setUserLoged({ authenticated, role, name, email })
      cartel({
        tipo: 'success',
        text: 'Usuario ingresado correctamente!'
      })
    } else {
      cartel({
        tipo: 'error',
        text: 'Credenciales incorrectas'
      })
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

    <Container maxWidth="xs" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
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