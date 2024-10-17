import React, { useState, useEffect } from 'react';
import {
  Typography, Paper, Grid, Divider,
  Button, IconButton, InputAdornment, TextField,
  ThemeProvider, createTheme,
  Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import { getRequest, putRequest } from '../utilities/api';
import Notification from '../Alert/Notification';

const theme = createTheme({
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          p: 3,
          margin: 'auto',
          width: "80%"
        },
      },
    },
  },
});

const Account = () => {
  const [user, setUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [notification, setNotification] = useState(null);

  const fetchUserData = async () => {
    try {
      const endpoint = '/users/getUserProfile';
      const response = await getRequest(endpoint);
      setUser(response.data);
    }
    catch (error) {
      console.error('Error retrieving user profile information:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleChangePassword = async () => {
    if (newPassword != confirmPassword) {
      setNotification({ message: 'Hasła są niezgodne!', severity: 'warning' });
    }
    else {
      let endpoint = '/users/updateUserPassword';
      let requestBody = { password: confirmPassword };
      try {
        let response = await putRequest(endpoint, requestBody);
        console.log(response)
        if (response.status == 200) {
          setNotification({ message: 'Hasło zmienione!', severity: 'success' });
        }
        else {
          setNotification({ message: 'Błąd odpowiedzi serwera!', severity: 'warning' });
        }
      }
      catch (error) {
        setNotification({ message: 'Błąd!', severity: 'warning' });
      }
      setTimeout(() => {
        handleCloseDialog();
      }, 2000);
    }
  };

  if (!user) return <Typography variant="h6">Ładowanie...</Typography>;

  return (
    <ThemeProvider theme={theme}>
      <Paper elevation={2}>
        <Grid container spacing={2} padding={3}>
          <Grid item xs={12}>
            <Typography variant="h6">
              Dane użytkownika
            </Typography>
            <Divider sx={{ mb: 2 }}></Divider>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              <strong>Imię:</strong><br />
              {user.user.name}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              <strong>Nazwisko:</strong><br />
              {user.user.surname}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              <strong>Email:</strong><br />
              {user.user.email}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="outlined"
              color="secondary"
              disableElevation
              onClick={handleOpenDialog}
            >
              Zmień hasło
            </Button>
          </Grid>
        </Grid>
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Zmień hasło</DialogTitle>
          <DialogContent>
            {notification && (
              <Notification message={notification.message} severity={notification.severity} setOpenProp={setNotification} />
            )}
            <TextField
              autoFocus
              margin="dense"
              label="Nowe hasło"
              type="password"
              fullWidth
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Potwierdź nowe hasło"
              type="password"
              fullWidth
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Anuluj
            </Button>
            <Button onClick={handleChangePassword} color="primary">
              Zmień hasło
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </ThemeProvider>
  );
};

export default Account;
