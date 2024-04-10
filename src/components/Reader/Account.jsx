import React, { useState } from 'react';
import {
  Typography, Paper, Grid, Divider,
  Button, IconButton, InputAdornment, TextField,
  ThemeProvider, createTheme,
  Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

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

  // Przelacznik widocznosci hasla
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  //--------------------------------------------------------------------

  // Dialog zmiana hasla
  const [openDialog, setOpenDialog] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleChangePassword = () => {
    // Logika do zmiany hasła
    console.log('Nowe hasło:', newPassword);
    handleCloseDialog();
  };
  //---------------------------------------------------------------------

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
              {"Kamil"}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              <strong>Nazwisko:</strong><br />
              {"Rojek"}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              <strong>Email:</strong><br />
              {"kayletosyf123@gmail.com"}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" gutterBottom>
              <strong>Hasło:</strong>
            </Typography>
            <TextField
              type={showPassword ? 'text' : 'password'}
              value={"poleHasla"}
              variant='standard'
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibility}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
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
