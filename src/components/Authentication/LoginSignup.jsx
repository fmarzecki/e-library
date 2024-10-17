import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import lsjpg from './login_signup.jpg';
import Notification from '../Alert/Notification';
import { jwtDecode } from 'jwt-decode';
import { postRequest } from '../utilities/api';
import Cookies from 'js-cookie';

const LoginSignup = () => {
  const [notification, setNotification] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    phoneNumber: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let formErrors = {};
    let valid = true;

    if (!isLogin) {
      // const phoneRegex = /^\d{9}$/;
      // if (!phoneRegex.test(formData.phoneNumber)) {
      //   formErrors.phoneNumber = 'Numer telefonu musi mieć dokładnie 9 cyfr';
      //   valid = false;
      // }

      // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      // if (!emailRegex.test(formData.email)) {
      //   formErrors.email = 'Nieprawidłowy format email';
      //   valid = false;
      // }

      // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      // if (!passwordRegex.test(formData.password)) {
      //   formErrors.password = 'Hasło musi mieć minimum 8 znaków, zawierać małą i wielką literę, cyfrę oraz znak specjalny';
      //   valid = false;
      // }
    }

    setErrors(formErrors);
    return valid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const endpoint = isLogin ? '/auth/login' : '/auth/register';
    let dataToSend = isLogin ? { email: formData.email, password: formData.password } : formData;

    try {
      const response = await postRequest(endpoint, dataToSend);
      if (response.status === 200) {
        if (isLogin) {
          setNotification({ message: 'Udało się zalogować.', severity: 'success' });

          const token = Cookies.get('token');
          const decodedToken = jwtDecode(token);
          const userRole = decodedToken.role;

          // Store the JWT token in localStorage
          localStorage.setItem('token', token);
          localStorage.setItem('userRole', userRole);


          // Navigate based on the user role
          switch (userRole) {
            case 'user':
              navigate('/userDashboard');
              break;
            case 'employee':
              navigate('/employeeDashboard');
              break;
            case 'administrator':
              navigate('/administratorDashboard');
              break;
            default:
              console.error('Unknown user role');
          }
        } else {
          window.location.reload();
          setNotification({ message: 'Udało się zarejestrować!', severity: 'success' });
        }
      }
      else {
        setNotification({ message: 'Błąd podczas logowania/rejestracji!', severity: 'error' });
      }
    } catch (error) {
      if (error.response.status === 409) {
        setNotification({ message: 'Uzytkownik o podanym emailu już istnieje!', severity: 'warning' });
      }
      else {
        console.error('Error:', error);
      }
    }
  };

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={5}
        md={7}
        sx={{
          backgroundImage: `url(${lsjpg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={7} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {notification && (
            <Notification message={notification.message} severity={notification.severity} setOpenProp={setNotification} />
          )}
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {isLogin ? 'Sign in' : 'Sign up'}
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            {!isLogin && (
              <>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  autoComplete="name"
                  autoFocus
                  value={formData.name}
                  onChange={handleChange}
                  error={!!errors.name}
                  helperText={errors.name}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="surname"
                  label="Surname"
                  name="surname"
                  autoComplete="surname"
                  value={formData.surname}
                  onChange={handleChange}
                  error={!!errors.surname}
                  helperText={errors.surname}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="phoneNumber"
                  label="Phone Number"
                  name="phoneNumber"
                  autoComplete="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  error={!!errors.phoneNumber}
                  helperText={errors.phoneNumber}
                />
              </>
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              {isLogin ? 'Sign In' : 'Sign Up'}
            </Button>
            <Grid container>
              <Grid item xs>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2" onClick={() => setIsLogin(!isLogin)}>
                  {isLogin ? 'Nie masz konta? Zarejestruj się' : 'Masz konto? Zaloguj się'}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default LoginSignup;
