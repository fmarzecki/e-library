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
import axios from 'axios';
import Notification from '../Alert/Notification';

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

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const endpoint = isLogin ? '/user/login' : '/user/registerReader';
    const url = `http://localhost:8080${endpoint}`;

    let dataToSend = isLogin ? {email: formData.email, password: formData.password} : formData
    console.log(dataToSend)
    try {
      const response = await axios.post(url, dataToSend, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        const data = response.data.data.User;
        if (isLogin) {
          setNotification({ message: 'Udało się zalogować.', severity: 'success' });
          localStorage.setItem('apiKey', data.apiKey);
          localStorage.setItem('userType', data.userType);
          localStorage.setItem('user', JSON.stringify(data));
          console.log(data)
          console.log(localStorage.getItem('apiKey'))
          switch (localStorage.getItem('userType')) {
            case 'reader':
              navigate('/readerDashboard');
              break;
            case 'worker':
              navigate('/employeeDashboard');
              break;
            case 'employee manager':
              navigate('/employeeManagerDashboard');
              break;
            case 'warehouse manager':
              navigate('/warehouseManagerDashboard');
              break;
            default:
              console.error('Unknown user type');
          }
        }
        else{
          window.location.reload()
          setNotification({ message: 'Udało się zarejestrować.', severity: 'success' });
        }
      } else {
        console.error(isLogin ? 'Login failed' : 'Registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid item xs={false} sm={5} md={7} sx={{
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
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {isLogin ? 'Sign In' : 'Sign Up'}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Zapomniałeś hasła?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2" onClick={() => setIsLogin(!isLogin)}>
                  {isLogin ? "Nie masz konta? Zarejestruj się" : 'Masz konto? Zaloguj się'}
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
